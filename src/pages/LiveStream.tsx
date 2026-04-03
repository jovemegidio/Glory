import React, { useState } from 'react';
import { Radio, Play, Users, Eye, Settings, MonitorPlay, Wifi, WifiOff } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockLiveStreams, mockGroups } from '../data/mock';

export default function LiveStream() {
  const [streamUrl, setStreamUrl] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Ao Vivo</h1>
          <p className="text-gray-500 mt-1">Transmita cultos, eventos e treinamentos em tempo real</p>
        </div>
        <Button variant={isStreaming ? 'danger' : 'primary'} onClick={() => setIsStreaming(!isStreaming)}>
          {isStreaming ? <><WifiOff size={18} /> Encerrar Transmissão</> : <><Radio size={18} /> Iniciar Ao Vivo</>}
        </Button>
      </div>

      {/* Live Status */}
      <Card className={isStreaming ? 'ring-2 ring-red-500 border-red-200' : ''}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-96 h-40 sm:h-56 bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
            {isStreaming ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <MonitorPlay size={48} className="text-white/50" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 animate-pulse">
                    <Wifi size={12} /> AO VIVO
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                  <Eye size={12} /> 342 assistindo
                </div>
              </>
            ) : (
              <div className="text-center">
                <Play size={48} className="text-white/30 mx-auto mb-2" />
                <p className="text-white/50 text-sm">Nenhuma transmissão ativa</p>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título da Transmissão</label>
              <input
                type="text"
                defaultValue="Culto Dominical - Ao Vivo"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL do Stream (YouTube Live, etc)</label>
              <input
                type="url"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://youtube.com/live/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segmentar para Grupos (opcional)</label>
              <div className="flex flex-wrap gap-2">
                {mockGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroups(prev =>
                      prev.includes(group.id) ? prev.filter(g => g !== group.id) : [...prev, group.id]
                    )}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedGroups.includes(group.id)
                        ? 'bg-primary-50 border-primary-300 text-primary-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Radio size={24} className="text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">42</p>
            <p className="text-sm text-gray-500">Transmissões Realizadas</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Eye size={24} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12.450</p>
            <p className="text-sm text-gray-500">Visualizações Totais</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">342</p>
            <p className="text-sm text-gray-500">Média de Espectadores</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
