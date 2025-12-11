'use client';

import { TrendingUp, DollarSign, Activity, Percent } from 'lucide-react';

export default function Dashboard() {
  const stats = {
    totalValue: 45678.92,
    dailyChange: 3.24,
    activeInvestments: 8,
    avgAPY: 12.5,
  };

  const statCards = [
    {
      title: 'Total Portfolio Value',
      value: `$${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: `+${stats.dailyChange}%`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      title: 'Daily Change',
      value: `+$${(stats.totalValue * stats.dailyChange / 100).toFixed(2)}`,
      change: '24h',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      title: 'Active Investments',
      value: stats.activeInvestments.toString(),
      change: 'DeFi Protocols',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      title: 'Average APY',
      value: `${stats.avgAPY}%`,
      change: 'Yield',
      icon: Percent,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-sm rounded-xl p-6 transition-all hover:scale-105`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-purple-300 bg-slate-800/50 px-2 py-1 rounded">
              {stat.change}
            </span>
          </div>
          <h3 className="text-sm text-purple-300 mb-1">{stat.title}</h3>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
