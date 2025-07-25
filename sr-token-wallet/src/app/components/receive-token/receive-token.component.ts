import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Web3Service, WalletState } from '../../services/web3.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-receive-token',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './receive-token.component.html',
  styleUrls: ['./receive-token.component.scss']
})
export class ReceiveTokenComponent implements OnInit, AfterViewInit {
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;
  
  walletState: WalletState = {
    isConnected: false,
    address: null,
    balance: '0',
    networkId: null
  };

  constructor(
    private web3Service: Web3Service,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.web3Service.getWalletState().subscribe(state => {
      this.walletState = state;
      // Generate QR code when wallet state changes
      setTimeout(() => {
        this.generateQRCode();
      }, 100);
    });
  }

  ngAfterViewInit(): void {
    // Generate QR code after view is initialized
    setTimeout(() => {
      this.generateQRCode();
    }, 100);
  }

  async generateQRCode(): Promise<void> {
    if (!this.walletState.address || !this.qrCanvas) {
      return;
    }

    try {
      const canvas = this.qrCanvas.nativeElement;
      
      // Clear the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Generate QR code with custom options
      await QRCode.toCanvas(canvas, this.walletState.address, {
        width: 200,
        margin: 2,
        color: {
          dark: '#6366f1', // Indigo color for dark modules
          light: '#ffffff'  // White for light modules
        },
        errorCorrectionLevel: 'M'
      });

      // Add a subtle border to the QR code
      if (ctx) {
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      this.snackBar.open('Failed to generate QR code', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  copyAddress(): void {
    if (this.walletState.address) {
      navigator.clipboard.writeText(this.walletState.address);
      this.snackBar.open('Address copied to clipboard!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }

  async shareAddress(): Promise<void> {
    if (this.walletState.address && navigator.share) {
      try {
        await navigator.share({
          title: 'My SR Token Wallet Address',
          text: `Send SR tokens to: ${this.walletState.address}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing address:', error);
        this.snackBar.open('Failed to share address', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    } else {
      // Fallback to copy if Web Share API is not available
      this.copyAddress();
    }
  }

  getNetworkName(): string {
    if (!this.walletState.networkId) return 'Unknown';
    
    switch (this.walletState.networkId) {
      case 1:
        return 'Ethereum Mainnet';
      case 11155111:
        return 'Sepolia Testnet';
      case 5:
        return 'Goerli Testnet';
      default:
        return `Network ${this.walletState.networkId}`;
    }
  }

  getNetworkColor(): string {
    if (!this.walletState.networkId) return '#64748b';
    
    switch (this.walletState.networkId) {
      case 1:
        return '#10b981'; // Green for mainnet
      case 11155111:
        return '#6366f1'; // Indigo for Sepolia
      case 5:
        return '#8b5cf6'; // Purple for Goerli
      default:
        return '#64748b'; // Gray for unknown
    }
  }

  getEtherscanUrl(address: string): string {
    if (!address) return '#';
    
    const networkId = this.walletState.networkId;
    let baseUrl = 'https://etherscan.io';
    
    if (networkId === 11155111) {
      baseUrl = 'https://sepolia.etherscan.io';
    } else if (networkId === 5) {
      baseUrl = 'https://goerli.etherscan.io';
    }
    
    return `${baseUrl}/address/${address}`;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
} 