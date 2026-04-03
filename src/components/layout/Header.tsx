import React, { useState } from 'react';
import { Bell, Search, Menu, LogOut, User, ChevronDown, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useChurch } from '../../contexts/ChurchContext';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout, isAdmin } = useAuth();
  const { church } = useChurch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    pastor: 'Pastor',
    leader: 'Líder',
    member: 'Membro',
    visitor: 'Visitante',
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button onClick={onMenuToggle} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <Menu size={22} className="text-gray-700" />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-gray-50/80 rounded-xl px-4 py-2.5 flex-1 max-w-lg border border-gray-200/80 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar membros, grupos, eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right: Church + Notifications + User */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Church name */}
        <span className="hidden md:inline text-sm text-gray-500 font-medium mr-1">⛪ {church.name}</span>

        {/* Notifications */}
        <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${isAdmin ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-primary-500 to-primary-700'}`}>
              <span className="text-white text-sm font-bold">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400 leading-tight">{roleLabels[user?.role || 'member']}</p>
            </div>
            <ChevronDown size={16} className="hidden md:block text-gray-400" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${isAdmin ? 'bg-amber-50 text-amber-700' : 'bg-primary-50 text-primary-700'}`}>
                      {isAdmin ? <Shield size={10} /> : <User size={10} />}
                      {roleLabels[user?.role || 'member']}
                    </span>
                  </div>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} /> Meu Perfil
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
