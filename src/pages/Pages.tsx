import React, { useState } from 'react';
import { Plus, FileText, Eye, Edit2, Trash2, Globe, EyeOff } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { mockPages } from '../data/mock';

const typeLabels: Record<string, string> = {
  institutional: 'Institucional', ministry: 'Ministério', team: 'Equipe', custom: 'Personalizada',
};

export default function Pages() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Páginas Multiuso</h1>
          <p className="text-gray-500 mt-1">Crie páginas personalizadas para seu app e site</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Nova Página
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPages.map((page) => (
          <Card key={page.id} hover>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit2 size={14} className="text-gray-400" /></button>
                <button className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-gray-400 hover:text-red-500" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{page.title}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="info">{typeLabels[page.type]}</Badge>
              {page.published ? (
                <Badge variant="success"><Globe size={10} className="mr-1" /> Publicada</Badge>
              ) : (
                <Badge variant="gray"><EyeOff size={10} className="mr-1" /> Rascunho</Badge>
              )}
            </div>
            <p className="text-xs text-gray-400">
              Slug: /{page.slug}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Atualizada em {new Date(page.updatedAt).toLocaleDateString('pt-BR')}
            </p>
          </Card>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Nova Página" size="xl">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {Object.entries(typeLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono" rows={12} placeholder="Escreva o conteúdo da página (aceita HTML)..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button variant="secondary">Salvar Rascunho</Button>
            <Button>Publicar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
