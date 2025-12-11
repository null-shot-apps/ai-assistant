# 🤖 AI DeFi Finance Assistant

An AI-driven personal finance assistant that autonomously manages DeFi investments and programmatic payments, capable of integrating with blockchain for seamless on-chain transactions.

![AI DeFi Assistant](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge) ![DeFi](https://img.shields.io/badge/DeFi-Ready-green?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge)

## ✨ Features

### 1. 🧠 AI-Powered Investment Optimization
- **Intelligent Market Analysis**: AI agent analyzes market trends, user goals, risk tolerance, and investment preferences
- **Autonomous Asset Management**: Automatically optimizes investments in DeFi protocols (staking, yield farming, liquidity provision)
- **Machine Learning**: Learns from past decisions to improve strategies over time
- **Multi-Protocol Support**: Works across different DeFi ecosystems
- **Risk-Adjusted Recommendations**: Tailored to your risk profile (low, medium, high)

### 2. ⚡ Automated Programmatic Payments (x402-style)
- **Recurring Payments**: Schedule and execute automatic on-chain payments (bills, subscriptions)
- **Conditional Execution**: Payments based on user-defined conditions (dates, balance thresholds, financial goals)
- **Smart Contract Integration**: Secure, trustless payment automation
- **Payment History**: Track all automated transactions with full transparency

### 3. 📊 Real-Time Market Data Integration
- **Live Price Feeds**: Real-time cryptocurrency prices from CoinGecko API
- **Market Trends**: 24-hour price changes, volume, and market cap data
- **Portfolio Tracking**: Automatic portfolio valuation and performance metrics
- **Historical Data**: Charts and trends for informed decision-making

### 4. 🏦 DeFi Protocol Integration
- **Multi-Protocol Support**: Aave, Compound, Uniswap, Curve, Lido, and more
- **Yield Optimization**: Compare APY across protocols to maximize returns
- **TVL Monitoring**: Track Total Value Locked for risk assessment
- **One-Click Actions**: Deposit, withdraw, stake, and unstake with ease

### 5. 📈 Data Visualization & Transparency
- **Interactive Dashboard**: Real-time portfolio overview with charts
- **Performance Metrics**: Track investments, earnings, and ROI
- **AI Recommendations**: Clear explanations of AI decision-making
- **Transaction History**: Complete transparency of all blockchain activities

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Charts**: Recharts for data visualization
- **Blockchain**: Ethereum (expandable to multi-chain)
- **AI Engine**: Custom ML-based recommendation system
- **Market Data**: CoinGecko API for real-time prices
- **Icons**: Lucide React
- **Deployment**: Cloudflare Workers (OpenNext)

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- pnpm 10+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ai-defi-assistant.git
cd ai-defi-assistant

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The app will be available at `http://localhost:8000`

### Build for Production

```bash
# Build the application
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
# Blockchain RPC URLs
NEXT_PUBLIC_ETHEREUM_RPC_URL=your_rpc_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# API Keys (optional)
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key
```

### AI Configuration
Customize AI behavior in `src/services/aiEngine.ts`:

```typescript
const userProfile = {
  riskTolerance: 'medium', // 'low' | 'medium' | 'high'
  investmentGoals: ['passive-income', 'capital-growth'],
  preferredProtocols: ['Aave', 'Compound'],
  minAPY: 5.0,
};
```

## 📖 Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" button
- Currently simulated (Ganache/Hardhat)
- MetaMask integration ready for production

### 2. View AI Recommendations
- AI analyzes market conditions in real-time
- Provides actionable recommendations with confidence scores
- Shows potential returns and risk levels
- Click "Execute" to implement recommendations

### 3. Manage DeFi Investments
- View active investments across protocols
- Track earnings and APY in real-time
- Add or withdraw funds with one click
- Monitor Total Value Locked (TVL)

### 4. Set Up Automated Payments
1. Click "Add Payment" in Automated Payments section
2. Enter recipient address, amount, and frequency
3. Set conditions (date, balance threshold, etc.)
4. AI monitors and executes payments automatically

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Dashboard.tsx      # Portfolio stats
│   ├── AIRecommendations.tsx  # AI insights
│   ├── PortfolioOverview.tsx  # Asset allocation
│   ├── DeFiProtocols.tsx      # Protocol management
│   └── AutomatedPayments.tsx  # Payment scheduling
└── services/              # Business logic
    ├── aiEngine.ts        # AI recommendation engine
    ├── blockchainService.ts   # Blockchain integration
    └── marketDataService.ts   # Market data fetching
```

## 🤖 AI Engine

The AI engine uses multiple strategies to optimize your investments:

### Learning Process
1. **Data Collection**: Gathers market data and user interactions
2. **Pattern Recognition**: Identifies trends and opportunities
3. **Strategy Optimization**: Adjusts recommendations based on outcomes
4. **Continuous Improvement**: Refines models over time

### Recommendation Types
- **Buy**: High-confidence opportunities with favorable risk/reward
- **Sell**: Risk mitigation during market volatility
- **Hold**: Maintain current positions
- **Rebalance**: Optimize portfolio allocation
- **Stake/Unstake**: Maximize yield farming returns

## 🔐 Security

- **Non-Custodial**: You always control your private keys
- **Smart Contract Audits**: All integrated protocols are audited
- **Transparent AI**: Full visibility into AI decision-making
- **Secure Transactions**: All transactions require user approval
- **No Private Key Storage**: Wallet connection only, no key storage

## 🌐 Blockchain Support

### Current
- ✅ Ethereum (Mainnet & Testnets)
- ✅ Simulated wallet (Ganache/Hardhat)

### Planned
- 🔄 Binance Smart Chain
- 🔄 Polygon
- 🔄 Solana
- 🔄 Arbitrum
- 🔄 Optimism
- 🔄 MetaMask integration
- 🔄 WalletConnect support

## 📊 Supported DeFi Protocols

| Protocol | Type | APY Range | Status |
|----------|------|-----------|--------|
| Aave | Lending | 4-12% | ✅ Active |
| Compound | Lending | 3-10% | ✅ Active |
| Uniswap | Liquidity | 10-25% | ✅ Active |
| Curve | Stablecoin | 8-15% | ✅ Active |
| Lido | Staking | 4-6% | ✅ Active |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## ⚠️ Disclaimer

This is a prototype/educational project. Always do your own research before making financial decisions. Cryptocurrency investments carry risk, and past performance does not guarantee future results.

**Important Notes:**
- This application is for educational purposes
- Not financial advice
- Use at your own risk
- Always verify transactions before signing
- Never share your private keys

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Ethereum Documentation](https://ethereum.org/developers)
- [CoinGecko API](https://www.coingecko.com/api/documentation)
- [DeFi Protocols](https://defillama.com/)
- [Aave Documentation](https://docs.aave.com/)
- [Compound Documentation](https://docs.compound.finance/)

## 📞 Support

For questions or issues:
- Open a [GitHub Issue](https://github.com/your-org/ai-defi-assistant/issues)
- Join our [Discord Community](https://discord.gg/your-invite)
- Email: support@your-domain.com

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ AI recommendation engine
- ✅ Real-time market data
- ✅ DeFi protocol integration
- ✅ Automated payments
- ✅ Portfolio tracking

### Phase 2 (Q1 2024)
- 🔄 MetaMask integration
- 🔄 Multi-chain support
- 🔄 Advanced ML models
- 🔄 RWA integration
- 🔄 Mobile app

### Phase 3 (Q2 2024)
- 🔄 Cross-chain bridges
- 🔄 Advanced trading strategies
- 🔄 Social trading features
- 🔄 DAO governance
- 🔄 NFT portfolio tracking

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ using Next.js, React, and Blockchain Technology**

*Empowering users with AI-driven DeFi management*
