import React, { useState } from 'react';
import { METRIC_CARDS, TRANSACTIONS } from '../data/mockData';
import { Download, Search, TrendingUp, TrendingDown, RefreshCw, Plus, Check } from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Completed' | 'Processing' | 'Pending'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNewTxModal, setShowNewTxModal] = useState(false);
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [newCustomer, setNewCustomer] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer || !newAmount) return;

    const newTx = {
      id: `TXN-${Math.floor(9022 + Math.random() * 1000)}`,
      customer: newCustomer,
      email: newEmail || `${newCustomer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      amount: `$${parseFloat(newAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: 'Completed' as const,
      date: 'Just now',
      method: 'Credit Card',
    };

    setTransactions([newTx, ...transactions]);
    setNewCustomer('');
    setNewAmount('');
    setNewEmail('');
    setShowNewTxModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Customer,Email,Amount,Status,Date,Method\n';
    const rows = filteredTransactions
      .map((t) => `"${t.id}","${t.customer}","${t.email}","${t.amount}","${t.status}","${t.date}","${t.method}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Operations & Revenue Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Consolidated fiscal telemetry, recurring settlement volumes, and member accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Functional Segmented Controls */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  timeRange === r
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            title="Refresh Metrics"
            className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-slate-900' : ''}`} />
          </button>

          <button
            onClick={() => setShowNewTxModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_CARDS.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
          >
            <div className="text-xs font-medium text-slate-500">{card.label}</div>
            <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {card.value}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span
                className={`flex items-center gap-1 font-medium ${
                  card.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {card.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {card.change}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{card.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Graph Area */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 gap-2 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Capital Flow Trajectory</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Gross Settlements</span>
              <span aria-hidden="true">·</span>
              <span>USD Currency</span>
              <span aria-hidden="true">·</span>
              <span>Updated Real-Time</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Period Total</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900">$148,920.40</div>
          </div>
        </div>

        {/* SVG Sparkline / Bar Visualization */}
        <div className="mt-6 h-56 flex items-end gap-2 pt-6">
          {[
            { day: '01', val: 42, rev: '$4,200' },
            { day: '04', val: 58, rev: '$5,800' },
            { day: '07', val: 51, rev: '$5,100' },
            { day: '10', val: 69, rev: '$6,900' },
            { day: '13', val: 78, rev: '$7,800' },
            { day: '16', val: 64, rev: '$6,400' },
            { day: '19', val: 86, rev: '$8,600' },
            { day: '22', val: 94, rev: '$9,400' },
            { day: '25', val: 82, rev: '$8,200' },
            { day: '28', val: 104, rev: '$10,400' },
            { day: '30', val: 118, rev: '$11,800' },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div
                className="w-full bg-slate-200 group-hover:bg-slate-900 rounded-t-sm transition-all duration-200 relative"
                style={{ height: `${(bar.val / 120) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-mono px-2 py-0.5 rounded shadow-sm pointer-events-none whitespace-nowrap z-10 transition-opacity">
                  {bar.rev}
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-500 group-hover:text-slate-900">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Ledger of Recent Settlements</h2>
            <div className="text-xs text-slate-500 mt-1">
              <span>{filteredTransactions.length} records found</span>
              <span className="mx-1.5">·</span>
              <span>Direct Bank & Merchant Gateways</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-52 focus:outline-none focus:border-slate-400 bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
              {(['all', 'Completed', 'Processing', 'Pending'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-medium">
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Customer & Account</th>
                <th className="py-3 px-6">Settlement Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6 text-right">Gateway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No transactions match your current query or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-slate-700 font-medium">
                      {tx.id}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="font-medium text-slate-900">{tx.customer}</div>
                      <div className="text-[11px] text-slate-500">{tx.email}</div>
                    </td>
                    <td className="py-3.5 px-6 font-mono font-semibold text-slate-900 tabular-nums">
                      {tx.amount}
                    </td>
                    <td className="py-3.5 px-6">
                      {/* Zero-Pill Discipline: Clean unboxed text with status indicator */}
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            tx.status === 'Completed'
                              ? 'bg-emerald-600'
                              : tx.status === 'Processing'
                              ? 'bg-amber-600'
                              : 'bg-slate-400'
                          }`}
                        />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500 tabular-nums font-mono text-[11px]">
                      {tx.date}
                    </td>
                    <td className="py-3.5 px-6 text-right text-slate-600">
                      {tx.method}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Invoice Modal */}
      {showNewTxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create Direct Settlement Invoice</h3>
              <button
                onClick={() => setShowNewTxModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Henrik Larsson"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Customer Email</label>
                <input
                  type="email"
                  placeholder="e.g. henrik@designworks.se"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Invoice Amount ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="850.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-slate-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewTxModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
                >
                  Confirm & Post Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
