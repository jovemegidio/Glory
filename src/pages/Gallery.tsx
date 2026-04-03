import React, { useState } from 'react';
import { Camera, Image, Plus, Calendar, Eye, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockPhotoAlbums } from '../data/mock';

export default function Gallery() {
  const { isAdmin } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = mockPhotoAlbums.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase())
  );

  const album = mockPhotoAlbums.find(a => a.id === selectedAlbum);

  // Generate sample gallery photos from album cover with variations
  const samplePhotos = album ? Array.from({ length: Math.min(album.photoCount, 8) }, (_, i) => ({
    id: `photo-${i}`,
    url: album.coverUrl.replace('w=600', `w=400&q=${60 + i * 5}`),
    caption: i === 0 ? 'Momento especial durante o evento' : undefined,
  })) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Galeria de Fotos</h1>
          <p className="text-gray-500 mt-1">Registre e compartilhe os momentos da igreja</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Novo Álbum
          </Button>
        )}
      </div>

      {/* Stats Bar */}
      <div className="flex gap-4 sm:gap-6 bg-white rounded-xl border border-gray-200 px-4 sm:px-6 py-4 overflow-x-auto">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{mockPhotoAlbums.length}</p>
          <p className="text-xs text-gray-500">Álbuns</p>
        </div>
        <div className="w-px bg-gray-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{mockPhotoAlbums.reduce((a, p) => a + p.photoCount, 0)}</p>
          <p className="text-xs text-gray-500">Fotos</p>
        </div>
        <div className="w-px bg-gray-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{mockPhotoAlbums.filter(a => a.eventId).length}</p>
          <p className="text-xs text-gray-500">Eventos</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input type="text" placeholder="Buscar álbuns..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" />
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((alb) => (
          <Card key={alb.id} hover padding={false} onClick={() => setSelectedAlbum(alb.id)}>
            <div className="relative h-48 overflow-hidden rounded-t-xl group">
              <img
                src={alb.coverUrl}
                alt={alb.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold">{alb.title}</h3>
                <p className="text-white/70 text-sm mt-0.5">{alb.description}</p>
              </div>
              <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Camera size={12} /> {alb.photoCount}
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={12} /> {new Date(alb.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              {alb.eventId && <Badge variant="info" size="sm">Evento</Badge>}
            </div>
          </Card>
        ))}
      </div>

      {/* Album Detail Modal */}
      {album && (
        <Modal isOpen={!!selectedAlbum} onClose={() => setSelectedAlbum(null)} title={album.title} size="xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{album.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(album.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })} • {album.photoCount} fotos
                </p>
              </div>
              {isAdmin && (
                <Button variant="outline" size="sm">
                  <Plus size={14} /> Adicionar Fotos
                </Button>
              )}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {samplePhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`relative overflow-hidden rounded-lg cursor-pointer group ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || ''}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${i === 0 ? 'h-40 sm:h-64' : 'h-32'}`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>

            {album.photoCount > 8 && (
              <p className="text-center text-sm text-gray-400">
                Mostrando 8 de {album.photoCount} fotos
              </p>
            )}
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Álbum" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Álbum</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: Culto de Adoração - Março 2026" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={2} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evento (opcional)</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Nenhum</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fotos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Image size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Arraste as fotos ou clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP (máx 10MB cada)</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><Camera size={16} /> Criar Álbum</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
