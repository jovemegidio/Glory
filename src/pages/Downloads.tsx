import React, { useState } from 'react';
import { Download, FileText, Book, BookOpen, FileQuestion, Plus, Search, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockDownloads, mockGroups } from '../data/mock';

const typeIcons: Record<string, React.ReactNode> = {
  ebook: <Book size={20} className="text-blue-600" />,
  study: <BookOpen size={20} className="text-green-600" />,
  article: <FileText size={20} className="text-purple-600" />,
  manual: <FileQuestion size={20} className="text-orange-600" />,
  other: <FileText size={20} className="text-gray-600" />,
};

const typeLabels: Record<string, string> = {
  ebook: 'E-book', study: 'Estudo', article: 'Artigo', manual: 'Manual', other: 'Outro',
};

export default function Downloads() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const { isAdmin } = useAuth();

  const filtered = mockDownloads.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">E-books / Downloads</h1>
          <p className="text-gray-500 mt-1">Compartilhe arquivos, estudos e materiais</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Novo Arquivo
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input type="text" placeholder="Buscar arquivos..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} hover>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {typeIcons[item.type]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info">{typeLabels[item.type]}</Badge>
                  <span className="text-xs text-gray-400 uppercase">{item.format}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>

            {item.groupId && (
              <div className="mb-3">
                <Badge variant="primary" size="sm">
                  <Users size={10} className="mr-1" /> {mockGroups.find(g => g.id === item.groupId)?.name}
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400">
                <span>{item.fileSize}</span>
                <span className="mx-2">•</span>
                <span>{item.downloadCount} downloads</span>
              </div>
              <Button variant="outline" size="sm">
                <Download size={14} /> Baixar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Arquivo" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {Object.entries(typeLabels).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grupo (opcional)</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todos</option>
                {mockGroups.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arquivo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Download size={28} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Arraste ou clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-1">PDF, EPUB, DOCX, MP3, MP4 (máx 50MB)</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button>Publicar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
