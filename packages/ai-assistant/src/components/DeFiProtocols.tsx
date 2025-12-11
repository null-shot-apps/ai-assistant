'use client';

import { useState, useEffect } from 'react';
import { Layers, TrendingUp, Lock, Droplet } from 'lucide-react';

interface Protocol {
  name: string;
  type: string;
  apy: number;
  tvl: string;
  invested: number;
  earnings: number;
  icon: string;
  color: string;
}

export default function DeFiProtocols() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);

  useEffect(() => {
    // Simulate DeFi protocol data
    setProtocols([
      {
        name: 'Aave',
        type: 'Lending',
        apy: 8.2,
        tvl: '$12.4B',
        invested: 8500,
        earnings: 142.50,
        icon: '🏦',
        color: 'from-purple-500 to-pink-500',
      },
      {
        name: 'Uniswap',
        type: 'Liquidity Pool',
        apy: 15.7,
        tvl: '$4.8B',
        invested: 12000,
        earnings: 385.20,
        icon: '🦄',
        color: 'from-pink-500 to-rose-500',
      },
      {
        name: 'Compound',
        type: 'Lending',
        apy: 6.5,
        tvl: '$3.2B',
        invested: 5000,
        earnings: 78.90,
        icon: '🏛️',
        color: 'from-green-500 to-emerald-500',
      },
      {
        name: 'Curve',
        type: 'Stablecoin Pool',
        apy: 12.3,
        tvl: '$5.6B',
        invested: 10000,
        earnings: 256.80,
        icon: '📈',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        name: 'Lido',
        type: 'ETH Staking',
        apy: 4.8,
        tvl: '$18.9B',
        invested: 15000,
        earnings: 189.40,
        icon: '🔒',
        color: 'from-indigo-500 to-purple-500',
      },
    ]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lending':
        return <Lock className="w-4 h-4" />;
      case 'Liquidity Pool':
        return <Droplet className="w-4 h-4" />;
      case 'Stablecoin Pool':
        return <TrendingUp className="w-4 h-4" />;
      case 'ETH Staking':
        return <Lock className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg">
          <Layers className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">DeFi Protocols</h2>
          <p className="text-sm text-purple-300">Active investments & yields</p>
        </div>
      </div>

      <div className="space-y-3">
        {protocols.map((protocol, index) => (
          <div
            key={index}
            className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-br ${protocol.color} p-2 rounded-lg text-2xl`}>
                  {protocol.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{protocol.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-purple-300">
                    {getTypeIcon(protocol.type)}
                    <span>{protocol.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-lg">{protocol.apy}%</div>
                <div className="text-xs text-purple-300">APY</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-purple-500/10">
              <div>
                <div className="text-xs text-purple-300 mb-1">Invested</div>
                <div className="text-white font-semibold">
                  ${protocol.invested.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-300 mb-1">Earnings</div>
                <div className="text-green-400 font-semibold">
                  +${protocol.earnings.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-300 mb-1">TVL</div>
                <div className="text-white font-semibold">{protocol.tvl}</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-purple-500/10">
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-3 py-2 rounded-lg text-sm font-semibold transition-all border border-purple-500/30">
                  Withdraw
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all">
                  Add More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

