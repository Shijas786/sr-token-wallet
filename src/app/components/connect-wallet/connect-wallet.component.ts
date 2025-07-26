import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Web3Service, WalletProvider } from '../../services/web3.service';

@Component({
  selector: 'app-connect-wallet',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent implements OnInit {
  isConnecting = false;
  availableWallets: WalletProvider[] = [];

  constructor(
    private web3Service: Web3Service,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Check if already connected
    const walletState = this.web3Service.getCurrentWalletState();
    if (walletState.isConnected) {
      this.router.navigate(['/dashboard']);
    }
    
    // Get available wallets
    this.availableWallets = this.web3Service.getAvailableWallets();
  }

  async connectWallet(walletId: string): Promise<void> {
    this.isConnecting = true;
    
    try {
      await this.web3Service.connectWallet(walletId);
      this.showMessage('Wallet connected successfully!', 'success');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Connection error:', error);
      this.showMessage(
        error.message || 'Failed to connect wallet. Please try again.',
        'error'
      );
    } finally {
      this.isConnecting = false;
    }
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  openMetaMaskWebsite(): void {
    window.open('https://metamask.io/download/', '_blank');
  }
} 