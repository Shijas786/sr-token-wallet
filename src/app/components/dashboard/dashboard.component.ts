import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { Web3Service, WalletState, TokenInfo } from '../../services/web3.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  walletState: WalletState = {
    isConnected: false,
    address: null,
    balance: '0',
    networkId: null
  };
  
  tokenInfo: TokenInfo | null = null;
  isLoading = true;
  private walletSubscription: Subscription | null = null;

  constructor(
    public web3Service: Web3Service,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeDashboard();
  }

  ngOnDestroy(): void {
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
  }

  private async initializeDashboard(): Promise<void> {
    try {
      // Subscribe to wallet state changes
      this.walletSubscription = this.web3Service.getWalletState().subscribe(
        (state) => {
          this.walletState = state;
          if (state.isConnected) {
            this.loadTokenInfo();
          } else {
            this.router.navigate(['/connect']);
          }
        }
      );

      // Check current wallet state
      const currentState = this.web3Service.getCurrentWalletState();
      if (!currentState.isConnected) {
        this.router.navigate(['/connect']);
        return;
      }

      this.walletState = currentState;
      await this.loadTokenInfo();
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      this.showMessage('Error loading dashboard', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  private async loadTokenInfo(): Promise<void> {
    try {
      this.tokenInfo = await this.web3Service.getTokenInfo();
      await this.web3Service.getTokenBalance();
    } catch (error) {
      console.error('Error loading token info:', error);
      this.showMessage('Error loading token information', 'error');
    }
  }

  async refreshBalance(): Promise<void> {
    try {
      await this.web3Service.getTokenBalance();
      this.showMessage('Balance refreshed', 'success');
    } catch (error) {
      console.error('Error refreshing balance:', error);
      this.showMessage('Error refreshing balance', 'error');
    }
  }

  async disconnectWallet(): Promise<void> {
    try {
      await this.web3Service.disconnectWallet();
      this.router.navigate(['/connect']);
      this.showMessage('Wallet disconnected', 'success');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      this.showMessage('Error disconnecting wallet', 'error');
    }
  }

  navigateToSend(): void {
    this.router.navigate(['/send']);
  }

  navigateToReceive(): void {
    this.router.navigate(['/receive']);
  }

  copyAddress(): void {
    if (this.walletState.address) {
      navigator.clipboard.writeText(this.walletState.address);
      this.showMessage('Address copied to clipboard', 'success');
    }
  }

  getNetworkName(): string {
    const networkId = this.walletState.networkId;
    switch (networkId) {
      case 11155111:
        return 'Sepolia Testnet';
      case 5:
        return 'Goerli Testnet';
      case 8453:
        return 'Base Mainnet';
      case 84532:
        return 'Base Sepolia Testnet';
      default:
        return `Network ${networkId}`;
    }
  }

  getNetworkColor(): string {
    const networkId = this.walletState.networkId;
    switch (networkId) {
      case 11155111:
      case 5:
        return '#FF9800';
      case 8453:
        return '#0052FF';
      case 84532:
        return '#0052FF';
      default:
        return '#9E9E9E';
    }
  }

  async switchToBaseNetwork(): Promise<void> {
    try {
      await this.web3Service.switchToBaseNetwork();
      this.showMessage('Switched to Base network', 'success');
    } catch (error) {
      console.error('Error switching to Base network:', error);
      this.showMessage('Failed to switch to Base network', 'error');
    }
  }

  isOnBaseNetwork(): boolean {
    return this.web3Service.isOnBaseNetwork();
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
} 