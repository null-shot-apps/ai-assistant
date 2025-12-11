'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Wallet, TrendingUp } from 'lucide-react';

interface Asset {
  name: string;
  value: number;
  percentage: number;
  change24h: number;
  color: string;
}

export default function PortfolioOverview() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [marketData, setMarketData] = useState<any>(null);

  useEffect(() => {
    // Fetch real market data from CoinGecko
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,dai,wrapped-bitcoin,chainlink&vs_currencies=usd&include_24hr_change=true'
      );
      const data = await response.json() as Record<string, { usd_24h_change?: number }>;
      setMarketData(data);

      // Simulate portfolio allocation with real prices
      const portfolioAssets: Asset[] = [
        {
          name: 'ETH',
          value: 15234.50,
          percentage: 33.3,
          change24h: data.ethereum?.usd_24h_change || 0,
          color: '#627EEA',
        },
        {
          name: 'USDC',
          value: 12000.00,
          percentage: 26.3,
          change24h: data['usd-coin']?.usd_24h_change || 0,
          color: '#2775CA',
        },
        {
          name: 'DAI',
          value: 8500.00,
          percentage: 18.6,
          change24h: data.dai?.usd_24h_change || 0,
          color: '#F5AC37',
        },
        {
          name: 'WBTC',
          value: 6789.42,
          percentage: 14.9,
          change24h: data['wrapped-bitcoin']?.usd_24h_change || 0,
          color: '#F7931A',
        },
        {
          name: 'LINK',
          value: 3155.00,
          percentage: 6.9,
          change24h: data.chainlink?.usd_24h_change || 0,
          color: '#375BD2',
        },
      ];

      setAssets(portfolioAssets);
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Fallback to mock data
      setAssets([
        { name: 'ETH', value: 15234.50, percentage: 33.3, change24h: 2.5, color: '#627EEA' },
        { name: 'USDC', value: 12000.00, percentage: 26.3, change24h: 0.1, color: '#2775CA' },
        { name: 'DAI', value: 8500.00, percentage: 18.6, change24h: -0.2, color: '#F5AC37' },
        { name: 'WBTC', value: 6789.42, percentage: 14.9, change24h: 1.8, color: '#F7931A' },
        { name: 'LINK', value: 3155.00, percentage: 6.9, change24h: 3.2, color: '#375BD2' },
      ]);
    }
  };

  const chartData = assets.map(asset => ({
    name: asset.name,
    value: asset.value,
  }));

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Portfolio Overview</h2>
          <p className="text-sm text-purple-300">Asset allocation & performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }: any) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-lg p-3 border border-purple-500/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  ></div>
                  <span className="text-white font-semibold">{asset.name}</span>
                </div>
                <span className="text-sm text-purple-300">{asset.percentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">
                  ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <div className={`flex items-center gap-1 text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <TrendingUp className={`w-4 h-4 ${asset.change24h < 0 ? 'rotate-180' : ''}`} />
                  <span>{asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

