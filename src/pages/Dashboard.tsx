import React from 'react';
import {
  Users, Calendar, Heart, DollarSign, Bell, HeartHandshake,
  Radio, UserPlus, TrendingUp, ArrowUpRight, Clock,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockDashboardStats, mockTimelinePosts, mockEvents, mockPrayerRequests, mockDonations } from '../data/mock';

export default function Dashboard() {
  const stats = mockDashboardStats;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral da sua igreja</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de Membros" value={stats.totalMembers.toLocaleString('pt-BR')} icon={Users} change="+18 este mês" changeType="positive" color="blue" />
        <StatCard title="Grupos Ativos" value={stats.activeGroups} icon={Users} change="3 novos" changeType="positive" color="purple" />
        <StatCard title="Próximos Eventos" value={stats.upcomingEvents} icon={Calendar} color="orange" />
        <StatCard title="Doações do Mês" value={formatCurrency(stats.monthlyDonations)} icon={DollarSign} change="+12% vs mês anterior" changeType="positive" color="green" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pedidos de Oração" value={stats.prayerRequests} icon={HeartHandshake} color="red" />
        <StatCard title="Novos Membros" value={stats.newMembers} icon={UserPlus} change="Este mês" color="green" />
        <StatCard title="Ao Vivo - Viewers" value={stats.liveViewers} icon={Radio} color="purple" />
        <StatCard title="Push Enviados" value={stats.pushSent} icon={Bell} change="Esta semana" color="yellow" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Timeline Recente</CardTitle>
              <a href="/timeline" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                Ver tudo <ArrowUpRight size={14} />
              </a>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {mockTimelinePosts.slice(0, 4).map((post) => (
              <div key={post.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">{post.authorName.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{post.authorName}</span>
                    <Badge variant={post.type === 'announcement' ? 'warning' : post.type === 'event' ? 'info' : post.type === 'devotional' ? 'success' : 'gray'}>
                      {post.type === 'announcement' ? 'Aviso' : post.type === 'event' ? 'Evento' : post.type === 'devotional' ? 'Devocional' : post.type === 'news' ? 'Notícia' : 'Destaque'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Heart size={12} /> {post.likes}</span>
                    <span>{formatDate(post.createdAt)} às {formatTime(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Próximos Eventos</CardTitle>
              <a href="/calendar" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                Ver agenda <ArrowUpRight size={14} />
              </a>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {mockEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center bg-primary-50 rounded-lg px-3 py-2 min-w-[52px]">
                  <span className="text-xs font-medium text-primary-600">
                    {new Date(event.startDate).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
                  </span>
                  <span className="text-lg font-bold text-primary-700">
                    {new Date(event.startDate).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Clock size={12} /> {event.time} • {event.location}
                  </p>
                  {event.registrationEnabled && (
                    <div className="mt-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-primary-500 h-1.5 rounded-full"
                            style={{ width: `${event.registrationLimit ? (event.registeredCount / event.registrationLimit) * 100 : 50}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {event.registeredCount}{event.registrationLimit ? `/${event.registrationLimit}` : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prayer Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pedidos de Oração Recentes</CardTitle>
              <a href="/prayer" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                Ver todos <ArrowUpRight size={14} />
              </a>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {mockPrayerRequests.slice(0, 3).map((prayer) => (
              <div key={prayer.id} className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {prayer.isAnonymous ? 'Anônimo' : prayer.userName}
                  </span>
                  <Badge variant={prayer.status === 'answered' ? 'success' : prayer.status === 'praying' ? 'info' : 'warning'}>
                    {prayer.status === 'answered' ? 'Respondido' : prayer.status === 'praying' ? 'Orando' : 'Pendente'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{prayer.request}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <HeartHandshake size={12} /> {prayer.prayerCount} orações
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Doações Recentes</CardTitle>
              <a href="/donations" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                Ver todas <ArrowUpRight size={14} />
              </a>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {mockDonations.slice(0, 5).map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                    <TrendingUp size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{donation.userName}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {donation.type === 'tithe' ? 'Dízimo' : donation.type === 'offering' ? 'Oferta' : donation.type === 'campaign' ? 'Campanha' : donation.type === 'event' ? 'Evento' : 'Outro'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{formatCurrency(donation.amount)}</p>
                  <p className="text-xs text-gray-400">{formatDate(donation.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
