/**
 * Market Data Service
 * Fetches real-time cryptocurrency prices and market data from CoinGecko API
 */

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

export interface DeFiProtocolData {
  name: string;
  tvl: number;
  apy: number;
  category: string;
}

export class MarketDataService {
  private baseUrl = 'https://api.coingecko.com/api/v3';
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 60000; // 1 minute cache

  /**
   * Fetch current prices for multiple cryptocurrencies
   */
  async getPrices(coinIds: string[]): Promise<Record<string, CryptoPrice>> {
    const cacheKey = `prices_${coinIds.join(',')}`;
    
    // Check cache
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&sparkline=false`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as any;
      const prices: Record<string, CryptoPrice> = {};

      data.forEach((coin: any) => {
        prices[coin.id] = {
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          current_price: coin.current_price,
          price_change_24h: coin.price_change_24h,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          market_cap: coin.market_cap,
          total_volume: coin.total_volume,
          high_24h: coin.high_24h,
          low_24h: coin.low_24h,
        };
      });

      // Cache the result
      this.cache.set(cacheKey, { data: prices, timestamp: Date.now() });

      return prices;
    } catch (error) {
      console.error('Error fetching prices:', error);
      return this.getFallbackPrices(coinIds);
    }
  }

  /**
   * Get simple price for quick lookups
   */
  async getSimplePrice(coinIds: string[]): Promise<Record<string, { usd: number; usd_24h_change: number }>> {
    const cacheKey = `simple_${coinIds.join(',')}`;
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_24hr_change=true`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as any;
      this.cache.set(cacheKey, { data, timestamp: Date.now() });

      return data;
    } catch (error) {
      console.error('Error fetching simple price:', error);
      return this.getFallbackSimplePrices(coinIds);
    }
  }

  /**
   * Get historical price data for charting
   */
  async getHistoricalData(
    coinId: string,
    days: number = 7
  ): Promise<Array<{ timestamp: number; price: number }>> {
    const cacheKey = `history_${coinId}_${days}`;
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as any;
      const historicalData = data.prices.map((point: [number, number]) => ({
        timestamp: point[0],
        price: point[1],
      }));

      this.cache.set(cacheKey, { data: historicalData, timestamp: Date.now() });

      return historicalData;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  }

  /**
   * Get trending cryptocurrencies
   */
  async getTrending(): Promise<Array<{ id: string; name: string; symbol: string }>> {
    const cacheKey = 'trending';
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const response = await fetch(`${this.baseUrl}/search/trending`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as any;
      const trending = data.coins.map((item: any) => ({
        id: item.item.id,
        name: item.item.name,
        symbol: item.item.symbol,
      }));

      this.cache.set(cacheKey, { data: trending, timestamp: Date.now() });

      return trending;
    } catch (error) {
      console.error('Error fetching trending:', error);
      return [];
    }
  }

  /**
   * Get DeFi protocol data (simulated - would use DeFiLlama in production)
   */
  async getDeFiProtocols(): Promise<DeFiProtocolData[]> {
    // In production, this would fetch from DeFiLlama API
    return [
      { name: 'Aave', tvl: 12400000000, apy: 8.2, category: 'Lending' },
      { name: 'Uniswap', tvl: 4800000000, apy: 15.7, category: 'DEX' },
      { name: 'Compound', tvl: 3200000000, apy: 6.5, category: 'Lending' },
      { name: 'Curve', tvl: 5600000000, apy: 12.3, category: 'DEX' },
      { name: 'Lido', tvl: 18900000000, apy: 4.8, category: 'Staking' },
    ];
  }

  /**
   * Calculate portfolio metrics
   */
  calculatePortfolioMetrics(holdings: Record<string, number>, prices: Record<string, CryptoPrice>) {
    let totalValue = 0;
    let totalChange24h = 0;

    Object.entries(holdings).forEach(([coinId, amount]) => {
      const price = prices[coinId];
      if (price) {
        const value = amount * price.current_price;
        totalValue += value;
        totalChange24h += value * (price.price_change_percentage_24h / 100);
      }
    });

    return {
      totalValue,
      totalChange24h,
      changePercentage24h: totalValue > 0 ? (totalChange24h / totalValue) * 100 : 0,
    };
  }

  // Private helper methods

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheTimeout;
  }

  private getFallbackPrices(coinIds: string[]): Record<string, CryptoPrice> {
    // Fallback mock data
    const fallback: Record<string, CryptoPrice> = {
      'ethereum': {
        id: 'ethereum',
        symbol: 'ETH',
        name: 'Ethereum',
        current_price: 2250,
        price_change_24h: 45.50,
        price_change_percentage_24h: 2.06,
        market_cap: 270000000000,
        total_volume: 15000000000,
        high_24h: 2280,
        low_24h: 2200,
      },
      'bitcoin': {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        current_price: 43500,
        price_change_24h: 650,
        price_change_percentage_24h: 1.52,
        market_cap: 850000000000,
        total_volume: 25000000000,
        high_24h: 44000,
        low_24h: 42800,
      },
    };

    return fallback;
  }

  private getFallbackSimplePrices(coinIds: string[]): Record<string, { usd: number; usd_24h_change: number }> {
    return {
      'ethereum': { usd: 2250, usd_24h_change: 2.06 },
      'bitcoin': { usd: 43500, usd_24h_change: 1.52 },
      'usd-coin': { usd: 1.0, usd_24h_change: 0.01 },
      'dai': { usd: 1.0, usd_24h_change: -0.02 },
    };
  }
}

// Export singleton instance
export const marketDataService = new MarketDataService();

