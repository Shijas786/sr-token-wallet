# SR Token Wallet

A modern, Layer3-inspired Ethereum wallet application for managing SR tokens with a beautiful, responsive interface.

## 🚀 Features

- **🔐 Secure Wallet Integration**: MetaMask integration with bank-grade security
- **💎 SR Token Management**: Send and receive SR tokens on Ethereum network
- **📱 Responsive Design**: Beautiful Layer3-inspired UI that works on all devices
- **🔍 QR Code Support**: Generate QR codes for easy address sharing
- **⚡ Real-time Updates**: Live balance and transaction status updates
- **🌐 Multi-Network Support**: Ethereum Mainnet, Sepolia, and Goerli testnets
- **📊 Transaction History**: Track your recent transactions with Etherscan links

## 🛠️ Tech Stack

- **Frontend**: Angular 17 with TypeScript
- **UI Framework**: Angular Material with custom Layer3-inspired theme
- **Web3 Integration**: MetaMask wallet integration
- **QR Code**: qrcode.js library for QR code generation
- **Styling**: SCSS with custom design system
- **Build Tool**: Angular CLI

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension
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

1. **Install MetaMask**: Download and install the MetaMask browser extension
2. **Connect Wallet**: Click "Connect MetaMask" on the home page
3. **Authorize**: Approve the connection in MetaMask popup
4. **View Dashboard**: Your wallet information and balance will be displayed

### Sending SR Tokens

1. **Navigate to Send**: Click "Send SR Tokens" from the dashboard
2. **Enter Details**: 
   - Recipient address (0x...)
   - Amount to send
3. **Review**: Check the transaction details and fees
4. **Confirm**: Click "Send Tokens" and approve in MetaMask
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

- **Ethereum Mainnet** (Chain ID: 1)
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

## 🔒 Security

- **MetaMask Integration**: Uses MetaMask's secure wallet connection
- **No Private Key Storage**: Private keys never leave MetaMask
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
- **MetaMask**: For secure wallet integration
- **Ethereum Community**: For the blockchain infrastructure

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/sr-token-wallet/issues) page
2. Create a new issue with detailed information
3. Include browser version, MetaMask version, and error messages

## 🔄 Version History

- **v1.0.0**: Initial release with core wallet functionality
- **v1.1.0**: Added QR code support and improved UI
- **v1.2.0**: Enhanced security and performance optimizations

---

**Built with ❤️ for the Ethereum community**

## 📦 **Your Vercel Live Link**

Your SR Token Wallet will be available at a URL like:
```
https://sr-token-wallet-[random-string].vercel.app
```

## 📱 **What You Can Do Now**

1. **Wait for deployment** - It usually takes 1-2 minutes
2. **Check the terminal** - The live URL will appear when deployment completes
3. **Visit Vercel Dashboard** - Go to [vercel.com/dashboard](https://vercel.com/dashboard) to see your project

## 🎯 **Next Steps**

Once you have your live link:

1. **Test your wallet** - Connect MetaMask and test the functionality
2. **Share the link** - Share with others to test your SR Token Wallet
3. **Custom domain** (optional) - Add your own domain in Vercel settings
4. **Monitor performance** - Check Vercel analytics for usage stats

## 📦 **Automatic Deployments**

Now that your project is linked to Vercel, every time you push changes to your GitHub repository, Vercel will automatically deploy the updates to your live link!

Your SR Token Wallet will be live and accessible to anyone with the URL. The deployment should complete shortly and you'll see the live link in your terminal or Vercel dashboard.
