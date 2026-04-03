import React, { useState } from 'react';
import { Plus, Users as UsersIcon, Search, MoreVertical, UserPlus, Lock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockGroups } from '../data/mock';

const typeLabels: Record<string, string> = {
  cell: 'Célula', ministry: 'Ministério', department: 'Departamento',
  youth: 'Jovens', children: 'Crianças', worship: 'Louvor', other: 'Outro',
};

const typeColors: Record<string, 'primary' | 'success' | 'warning' | 'info' | 'gray' | 'danger'> = {
  cell: 'primary', ministry: 'success', department: 'info',
  youth: 'warning', children: 'danger', worship: 'primary', other: 'gray',
};

export default function Groups() {
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const { isAdmin, user } = useAuth();

  // Members see only their groups; admin sees all
  const myGroups = !isAdmin && user
    ? mockGroups.filter(g => user.groups.includes(g.id))
    : mockGroups;

  const filtered = myGroups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Grupos</h1>
          <p className="text-gray-500 mt-1">
            {isAdmin ? 'Gerencie os grupos e segmente conteúdos' : 'Visualize os grupos que você participa'}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Novo Grupo
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 max-w-md">
        <Search size={18} className="text-gray-400" aria-hidden="true" />
        <input
          type="text"
          placeholder="Buscar grupos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-sm flex-1"
          aria-label="Buscar grupos"
        />
      </div>

      {/* Member info */}
      {!isAdmin && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700 flex items-center gap-2" role="note">
          <Lock size={16} className="flex-shrink-0" aria-hidden="true" />
          <span>Você pode visualizar os grupos dos quais é membro. Para participar de outros grupos, entre em contato com a liderança.</span>
        </div>
      )}

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((group) => (
          <Card key={group.id} hover>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                  <UsersIcon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  <Badge variant={typeColors[group.type]}>{typeLabels[group.type]}</Badge>
                </div>
              </div>
              {isAdmin && (
                <button className="p-1 hover:bg-gray-100 rounded-lg" aria-label="Opções do grupo">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-3">{group.description}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <UsersIcon size={16} />
                <span>{group.memberCount} membros</span>
              </div>
              <div className="text-sm text-gray-500">
                Líder: <span className="font-medium text-gray-700">{group.leaderName}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Grupo" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Grupo</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: Jovens em Cristo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={3} placeholder="Descreva o grupo..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {Object.entries(typeLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Líder</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Nome do líder" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><UserPlus size={16} /> Criar Grupo</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
