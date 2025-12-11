'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Plus, Zap } from 'lucide-react';

interface Payment {
  id: string;
  name: string;
  recipient: string;
  amount: number;
  token: string;
  frequency: string;
  nextPayment: string;
  status: 'active' | 'paused';
  totalPaid: number;
  paymentsCount: number;
}

export default function AutomatedPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Simulate automated payment schedules
    setPayments([
      {
        id: '1',
        name: 'Netflix Subscription',
        recipient: '0x742d...4f2a',
        amount: 15.99,
        token: 'USDC',
        frequency: 'Monthly',
        nextPayment: '2024-01-15',
        status: 'active',
        totalPaid: 191.88,
        paymentsCount: 12,
      },
      {
        id: '2',
        name: 'Cloud Storage',
        recipient: '0x8a3c...9d1b',
        amount: 9.99,
        token: 'DAI',
        frequency: 'Monthly',
        nextPayment: '2024-01-20',
        status: 'active',
        totalPaid: 59.94,
        paymentsCount: 6,
      },
      {
        id: '3',
        name: 'Charity Donation',
        recipient: '0x5f2e...7c8d',
        amount: 50.00,
        token: 'USDC',
        frequency: 'Monthly',
        nextPayment: '2024-01-01',
        status: 'active',
        totalPaid: 300.00,
        paymentsCount: 6,
      },
      {
        id: '4',
        name: 'Rent Payment',
        recipient: '0x9b4a...3e5f',
        amount: 1200.00,
        token: 'USDC',
        frequency: 'Monthly',
        nextPayment: '2024-01-01',
        status: 'paused',
        totalPaid: 3600.00,
        paymentsCount: 3,
      },
    ]);
  }, []);

  const togglePaymentStatus = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id 
        ? { ...payment, status: payment.status === 'active' ? 'paused' : 'active' }
        : payment
    ));
  };

  const getDaysUntilPayment = (dateString: string) => {
    const paymentDate = new Date(dateString);
    const today = new Date();
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-2 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Automated Payments</h2>
            <p className="text-sm text-purple-300">Programmatic on-chain transactions</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Payment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {payments.map((payment) => {
          const daysUntil = getDaysUntilPayment(payment.nextPayment);
          return (
            <div
              key={payment.id}
              className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold mb-1">{payment.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-purple-300">
                    <span>To: {payment.recipient}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {payment.status === 'active' ? (
                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                      <XCircle className="w-3 h-3" />
                      Paused
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300 text-sm">Amount</span>
                  <span className="text-white font-bold">
                    {payment.amount} {payment.token}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300 text-sm">Frequency</span>
                  <span className="text-white">{payment.frequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 text-sm">Next Payment</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-white">
                      {daysUntil > 0 ? `in ${daysUntil} days` : 'Today'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-purple-300 mb-3">
                <span>Total Paid: ${payment.totalPaid.toFixed(2)}</span>
                <span>{payment.paymentsCount} payments</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => togglePaymentStatus(payment.id)}
                  className={`flex-1 ${
                    payment.status === 'active'
                      ? 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/30'
                      : 'bg-green-600/20 hover:bg-green-600/30 text-green-300 border-green-500/30'
                  } px-3 py-2 rounded-lg text-sm font-semibold transition-all border`}
                >
                  {payment.status === 'active' ? 'Pause' : 'Resume'}
                </button>
                <button className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-3 py-2 rounded-lg text-sm font-semibold transition-all border border-purple-500/30">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl border border-purple-500/30 p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Add Automated Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-purple-300 mb-2 block">Payment Name</label>
                <input
                  type="text"
                  placeholder="e.g., Netflix Subscription"
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-sm text-purple-300 mb-2 block">Recipient Address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-purple-300 mb-2 block">Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-purple-300 mb-2 block">Token</label>
                  <select className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
                    <option>USDC</option>
                    <option>DAI</option>
                    <option>ETH</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-purple-300 mb-2 block">Frequency</label>
                <select className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  Create Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

