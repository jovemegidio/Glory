import React, { useState } from 'react';
import { Plus, Image, Link2, Video, Eye, EyeOff, GripVertical, Edit2, Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { mockBanners } from '../data/mock';

export default function Banners() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Banners de Destaque</h1>
          <p className="text-gray-500 mt-1">Destaque conteúdos no aplicativo e site</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Novo Banner
        </Button>
      </div>

      <div className="space-y-4">
        {mockBanners.map((banner) => (
          <Card key={banner.id} padding={false}>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-80 h-44 bg-gray-100 rounded-l-xl overflow-hidden flex-shrink-0 relative">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Banner'; }}
                />
                {banner.videoUrl && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Video size={12} /> Vídeo
                  </div>
                )}
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{banner.title}</h3>
                      {banner.active ? (
                        <Badge variant="success"><Eye size={10} className="mr-1" /> Ativo</Badge>
                      ) : (
                        <Badge variant="gray"><EyeOff size={10} className="mr-1" /> Inativo</Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Ordem: #{banner.order}</p>
                      {banner.linkUrl && (
                        <p className="flex items-center gap-1"><Link2 size={14} /> Link: {banner.linkUrl}</p>
                      )}
                      <p>
                        Período: {new Date(banner.startDate).toLocaleDateString('pt-BR')} até {new Date(banner.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><GripVertical size={16} className="text-gray-400" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit2 size={16} className="text-gray-400" /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-gray-400 hover:text-red-500" /></button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Banner" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Image size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Arraste uma imagem ou clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-1">Recomendado: 1200x400px</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link (opcional)</label>
              <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo (opcional)</label>
              <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="YouTube URL" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button>Criar Banner</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
