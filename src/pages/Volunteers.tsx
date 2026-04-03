import React, { useState } from 'react';
import { Users, Plus, Search, Calendar, CheckCircle, XCircle, Clock, Star, Filter, UserPlus } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { mockVolunteers, mockVolunteerSchedules } from '../data/mock';

const ministryColors: Record<string, string> = {
  Louvor: 'from-purple-500 to-purple-600',
  Jovens: 'from-orange-500 to-orange-600',
  Diaconia: 'from-blue-500 to-blue-600',
  Infantil: 'from-pink-500 to-pink-600',
  Mídia: 'from-cyan-500 to-cyan-600',
  Intercessão: 'from-red-500 to-red-600',
};

const availabilityLabels: Record<string, string> = {
  sunday_morning: 'Dom. Manhã',
  sunday_evening: 'Dom. Noite',
  wednesday: 'Quarta',
  saturday: 'Sábado',
  flexible: 'Flexível',
};

export default function Volunteers() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'team' | 'schedule'>('team');

  const filtered = mockVolunteers.filter(v =>
    v.userName.toLowerCase().includes(search.toLowerCase()) ||
    v.ministry.toLowerCase().includes(search.toLowerCase()) ||
    v.role.toLowerCase().includes(search.toLowerCase())
  );

  const ministries = [...new Set(mockVolunteers.map(v => v.ministry))];
  const activeCount = mockVolunteers.filter(v => v.active).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Voluntários</h1>
          <p className="text-gray-500 mt-1">Gerencie equipes e escalas de voluntários</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <UserPlus size={18} /> Novo Voluntário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de Voluntários" value={mockVolunteers.length} icon={Users} color="blue" />
        <StatCard title="Ativos" value={activeCount} icon={CheckCircle} color="green" />
        <StatCard title="Ministérios" value={ministries.length} icon={Star} color="purple" />
        <StatCard title="Escalas do Mês" value={mockVolunteerSchedules.length} icon={Calendar} color="orange" />
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('team')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'team' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Users size={16} className="inline mr-1.5" /> Equipe
        </button>
        <button
          onClick={() => setView('schedule')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'schedule' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Calendar size={16} className="inline mr-1.5" /> Escalas
        </button>
      </div>

      {view === 'team' ? (
        <>
          {/* Search */}
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 max-w-md">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Buscar voluntário, ministério..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" />
          </div>

          {/* Volunteers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((vol) => (
              <Card key={vol.id} hover>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${ministryColors[vol.ministry] || 'from-gray-400 to-gray-500'} rounded-xl flex items-center justify-center`}>
                    <span className="text-white text-lg font-bold">{vol.userName.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{vol.userName}</h3>
                    <p className="text-sm text-gray-500">{vol.role}</p>
                  </div>
                  <Badge variant={vol.active ? 'success' : 'gray'}>
                    {vol.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary">{vol.ministry}</Badge>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Disponibilidade:</p>
                    <div className="flex flex-wrap gap-1">
                      {vol.availability.map((a) => (
                        <span key={a} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          {availabilityLabels[a]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Habilidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {vol.skills.map((s) => (
                        <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>Desde {new Date(vol.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Schedules View */
        <div className="space-y-4">
          {mockVolunteerSchedules.map((schedule) => (
            <Card key={schedule.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-600">{new Date(schedule.date).getDate()}</span>
                  <span className="text-[10px] text-primary-400 uppercase">{new Date(schedule.date).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{schedule.eventTitle}</h3>
                  <p className="text-sm text-gray-500">{new Date(schedule.date).toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
                </div>
              </div>

              <div className="space-y-2">
                {schedule.slots.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-xs font-bold text-gray-600">{slot.volunteerName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{slot.volunteerName}</p>
                        <p className="text-xs text-gray-500">{slot.role}</p>
                      </div>
                    </div>
                    {slot.confirmed ? (
                      <Badge variant="success"><CheckCircle size={12} className="mr-1" /> Confirmado</Badge>
                    ) : (
                      <Badge variant="warning"><Clock size={12} className="mr-1" /> Pendente</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Voluntário" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Membro</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Selecione um membro...</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ministério</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {ministries.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: Líder de Louvor" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidade</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(availabilityLabels).map(([key, label]) => (
                <button key={key} type="button" className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Habilidades</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: Violão, Teclado, Voz (separar por vírgula)" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><UserPlus size={16} /> Adicionar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
