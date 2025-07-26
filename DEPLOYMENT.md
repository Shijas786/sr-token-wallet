# 🚀 Free Deployment Guide for SR Token Wallet

This guide provides step-by-step instructions for deploying your SR Token Wallet to various free hosting platforms.

## 📋 Prerequisites

1. **Build your application**:
   ```bash
   npm run build
   ```

2. **Ensure your app works locally**:
   ```bash
   npm start
   ```

## 🎯 Option 1: Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
# Navigate to your project directory
cd sr-token-wallet

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: sr-token-wallet
# - Directory: ./
# - Override settings? No
```

### Step 3: Automatic Deployments
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Import your repository
4. Vercel will automatically deploy on every push to main branch

**Benefits:**
- ✅ Free custom domains
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments for PRs
- ✅ Zero configuration needed

## 🎯 Option 2: Netlify

### Step 1: Deploy via Netlify UI
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Click "New site from Git"
4. Choose your repository
5. Build command: `npm run build`
6. Publish directory: `dist/sr-token-wallet/browser`
7. Click "Deploy site"

### Step 2: Custom Domain (Optional)
1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

**Benefits:**
- ✅ Free SSL certificates
- ✅ Form handling
- ✅ Branch deployments
- ✅ Easy rollbacks

## 🎯 Option 3: Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase
```bash
firebase init hosting

# Select your project or create a new one
# Public directory: dist/sr-token-wallet/browser
# Configure as single-page app: Yes
# Overwrite index.html: No
```

### Step 4: Deploy
```bash
firebase deploy
```

**Benefits:**
- ✅ Google's infrastructure
- ✅ Free SSL certificates
- ✅ Easy integration with other Firebase services
- ✅ Custom domains

## 🎯 Option 4: Surge.sh

### Step 1: Install Surge
```bash
npm install -g surge
```

### Step 2: Deploy
```bash
# Build your app first
npm run build

# Deploy to Surge
surge dist/sr-token-wallet/browser

# Follow the prompts to create account and choose subdomain
```

**Benefits:**
- ✅ Lightning fast deployment
- ✅ Free subdomains
- ✅ Custom domains supported
- ✅ Simple one-command deployment

## 🔧 Environment Variables

If your app needs environment variables, add them in your hosting platform's dashboard:

### Common Variables:
```bash
# For production builds
NODE_ENV=production
ANGULAR_ENVIRONMENT=production
```

## 📱 Custom Domains

All platforms support custom domains:

1. **Vercel**: Add domain in project settings
2. **Netlify**: Domain settings → Add custom domain
3. **Firebase**: Hosting → Custom domains
4. **Surge**: `surge --domain yourdomain.com`

## 🔄 Continuous Deployment

### GitHub Actions (Already configured)
Your project already has GitHub Actions set up for GitHub Pages. You can modify it for other platforms:

```yaml
# .github/workflows/deploy-vercel.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🚨 Troubleshooting

### Common Issues:

1. **Build fails**: Check Node.js version (use 18+)
2. **Routing issues**: Ensure SPA routing is configured
3. **Environment variables**: Add them in platform dashboard
4. **CORS issues**: Configure allowed origins

### Debug Commands:
```bash
# Test build locally
npm run build

# Serve built files locally
npx http-server dist/sr-token-wallet/browser

# Check for build errors
npm run build --verbose
```

## 📊 Performance Tips

1. **Enable compression** in your hosting platform
2. **Set cache headers** for static assets
3. **Use CDN** (all platforms provide this)
4. **Optimize images** before deployment
5. **Enable gzip compression**

## 🔒 Security Considerations

1. **HTTPS**: All platforms provide free SSL
2. **Environment variables**: Never commit secrets
3. **CORS**: Configure allowed origins
4. **Content Security Policy**: Add CSP headers

## 📞 Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Netlify**: [netlify.com/support](https://netlify.com/support)
- **Firebase**: [firebase.google.com/support](https://firebase.google.com/support)
- **Surge**: [surge.sh/help](https://surge.sh/help)

---

**Choose the platform that best fits your needs! Vercel is recommended for its ease of use and excellent Angular support.** 