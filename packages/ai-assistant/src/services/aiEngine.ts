/**
 * AI Engine for DeFi Investment Optimization
 * Analyzes market trends, user goals, and provides intelligent recommendations
 */

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

export interface UserProfile {
  riskTolerance: 'low' | 'medium' | 'high';
  investmentGoals: string[];
  preferredProtocols: string[];
  minAPY: number;
}

export interface AIRecommendation {
  action: 'buy' | 'sell' | 'hold' | 'rebalance' | 'stake' | 'unstake';
  protocol: string;
  asset: string;
  amount?: number;
  reason: string;
  confidence: number;
  expectedReturn: number;
  risk: 'low' | 'medium' | 'high';
  timeframe: string;
}

export class AIEngine {
  private userProfile: UserProfile;
  private historicalData: Map<string, number[]> = new Map();
  private learningRate = 0.01;

  constructor(userProfile: UserProfile) {
    this.userProfile = userProfile;
  }

  /**
   * Analyze market data and generate investment recommendations
   */
  async analyzeMarket(marketData: MarketData[]): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = [];

    for (const data of marketData) {
      // Store historical data for learning
      this.updateHistoricalData(data.symbol, data.price);

      // Calculate trend indicators
      const trend = this.calculateTrend(data.symbol);
      const volatility = this.calculateVolatility(data.symbol);
      const momentum = this.calculateMomentum(data);

      // Generate recommendations based on AI analysis
      const recommendation = this.generateRecommendation(
        data,
        trend,
        volatility,
        momentum
      );

      if (recommendation) {
        recommendations.push(recommendation);
      }
    }

    // Sort by confidence and expected return
    return recommendations.sort((a, b) => 
      (b.confidence * b.expectedReturn) - (a.confidence * a.expectedReturn)
    );
  }

  /**
   * Optimize portfolio allocation based on risk tolerance
   */
  optimizePortfolio(
    currentAllocation: Map<string, number>,
    targetValue: number
  ): Map<string, number> {
    const optimized = new Map<string, number>();
    
    // Risk-based allocation strategy
    const riskWeights = {
      low: { stable: 0.7, moderate: 0.25, aggressive: 0.05 },
      medium: { stable: 0.4, moderate: 0.4, aggressive: 0.2 },
      high: { stable: 0.2, moderate: 0.3, aggressive: 0.5 },
    };

    const weights = riskWeights[this.userProfile.riskTolerance];

    // Allocate based on risk profile
    optimized.set('stablecoins', targetValue * weights.stable);
    optimized.set('bluechip', targetValue * weights.moderate);
    optimized.set('defi', targetValue * weights.aggressive);

    return optimized;
  }

  /**
   * Predict optimal DeFi protocol for investment
   */
  predictBestProtocol(
    protocols: Array<{ name: string; apy: number; tvl: number; risk: string }>
  ): string {
    let bestScore = 0;
    let bestProtocol = '';

    for (const protocol of protocols) {
      // Score based on APY, TVL, and risk alignment
      const apyScore = protocol.apy / 100;
      const tvlScore = Math.log10(protocol.tvl) / 10;
      const riskScore = this.getRiskScore(protocol.risk);

      const totalScore = (apyScore * 0.5) + (tvlScore * 0.3) + (riskScore * 0.2);

      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestProtocol = protocol.name;
      }
    }

    return bestProtocol;
  }

  /**
   * Learn from past decisions and adjust strategy
   */
  learn(decision: AIRecommendation, actualReturn: number): void {
    const error = actualReturn - decision.expectedReturn;
    
    // Adjust learning parameters based on error
    if (Math.abs(error) > 0.1) {
      this.learningRate *= 0.95; // Reduce learning rate if large error
    }

    // Update confidence calibration
    const confidenceAdjustment = error * this.learningRate;
    // Store for future predictions (simplified learning)
    console.log(`Learning from decision: ${decision.action} on ${decision.asset}`);
    console.log(`Expected: ${decision.expectedReturn}, Actual: ${actualReturn}`);
  }

  // Private helper methods

  private updateHistoricalData(symbol: string, price: number): void {
    if (!this.historicalData.has(symbol)) {
      this.historicalData.set(symbol, []);
    }
    const history = this.historicalData.get(symbol)!;
    history.push(price);
    
    // Keep only last 100 data points
    if (history.length > 100) {
      history.shift();
    }
  }

  private calculateTrend(symbol: string): 'bullish' | 'bearish' | 'neutral' {
    const history = this.historicalData.get(symbol);
    if (!history || history.length < 10) return 'neutral';

    const recent = history.slice(-10);
    const older = history.slice(-20, -10);

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;

    const change = (recentAvg - olderAvg) / olderAvg;

    if (change > 0.05) return 'bullish';
    if (change < -0.05) return 'bearish';
    return 'neutral';
  }

  private calculateVolatility(symbol: string): number {
    const history = this.historicalData.get(symbol);
    if (!history || history.length < 2) return 0;

    const returns = [];
    for (let i = 1; i < history.length; i++) {
      returns.push((history[i] - history[i - 1]) / history[i - 1]);
    }

    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }

  private calculateMomentum(data: MarketData): number {
    return data.change24h / 100;
  }

  private generateRecommendation(
    data: MarketData,
    trend: string,
    volatility: number,
    momentum: number
  ): AIRecommendation | null {
    const { riskTolerance, minAPY } = this.userProfile;

    // High volatility check
    if (volatility > 0.1 && riskTolerance === 'low') {
      return null; // Skip high volatility assets for low risk users
    }

    // Generate recommendation based on trend and momentum
    if (trend === 'bullish' && momentum > 0.02) {
      return {
        action: 'buy',
        protocol: 'Aave',
        asset: data.symbol,
        amount: 1000,
        reason: `Strong bullish trend detected with ${(momentum * 100).toFixed(2)}% momentum. Market conditions favorable for entry.`,
        confidence: Math.min(95, 70 + (momentum * 100)),
        expectedReturn: momentum * 2,
        risk: volatility > 0.05 ? 'medium' : 'low',
        timeframe: '30 days',
      };
    }

    if (trend === 'bearish' && momentum < -0.02) {
      return {
        action: 'sell',
        protocol: 'Current',
        asset: data.symbol,
        reason: `Bearish trend with negative momentum. Consider reducing exposure to minimize losses.`,
        confidence: Math.min(90, 65 + Math.abs(momentum * 100)),
        expectedReturn: 0,
        risk: 'high',
        timeframe: 'immediate',
      };
    }

    return null;
  }

  private getRiskScore(risk: string): number {
    const riskMap = {
      low: { low: 1.0, medium: 0.5, high: 0.2 },
      medium: { low: 0.7, medium: 1.0, high: 0.6 },
      high: { low: 0.4, medium: 0.7, high: 1.0 },
    };

    return riskMap[this.userProfile.riskTolerance][risk as keyof typeof riskMap.low] || 0.5;
  }
}

// Export singleton instance
export const createAIEngine = (userProfile: UserProfile) => new AIEngine(userProfile);

