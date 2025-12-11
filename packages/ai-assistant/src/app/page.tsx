'use client';

import { useState } from 'react';
import { Wallet, Brain, Zap } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import AIRecommendations from '@/components/AIRecommendations';
import PortfolioOverview from '@/components/PortfolioOverview';
import AutomatedPayments from '@/components/AutomatedPayments';
import DeFiProtocols from '@/components/DeFiProtocols';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = () => {
    // Simulated wallet connection (Ganache/Hardhat)
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setWalletAddress(mockAddress);
    setWalletConnected(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI DeFi Assistant</h1>
                <p className="text-sm text-purple-300">Autonomous Finance Management</p>
              </div>
            </div>
            
            {!walletConnected ? (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-purple-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-300">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {!walletConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 rounded-2xl border border-purple-500/30 max-w-md">
              <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to AI DeFi Assistant</h2>
              <p className="text-purple-300 mb-6">
                Connect your wallet to start managing your DeFi investments with AI-powered automation
              </p>
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all mx-auto"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <Dashboard />
            
            {/* AI Recommendations */}
            <AIRecommendations />
            
            {/* Portfolio & DeFi Protocols */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortfolioOverview />
              <DeFiProtocols />
            </div>
            
            {/* Automated Payments */}
            <AutomatedPayments />
          </div>
        )}
      </div>
    </main>
  );
}
