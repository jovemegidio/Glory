import React, { useState } from 'react';
import { Play, Headphones, FileText, Eye, Clock, Plus, Youtube, Music, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { mockMessages } from '../data/mock';

export default function Messages() {
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const typeIcon = (type: string) => {
    if (type === 'video') return <Play size={20} className="text-white" />;
    if (type === 'audio') return <Headphones size={20} className="text-white" />;
    return <FileText size={20} className="text-white" />;
  };

  const typeBg = (type: string) => {
    if (type === 'video') return 'from-red-500 to-red-600';
    if (type === 'audio') return 'from-purple-500 to-purple-600';
    return 'from-blue-500 to-blue-600';
  };

  const filtered = filter === 'all' ? mockMessages : mockMessages.filter(m => m.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Palavras / Mensagens</h1>
          <p className="text-gray-500 mt-1">Compartilhe mensagens em texto, áudio ou vídeo</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Nova Mensagem
        </Button>
      </div>

      {/* Integration badges */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg px-3 py-2 text-sm font-medium">
          <Youtube size={18} /> YouTube Integrado
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 rounded-lg px-3 py-2 text-sm font-medium">
          <Music size={18} /> SoundCloud Integrado
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'video', 'audio', 'text'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'video' ? 'Vídeos' : f === 'audio' ? 'Áudios' : 'Textos'}
          </button>
        ))}
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((msg) => (
          <Card key={msg.id} hover padding={false}>
            <div className={`h-40 bg-gradient-to-br ${typeBg(msg.type)} flex items-center justify-center rounded-t-xl relative`}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                {typeIcon(msg.type)}
              </div>
              {msg.duration && (
                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Clock size={12} /> {msg.duration}
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={msg.type === 'video' ? 'danger' : msg.type === 'audio' ? 'primary' : 'info'}>
                  {msg.type === 'video' ? 'Vídeo' : msg.type === 'audio' ? 'Áudio' : 'Texto'}
                </Badge>
                <span className="text-xs text-gray-400">{msg.category}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{msg.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{msg.description}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">{msg.speaker}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Eye size={12} /> {msg.views}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Nova Mensagem" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
                <option value="text">Texto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pregador</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo/Áudio (YouTube ou SoundCloud)</label>
            <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={3} />
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
