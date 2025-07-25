import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject, Observable } from 'rxjs';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  networkId: number | null;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
  balance: string;
}

export interface WalletProvider {
  name: string;
  id: string;
  icon: string;
  isAvailable: boolean;
  connect: () => Promise<ethers.BrowserProvider>;
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private walletState = new BehaviorSubject<WalletState>({
    isConnected: false,
    address: null,
    balance: '0',
    networkId: null
  });

  // SR Token Contract Address (placeholder - replace with actual deployed contract)
  private readonly TOKEN_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';
  
  // ERC-20 ABI for token interactions
  private readonly ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)'
  ];

  private walletProviders: WalletProvider[] = [
    {
      name: 'MetaMask',
      id: 'metamask',
      icon: '🦊',
      isAvailable: false,
      connect: async () => {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          return new ethers.BrowserProvider((window as any).ethereum);
        }
        throw new Error('MetaMask not available');
      }
    },
    {
      name: 'Rabby',
      id: 'rabby',
      icon: '🦊',
      isAvailable: false,
      connect: async () => {
        if (typeof window !== 'undefined' && (window as any).rabby) {
          return new ethers.BrowserProvider((window as any).rabby);
        }
        throw new Error('Rabby not available');
      }
    },
    {
      name: 'Coinbase Wallet',
      id: 'coinbase',
      icon: '🪙',
      isAvailable: false,
      connect: async () => {
        if (typeof window !== 'undefined' && (window as any).coinbaseWalletExtension) {
          return new ethers.BrowserProvider((window as any).coinbaseWalletExtension);
        }
        throw new Error('Coinbase Wallet not available');
      }
    },
    {
      name: 'WalletConnect',
      id: 'walletconnect',
      icon: '🔗',
      isAvailable: false,
      connect: async () => {
        // This would require WalletConnect setup
        throw new Error('WalletConnect not implemented yet');
      }
    }
  ];

  constructor() {
    this.detectAvailableWallets();
  }

  private detectAvailableWallets(): void {
    if (typeof window === 'undefined') return;

    this.walletProviders.forEach(provider => {
      switch (provider.id) {
        case 'metamask':
          provider.isAvailable = !!(window as any).ethereum && !(window as any).ethereum.isRabby;
          break;
        case 'rabby':
          provider.isAvailable = !!(window as any).rabby || ((window as any).ethereum && (window as any).ethereum.isRabby);
          break;
        case 'coinbase':
          provider.isAvailable = !!(window as any).coinbaseWalletExtension;
          break;
        case 'walletconnect':
          provider.isAvailable = true; // Always available as fallback
          break;
      }
    });
  }

  getAvailableWallets(): WalletProvider[] {
    return this.walletProviders.filter(wallet => wallet.isAvailable);
  }

  async connectWallet(walletId: string): Promise<boolean> {
    try {
      const wallet = this.walletProviders.find(w => w.id === walletId);
      if (!wallet || !wallet.isAvailable) {
        throw new Error(`${wallet?.name || 'Wallet'} not available`);
      }

      this.provider = await wallet.connect();
      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      
      this.walletState.next({
        isConnected: true,
        address: address,
        balance: '0',
        networkId: Number(network.chainId)
      });

      await this.getTokenBalance();
      return true;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async disconnectWallet(): Promise<void> {
    this.signer = null;
    this.provider = null;
    this.walletState.next({
      isConnected: false,
      address: null,
      balance: '0',
      networkId: null
    });
  }

  async getTokenBalance(): Promise<string> {
    try {
      if (!this.signer || !this.walletState.value.isConnected) {
        return '0';
      }

      const tokenContract = new ethers.Contract(
        this.TOKEN_CONTRACT_ADDRESS,
        this.ERC20_ABI,
        this.signer
      );

      const balance = await tokenContract['balanceOf'](this.walletState.value.address);
      const formattedBalance = ethers.formatUnits(balance, 18);
      
      this.walletState.next({
        ...this.walletState.value,
        balance: formattedBalance
      });

      return formattedBalance;
    } catch (error) {
      console.error('Error getting token balance:', error);
      return '0';
    }
  }

  async getTokenInfo(): Promise<TokenInfo> {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      const tokenContract = new ethers.Contract(
        this.TOKEN_CONTRACT_ADDRESS,
        this.ERC20_ABI,
        this.signer
      );

      const [name, symbol, decimals, totalSupply, balance] = await Promise.all([
        tokenContract['name'](),
        tokenContract['symbol'](),
        tokenContract['decimals'](),
        tokenContract['totalSupply'](),
        tokenContract['balanceOf'](this.walletState.value.address)
      ]);

      return {
        symbol,
        name,
        decimals,
        totalSupply: ethers.formatUnits(totalSupply, decimals),
        balance: ethers.formatUnits(balance, decimals)
      };
    } catch (error) {
      console.error('Error getting token info:', error);
      throw error;
    }
  }

  async transferTokens(toAddress: string, amount: string): Promise<string> {
    try {
      if (!this.signer || !this.walletState.value.isConnected) {
        throw new Error('Wallet not connected');
      }

      // Validate address
      if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid recipient address');
      }

      const tokenContract = new ethers.Contract(
        this.TOKEN_CONTRACT_ADDRESS,
        this.ERC20_ABI,
        this.signer
      );

      // Convert amount to wei (assuming 18 decimals)
      const amountInWei = ethers.parseUnits(amount, 18);

      // Send transaction
      const tx = await tokenContract['transfer'](toAddress, amountInWei);
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      // Update balance after successful transfer
      await this.getTokenBalance();
      
      return receipt.hash;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  }

  async getTransactionHistory(address: string): Promise<any[]> {
    try {
      if (!this.provider) {
        throw new Error('Provider not initialized');
      }

      // This would typically use Etherscan API or similar
      // For now, we'll return an empty array
      // In a real implementation, you'd fetch from Etherscan API
      return [];
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return [];
    }
  }

  getWalletState(): Observable<WalletState> {
    return this.walletState.asObservable();
  }

  getCurrentWalletState(): WalletState {
    return this.walletState.value;
  }

  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && !!(window as any).ethereum;
  }

  async switchNetwork(chainId: string): Promise<void> {
    try {
      if (!this.provider) {
        throw new Error('Provider not initialized');
      }

      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      });
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }

  formatAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  getEtherscanUrl(txHash: string): string {
    const networkId = this.walletState.value.networkId;
    if (networkId === 1) {
      return `https://etherscan.io/tx/${txHash}`;
    } else if (networkId === 11155111) {
      return `https://sepolia.etherscan.io/tx/${txHash}`;
    } else if (networkId === 5) {
      return `https://goerli.etherscan.io/tx/${txHash}`;
    }
    return `https://etherscan.io/tx/${txHash}`;
  }
} 