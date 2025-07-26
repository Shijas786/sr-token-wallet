import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Web3Service, WalletState } from '../../services/web3.service';

@Component({
  selector: 'app-send-token',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './send-token.component.html',
  styleUrls: ['./send-token.component.scss']
})
export class SendTokenComponent implements OnInit {
  sendForm: FormGroup;
  walletState: WalletState = {
    isConnected: false,
    address: null,
    balance: '0',
    networkId: null
  };
  isSending = false;
  recentTransactions: any[] = [];

  constructor(
    private fb: FormBuilder,
    public web3Service: Web3Service,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.sendForm = this.fb.group({
      recipientAddress: ['', [Validators.required, this.validateEthereumAddress.bind(this)]],
      amount: ['', [Validators.required, Validators.min(0.000001), this.validateBalance.bind(this)]]
    });
  }

  ngOnInit(): void {
    this.web3Service.getWalletState().subscribe(state => {
      this.walletState = state;
      this.updateBalanceValidation();
    });
  }

  validateEthereumAddress(control: any): {[key: string]: any} | null {
    const address = control.value;
    if (!address) return null;
    
    // Basic Ethereum address validation
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethereumAddressRegex.test(address)) {
      return { 'invalidAddress': true };
    }
    return null;
  }

  validateBalance(control: any): {[key: string]: any} | null {
    const amount = parseFloat(control.value);
    if (!amount || amount <= 0) return null;
    
    const balance = parseFloat(this.walletState?.balance || '0');
    if (amount > balance) {
      return { 'insufficientBalance': true };
    }
    return null;
  }

  updateBalanceValidation(): void {
    const amountControl = this.sendForm.get('amount');
    if (amountControl) {
      amountControl.updateValueAndValidity();
    }
  }

  setMaxAmount(): void {
    if (this.walletState?.balance) {
      this.sendForm.patchValue({
        amount: this.walletState.balance
      });
    }
  }

  async sendTokens(): Promise<void> {
    if (this.sendForm.invalid) {
      this.snackBar.open('Please fix the form errors', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isSending = true;
    const { recipientAddress, amount } = this.sendForm.value;

    try {
      const txHash = await this.web3Service.transferTokens(recipientAddress, amount);
      
      // Add to recent transactions
      this.recentTransactions.unshift({
        to: recipientAddress,
        amount: amount,
        hash: txHash,
        timestamp: new Date()
      });

      this.snackBar.open('Tokens sent successfully!', 'Close', {
        duration: 5000,
        panelClass: ['success-snackbar']
      });

      this.sendForm.reset();
    } catch (error: any) {
      console.error('Error sending tokens:', error);
      this.snackBar.open(error.message || 'Failed to send tokens', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isSending = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
} 