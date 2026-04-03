import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Calendar, Heart, HeartHandshake, Radio,
  Users, Download, StickyNote, MessageSquare, Ticket,
  Newspaper, Settings, Sparkles, GraduationCap, Camera,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockEvents, mockPrayerRequests } from '../data/mock';
import Card from '../components/ui/Card';

const quickActions = [
  { icon: BookOpen, label: 'Bíblia', path: '/bible', color: 'from-primary-500 to-primary-600', shadow: 'shadow-primary-500/20' },
  { icon: Sparkles, label: 'Devocionais', path: '/devotionals', color: 'from-orange-500 to-orange-600', shadow: 'shadow-orange-500/20' },
  { icon: Radio, label: 'Ao Vivo', path: '/live', color: 'from-red-500 to-red-600', shadow: 'shadow-red-500/20' },
  { icon: Calendar, label: 'Agenda', path: '/calendar', color: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
  { icon: Heart, label: 'Doações', path: '/donations', color: 'from-green-500 to-green-600', shadow: 'shadow-green-500/20' },
  { icon: HeartHandshake, label: 'Oração', path: '/prayer', color: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/20' },
  { icon: GraduationCap, label: 'Cursos', path: '/courses', color: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/20' },
  { icon: MessageSquare, label: 'Palavras', path: '/messages', color: 'from-amber-500 to-amber-600', shadow: 'shadow-amber-500/20' },
  { icon: Users, label: 'Grupos', path: '/groups', color: 'from-cyan-500 to-cyan-600', shadow: 'shadow-cyan-500/20' },
  { icon: StickyNote, label: 'Notas', path: '/notes', color: 'from-yellow-500 to-yellow-600', shadow: 'shadow-yellow-500/20' },
  { icon: Ticket, label: 'Eventos', path: '/events', color: 'from-pink-500 to-pink-600', shadow: 'shadow-pink-500/20' },
  { icon: Camera, label: 'Galeria', path: '/gallery', color: 'from-violet-500 to-violet-600', shadow: 'shadow-violet-500/20' },
  { icon: Newspaper, label: 'Timeline', path: '/timeline', color: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-500/20' },
  { icon: Download, label: 'Downloads', path: '/downloads', color: 'from-teal-500 to-teal-600', shadow: 'shadow-teal-500/20' },
  { icon: Settings, label: 'Config.', path: '/settings', color: 'from-gray-500 to-gray-600', shadow: 'shadow-gray-500/20' },
];

export default function MemberHome() {
  const { user } = useAuth();
  const upcomingEvents = mockEvents.slice(0, 3);
  const recentPrayers = mockPrayerRequests.filter(p => p.status === 'praying').slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <p className="text-primary-100 text-sm font-medium">{getGreeting()} 👋</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 font-display">{user?.name?.split(' ')[0]}</h1>
          <p className="text-primary-100/80 mt-2 text-sm sm:text-base">
            Que a paz de Deus esteja com você hoje!
          </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group hover:scale-[1.03]"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg ${action.shadow} group-hover:scale-110 transition-transform`}>
                <action.icon size={22} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-primary-500" />
              Próximos Eventos
            </h3>
            <Link to="/events" className="text-sm text-primary-600 hover:underline font-medium">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-600">{new Date(event.startDate).toLocaleDateString('pt-BR', { day: '2-digit' })}</span>
                  <span className="text-[10px] text-primary-400 uppercase font-semibold">{new Date(event.startDate).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-sm truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{event.time} • {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Prayer Requests */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <HeartHandshake size={18} className="text-purple-500" />
              Pedidos de Oração
            </h3>
            <Link to="/prayer" className="text-sm text-primary-600 hover:underline font-medium">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {recentPrayers.map((prayer) => (
              <div key={prayer.id} className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700 line-clamp-2">{prayer.request}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {prayer.isAnonymous ? 'Anônimo' : prayer.userName}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-purple-600 font-medium">
                    <HeartHandshake size={12} /> {prayer.prayerCount} orações
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
