import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import { mockFinancialSummary, mockFinancialTransactions } from '../data/mock';

export default function Finance() {
  const summary = mockFinancialSummary;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Gestão Financeira</h1>
        <p className="text-gray-500 mt-1">Toda movimentação financeira em um único lugar — {summary.period}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Receita Total" value={formatCurrency(summary.totalIncome)} icon={TrendingUp} color="green" change="+12% vs mês anterior" changeType="positive" />
        <StatCard title="Despesas" value={formatCurrency(summary.totalExpenses)} icon={TrendingDown} color="red" />
        <StatCard title="Saldo" value={formatCurrency(summary.balance)} icon={DollarSign} color="blue" />
        <StatCard title="Campanhas" value={formatCurrency(summary.campaigns)} icon={PieChart} color="purple" />
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Composição da Receita</CardTitle></CardHeader>
          <div className="space-y-4">
            {[
              { label: 'Dízimos', value: summary.tithes, color: 'bg-blue-500', pct: Math.round((summary.tithes / summary.totalIncome) * 100) },
              { label: 'Ofertas', value: summary.offerings, color: 'bg-green-500', pct: Math.round((summary.offerings / summary.totalIncome) * 100) },
              { label: 'Inscrições', value: summary.eventRegistrations, color: 'bg-purple-500', pct: Math.round((summary.eventRegistrations / summary.totalIncome) * 100) },
              { label: 'Campanhas', value: summary.campaigns, color: 'bg-orange-500', pct: Math.round((summary.campaigns / summary.totalIncome) * 100) },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                    <span className="text-xs text-gray-400">{item.pct}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Movimentações Recentes</CardTitle>
              <div className="flex gap-2">
                <Badge variant="success">Receitas</Badge>
                <Badge variant="danger">Despesas</Badge>
              </div>
            </div>
          </CardHeader>
          <div className="space-y-2">
            {mockFinancialTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                    {tx.type === 'income' ? (
                      <ArrowUpRight size={18} className="text-green-600" />
                    ) : (
                      <ArrowDownRight size={18} className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                  <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
