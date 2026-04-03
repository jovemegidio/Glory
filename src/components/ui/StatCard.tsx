import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
}

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'ring-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', ring: 'ring-green-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', ring: 'ring-purple-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', ring: 'ring-orange-100' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', ring: 'ring-red-100' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', ring: 'ring-yellow-100' },
};

export default function StatCard({ title, value, icon: Icon, change, changeType = 'positive', color = 'blue' }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-500'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`${colors.bg} p-3 rounded-xl ring-1 ${colors.ring}`}>
          <Icon size={24} className={colors.icon} />
        </div>
      </div>
    </div>
  );
}
