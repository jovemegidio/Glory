import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Newspaper, MessageSquare, FileText,
  Calendar, Ticket, Image, Radio, BookOpen, StickyNote,
  Heart, DollarSign, PieChart, Bell, HeartHandshake, Download,
  UserCheck, Settings, ChevronLeft, ChevronRight, Zap, X,
  Sparkles, QrCode, HelpingHand, GraduationCap, Camera, ClipboardList,
} from 'lucide-react';
import { useChurch } from '../../contexts/ChurchContext';
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
  icon: any;
  label: string;
  path: string;
  adminOnly?: boolean;
  memberOnly?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', adminOnly: true },
  { icon: Sparkles, label: 'Devocionais', path: '/devotionals' },
  { icon: BookOpen, label: 'Bíblia', path: '/bible' },
  { icon: StickyNote, label: 'Notas', path: '/notes' },
  { icon: HeartHandshake, label: 'Oração', path: '/prayer' },
  { icon: Heart, label: 'Doações', path: '/donations' },
  { icon: GraduationCap, label: 'Cursos / EBD', path: '/courses' },
  { icon: Download, label: 'Downloads', path: '/downloads' },
  { icon: Calendar, label: 'Agenda', path: '/calendar' },
  { icon: Ticket, label: 'Eventos', path: '/events' },
  { icon: MessageSquare, label: 'Palavras', path: '/messages' },
  { icon: Users, label: 'Grupos', path: '/groups' },
  { icon: Radio, label: 'Ao Vivo', path: '/live' },
  { icon: Camera, label: 'Galeria', path: '/gallery' },
  { icon: Newspaper, label: 'Timeline', path: '/timeline' },
  { icon: FileText, label: 'Páginas', path: '/pages', adminOnly: true },
  { icon: Image, label: 'Banners', path: '/banners', adminOnly: true },
  { icon: QrCode, label: 'Check-in', path: '/attendance', adminOnly: true },
  { icon: HelpingHand, label: 'Voluntários', path: '/volunteers', adminOnly: true },
  { icon: ClipboardList, label: 'Formulários', path: '/forms', adminOnly: true },
  { icon: PieChart, label: 'Financeiro', path: '/finance', adminOnly: true },
  { icon: Bell, label: 'Notificações', path: '/notifications', adminOnly: true },
  { icon: UserCheck, label: 'Membros', path: '/members', adminOnly: true },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { church, churches, switchChurch } = useChurch();
  const { isAdmin } = useAuth();

  const filteredNav = navItems.filter((item) => {
    if (item.adminOnly && !isAdmin) return false;
    return true;
  });

  return (
    <aside className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-72'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20">
          <Zap size={22} className="text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-gray-900 font-display tracking-tight">Glory</h1>
          </div>
        )}
        {/* Mobile close button */}
        {onClose && !collapsed && (
          <button onClick={onClose} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Church Selector - No SVG inside option */}
      {!collapsed && isAdmin && (
        <div className="px-3 py-3 border-b border-gray-100">
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-1">Igreja</label>
          <select
            value={church.id}
            onChange={(e) => switchChurch(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium text-gray-700 appearance-none cursor-pointer"
          >
            {churches.map((c) => (
              <option key={c.id} value={c.id}>
                ⛪ {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 scrollbar-thin" aria-label="Menu principal">
        <div className="space-y-0.5" role="list">
          {filteredNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Collapse Button - desktop only */}
      <div className="hidden lg:block border-t border-gray-100 p-2.5 flex-shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /> <span>Recolher</span></>}
        </button>
      </div>
    </aside>
  );
}
