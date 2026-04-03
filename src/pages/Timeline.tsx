import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Image, Video, Type } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { mockTimelinePosts } from '../data/mock';

export default function Timeline() {
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'announcement', label: 'Avisos' },
    { key: 'event', label: 'Eventos' },
    { key: 'devotional', label: 'Devocionais' },
    { key: 'news', label: 'Notícias' },
    { key: 'highlight', label: 'Destaques' },
  ];

  const typeLabel = (type: string) => {
    const labels: Record<string, string> = {
      announcement: 'Aviso', event: 'Evento', devotional: 'Devocional', news: 'Notícia', highlight: 'Destaque',
    };
    return labels[type] || type;
  };

  const typeVariant = (type: string): 'warning' | 'info' | 'success' | 'gray' | 'primary' => {
    const map: Record<string, 'warning' | 'info' | 'success' | 'gray' | 'primary'> = {
      announcement: 'warning', event: 'info', devotional: 'success', news: 'gray', highlight: 'primary',
    };
    return map[type] || 'gray';
  };

  const filtered = filter === 'all' ? mockTimelinePosts : mockTimelinePosts.filter(p => p.type === filter);

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Agora mesmo';
    if (hours < 24) return `${hours}h atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Timeline</h1>
          <p className="text-gray-500 mt-1">Mantenha seus membros atualizados</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Nova Publicação
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.key
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="max-w-2xl mx-auto space-y-4">
        {filtered.map((post) => (
          <Card key={post.id}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{post.authorName.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{post.authorName}</span>
                  <Badge variant={typeVariant(post.type)}>{typeLabel(post.type)}</Badge>
                </div>
                <span className="text-xs text-gray-400">{formatDateTime(post.createdAt)}</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">{post.content}</p>

            {post.imageUrl && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img src={post.imageUrl} alt="" className="w-full h-48 object-cover" />
              </div>
            )}

            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
                <Heart size={18} /> {post.likes}
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 transition-colors">
                <MessageCircle size={18} /> {post.comments}
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 transition-colors">
                <Share2 size={18} /> Compartilhar
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Nova Publicação" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              {filters.filter(f => f.key !== 'all').map((f) => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={5} placeholder="Escreva sua publicação..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Image size={16} /> Imagem</Button>
            <Button variant="outline" size="sm"><Video size={16} /> Vídeo</Button>
            <Button variant="outline" size="sm"><Type size={16} /> Formatação</Button>
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
