import React, { useState } from 'react';
import { UserCheck, Plus, Search, MoreVertical, Phone, Mail, Calendar, MapPin, Filter } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { mockMembers } from '../data/mock';

const roleLabels: Record<string, string> = {
  admin: 'Administrador', pastor: 'Pastor', leader: 'Líder', member: 'Membro', visitor: 'Visitante',
};
const roleColors: Record<string, 'primary' | 'success' | 'warning' | 'info' | 'gray' | 'danger'> = {
  admin: 'danger', pastor: 'primary', leader: 'success', member: 'info', visitor: 'gray',
};
const statusLabels: Record<string, string> = {
  active: 'Ativo', inactive: 'Inativo', transferred: 'Transferido',
};

export default function Members() {
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = mockMembers
    .filter(m => roleFilter === 'all' || m.role === roleFilter)
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));

  const selectedMember = mockMembers.find(m => m.id === showDetail);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Gestão de Membresia</h1>
          <p className="text-gray-500 mt-1">Gerencie os membros da sua igreja de forma integrada</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Novo Membro
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total" value={mockMembers.length} icon={UserCheck} color="blue" />
        <StatCard title="Ativos" value={mockMembers.filter(m => m.status === 'active').length} icon={UserCheck} color="green" />
        <StatCard title="Líderes" value={mockMembers.filter(m => m.role === 'leader' || m.role === 'pastor').length} icon={UserCheck} color="purple" />
        <StatCard title="Visitantes" value={mockMembers.filter(m => m.role === 'visitor').length} icon={UserCheck} color="orange" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Buscar membros..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'pastor', 'leader', 'member', 'visitor'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                roleFilter === role ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {role === 'all' ? 'Todos' : roleLabels[role]}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Membro</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Função</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4 hidden md:table-cell">Telefone</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4 hidden lg:table-cell">Membro desde</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setShowDetail(member.id)}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={roleColors[member.role]}>{roleLabels[member.role]}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={member.status === 'active' ? 'success' : 'gray'}>{statusLabels[member.status]}</Badge>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell text-sm text-gray-500">{member.phone}</td>
                  <td className="py-3 px-4 hidden lg:table-cell text-sm text-gray-500">{new Date(member.memberSince).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Member Detail Modal */}
      {selectedMember && (
        <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title="Detalhes do Membro" size="lg">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{selectedMember.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={roleColors[selectedMember.role]}>{roleLabels[selectedMember.role]}</Badge>
                  <Badge variant={selectedMember.status === 'active' ? 'success' : 'gray'}>{statusLabels[selectedMember.status]}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><Mail size={16} className="text-gray-400" /><span>{selectedMember.email}</span></div>
                <div className="flex items-center gap-2 text-sm"><Phone size={16} className="text-gray-400" /><span>{selectedMember.phone}</span></div>
                <div className="flex items-center gap-2 text-sm"><Calendar size={16} className="text-gray-400" /><span>Nasc: {new Date(selectedMember.birthDate).toLocaleDateString('pt-BR')}</span></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><MapPin size={16} className="text-gray-400" /><span>{selectedMember.address}, {selectedMember.city}/{selectedMember.state}</span></div>
                <div className="flex items-center gap-2 text-sm"><Calendar size={16} className="text-gray-400" /><span>Membro desde: {new Date(selectedMember.memberSince).toLocaleDateString('pt-BR')}</span></div>
                {selectedMember.baptismDate && (
                  <div className="flex items-center gap-2 text-sm"><Calendar size={16} className="text-gray-400" /><span>Batismo: {new Date(selectedMember.baptismDate).toLocaleDateString('pt-BR')}</span></div>
                )}
              </div>
            </div>

            {selectedMember.groups.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Grupos</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.groups.map((gId) => (
                    <Badge key={gId} variant="primary">{gId}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Membro" size="xl">
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {Object.entries(roleLabels).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><UserCheck size={16} /> Cadastrar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
