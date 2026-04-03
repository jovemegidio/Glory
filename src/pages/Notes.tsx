import React, { useState } from 'react';
import { Plus, StickyNote, Edit2, Trash2, Cloud, CloudOff, Search, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { mockNotes } from '../data/mock';

const categoryLabels: Record<string, string> = {
  worship: 'Culto', training: 'Treinamento', discipleship: 'Discipulado', personal: 'Pessoal', other: 'Outro',
};
const categoryColors: Record<string, 'primary' | 'success' | 'warning' | 'info' | 'gray'> = {
  worship: 'primary', training: 'success', discipleship: 'info', personal: 'warning', other: 'gray',
};

export default function Notes() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const filtered = mockNotes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Bloco de Notas</h1>
          <p className="text-gray-500 mt-1">Anotações salvas no app e na nuvem</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Nova Nota
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input type="text" placeholder="Buscar notas..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note) => (
          <Card key={note.id} hover onClick={() => setSelectedNote(note.id)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <StickyNote size={18} className="text-primary-500" />
                <Badge variant={categoryColors[note.category]}>{categoryLabels[note.category]}</Badge>
              </div>
              <div className="flex items-center gap-1">
                {note.synced ? (
                  <Cloud size={14} className="text-green-500" />
                ) : (
                  <CloudOff size={14} className="text-yellow-500" />
                )}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{note.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-3 whitespace-pre-line">{note.content}</p>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
              <Calendar size={12} />
              <span>{new Date(note.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Nova Nota" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: Culto 20/02 - Tema da Mensagem" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              {Object.entries(categoryLabels).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={10} placeholder="Escreva suas anotações aqui..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><Cloud size={16} /> Salvar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
