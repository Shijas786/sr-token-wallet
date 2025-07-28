# SR Token Wallet

A modern, Layer3-inspired Base network wallet application for managing SR tokens with multi-wallet support and a beautiful, responsive interface.

## 🚀 Features

- **🔐 Multi-Wallet Support**: Auto-detection and support for MetaMask, Rabby, Coinbase Wallet, and more
- **💎 SR Token Management**: Send and receive SR tokens on Base network
- **📱 Responsive Design**: Beautiful Layer3-inspired UI that works on all devices
- **🔍 QR Code Support**: Generate QR codes for easy address sharing
- **⚡ Real-time Updates**: Live balance and transaction status updates
- **🌐 Multi-Network Support**: Base Mainnet and Base Sepolia testnet
- **📊 Transaction History**: Track your recent transactions with Etherscan links
- **🔄 Auto-Detection**: Automatically detects available wallet extensions

## 🛠️ Tech Stack

- **Frontend**: Angular 17 with TypeScript
- **UI Framework**: Angular Material with custom Layer3-inspired theme
- **Web3 Integration**: Ethers.js with multi-wallet support
- **QR Code**: qrcode.js library for QR code generation
- **Styling**: SCSS with custom design system
- **Build Tool**: Angular CLI
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Any supported wallet extension (MetaMask, Rabby, Coinbase Wallet)
- Modern web browser

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sr-token-wallet.git
   cd sr-token-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🎯 Usage

### Connecting Your Wallet

1. **Install a Supported Wallet**: Download and install any supported wallet extension (MetaMask, Rabby, Coinbase Wallet)
2. **Connect Wallet**: The app will automatically detect available wallets and show them as options
3. **Select Wallet**: Click on your preferred wallet from the available options
4. **Authorize**: Approve the connection in your wallet popup
5. **View Dashboard**: Your wallet information and balance will be displayed

### Supported Wallets

- **MetaMask** 🦊 - Most popular Base network wallet
- **Rabby** 🦊 - Advanced DeFi wallet with enhanced security
- **Coinbase Wallet** 🪙 - User-friendly wallet from Coinbase
- **WalletConnect** 🔗 - Mobile wallet connection (coming soon)

### Sending SR Tokens

1. **Navigate to Send**: Click "Send SR Tokens" from the dashboard
2. **Enter Details**: 
   - Recipient address (0x...)
   - Amount to send
3. **Review**: Check the transaction details and fees
4. **Confirm**: Click "Send Tokens" and approve in your wallet
5. **Track**: Monitor transaction status and view on Etherscan

### Receiving SR Tokens

1. **Navigate to Receive**: Click "Receive SR Tokens" from the dashboard
2. **Share Address**: Copy or share your wallet address
3. **QR Code**: Use the generated QR code for mobile wallets
4. **Wait**: Tokens will appear in your balance once received

## 🎨 Design Features

### Layer3-Inspired UI
- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions
- **Custom Icons**: Scalable SVG icons throughout the app
- **Smooth Animations**: Hover effects and micro-interactions
- **Responsive Layout**: Optimized for desktop, tablet, and mobile

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Cyan (#06b6d4)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

## 📱 Supported Networks

- **Base Mainnet** (Chain ID: 8453)
- **Sepolia Testnet** (Chain ID: 11155111)
- **Goerli Testnet** (Chain ID: 5)

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── connect-wallet/
│   │   ├── dashboard/
│   │   ├── send-token/
│   │   └── receive-token/
│   ├── services/
│   │   └── web3.service.ts
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.scss
└── main.ts
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run lint` - Run linting

## 🌐 Live Deployment

Your SR Token Wallet is deployed and live at:
```
https://sr-token-wallet-r8iwglbl4-shijas-projects-45273324.vercel.app
```

### Deployment Features
- **Automatic Deployments**: Every push to GitHub triggers a new deployment
- **Global CDN**: Fast loading worldwide via Vercel's edge network
- **HTTPS**: Secure by default
- **Custom Domain**: Can be configured in Vercel dashboard

## 🔒 Security

- **Multi-Wallet Support**: Uses secure wallet connections for various providers
- **No Private Key Storage**: Private keys never leave your wallet
- **HTTPS Only**: Secure communication protocols
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Graceful error handling and user feedback

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Layer3**: Design inspiration from Layer3's beautiful interface
- **Angular Team**: For the amazing framework
- **Ethers.js**: For Web3 integration
- **Vercel**: For seamless deployment
- **Base Community**: For the blockchain infrastructure

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/sr-token-wallet/issues) page
2. Create a new issue with detailed information
3. Include browser version, wallet extension version, and error messages

## 🔄 Version History

- **v1.0.0**: Initial release with MetaMask integration
- **v1.1.0**: Added QR code support and improved UI
- **v1.2.0**: Enhanced security and performance optimizations
- **v1.3.0**: Added multi-wallet support (MetaMask, Rabby, Coinbase Wallet)

## 🔧 Configuration

### Token Contract Address

The token contract address is currently set to a placeholder. To use with your specific SR token:

1. **Update the contract address** in `src/app/services/web3.service.ts`:
   ```typescript
   private readonly TOKEN_CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE';
   ```

2. **Or use environment variables** for production deployments

---

**Built with ❤️ for the Base community**
