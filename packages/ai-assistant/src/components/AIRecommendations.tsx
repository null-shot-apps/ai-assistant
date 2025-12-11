'use client';

import { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'opportunity' | 'warning' | 'action';
  title: string;
  description: string;
  confidence: number;
  potentialReturn?: string;
  risk?: string;
}

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setRecommendations([
        {
          id: '1',
          type: 'opportunity',
          title: 'High Yield Opportunity in Aave',
          description: 'USDC lending on Aave currently offers 8.2% APY, 2.1% above your target threshold. AI recommends allocating 15% of idle funds.',
          confidence: 92,
          potentialReturn: '+$1,234/year',
          risk: 'Low',
        },
        {
          id: '2',
          type: 'action',
          title: 'Rebalance Liquidity Pool',
          description: 'Your ETH/USDC pool on Uniswap has experienced impermanent loss of 3.2%. Consider rebalancing or moving to a stable pair.',
          confidence: 87,
          potentialReturn: 'Reduce loss by $450',
          risk: 'Medium',
        },
        {
          id: '3',
          type: 'opportunity',
          title: 'Staking Rewards Available',
          description: 'Unclaimed staking rewards detected: 0.045 ETH ($142). AI suggests claiming and reinvesting for compound growth.',
          confidence: 95,
          potentialReturn: '+$142 immediate',
          risk: 'None',
        },
        {
          id: '4',
          type: 'warning',
          title: 'Market Volatility Alert',
          description: 'AI detects increased volatility in DeFi markets. Consider reducing leverage positions by 20% to maintain risk tolerance.',
          confidence: 78,
          risk: 'High',
        },
      ]);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'action':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'opportunity':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          icon: 'bg-green-500',
          text: 'text-green-400',
        };
      case 'warning':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          icon: 'bg-red-500',
          text: 'text-red-400',
        };
      case 'action':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          icon: 'bg-blue-500',
          text: 'text-blue-400',
        };
      default:
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          icon: 'bg-purple-500',
          text: 'text-purple-400',
        };
    }
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
            <p className="text-sm text-purple-300">Real-time market analysis & insights</p>
          </div>
        </div>
        {isAnalyzing && (
          <div className="flex items-center gap-2 text-purple-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Analyzing...</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const colors = getColors(rec.type);
          return (
            <div
              key={rec.id}
              className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-4">
                <div className={`${colors.icon} p-2 rounded-lg flex-shrink-0`}>
                  {getIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold">{rec.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-purple-300 bg-slate-800/50 px-2 py-1 rounded">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-purple-300 mb-3">{rec.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    {rec.potentialReturn && (
                      <span className="text-green-400 font-semibold">
                        {rec.potentialReturn}
                      </span>
                    )}
                    {rec.risk && (
                      <span className={`${colors.text} font-semibold`}>
                        Risk: {rec.risk}
                      </span>
                    )}
                  </div>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Execute
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

