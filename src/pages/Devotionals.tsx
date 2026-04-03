import React, { useState } from 'react';
import { BookOpen, Heart, Share2, Calendar, ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockDevotionals } from '../data/mock';

export default function Devotionals() {
  const [selectedId, setSelectedId] = useState<string | null>(mockDevotionals[0]?.id || null);
  const [showCreate, setShowCreate] = useState(false);
  const { isAdmin } = useAuth();

  const selected = mockDevotionals.find(d => d.id === selectedId);
  const currentIdx = mockDevotionals.findIndex(d => d.id === selectedId);

  const goTo = (dir: -1 | 1) => {
    const next = currentIdx + dir;
    if (next >= 0 && next < mockDevotionals.length) {
      setSelectedId(mockDevotionals[next].id);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Devocionais Diários</h1>
          <p className="text-gray-500 mt-1">Alimente sua alma com a Palavra de Deus todos os dias</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Novo Devocional
          </Button>
        )}
      </div>

      {/* Today's Devotional - Featured */}
      {selected && (
        <Card className="overflow-hidden" padding={false}>
          <div className="relative">
            {selected.imageUrl && (
              <div className="h-48 sm:h-64 w-full overflow-hidden">
                <img src={selected.imageUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            )}
            <div className={`${selected.imageUrl ? 'absolute bottom-0 left-0 right-0 p-6' : 'p-6 bg-gradient-to-r from-primary-600 to-primary-700'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-sm font-medium text-white/80">Devocional do Dia</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
              <p className="text-white/70 text-sm mt-1 capitalize">{formatDate(selected.date)}</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Verse */}
            <div className="bg-primary-50 border-l-4 border-primary-500 rounded-r-xl p-4">
              <p className="text-gray-800 italic leading-relaxed">"{selected.verse}"</p>
              <p className="text-primary-700 font-semibold text-sm mt-2">— {selected.verseReference}</p>
            </div>

            {/* Content */}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selected.content}</p>

            {/* Author & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{selected.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selected.author}</p>
                  <p className="text-xs text-gray-400">Autor do devocional</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Heart size={18} /> {selected.likes}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-primary-500 hover:bg-primary-50 transition-colors">
                  <Share2 size={18} /> Compartilhar
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goTo(-1)}
                disabled={currentIdx <= 0}
              >
                <ChevronLeft size={16} /> Anterior
              </Button>
              <span className="text-sm text-gray-400">{currentIdx + 1} de {mockDevotionals.length}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goTo(1)}
                disabled={currentIdx >= mockDevotionals.length - 1}
              >
                Próximo <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* All Devotionals */}
      <h2 className="text-lg font-semibold text-gray-900">Devocionais Anteriores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDevotionals.map((dev) => (
          <Card
            key={dev.id}
            hover
            padding={false}
            onClick={() => setSelectedId(dev.id)}
            className={dev.id === selectedId ? 'ring-2 ring-primary-500' : ''}
          >
            {dev.imageUrl && (
              <div className="h-32 w-full overflow-hidden rounded-t-xl">
                <img src={dev.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 capitalize">
                  {new Date(dev.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{dev.title}</h3>
              <p className="text-xs text-primary-600 font-medium">{dev.verseReference}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">{dev.author}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Heart size={12} /> {dev.likes}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Devocional" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: A Paz que Excede o Entendimento" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Versículo</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={2} placeholder="O texto do versículo..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referência</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: Filipenses 4:7" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reflexão</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={6} placeholder="O conteúdo da reflexão..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><BookOpen size={16} /> Publicar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
