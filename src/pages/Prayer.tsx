import React, { useState } from 'react';
import { HeartHandshake, Plus, Heart, MessageCircle, Clock, User, EyeOff } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockPrayerRequests } from '../data/mock';

export default function Prayer() {
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const { isAdmin, user } = useAuth();
  const [prayerText, setPrayerText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'praying', label: 'Orando' },
    { key: 'answered', label: 'Respondidos' },
  ];

  const filtered = filter === 'all' ? mockPrayerRequests : mockPrayerRequests.filter(p => p.status === filter);

  const statusVariant = (status: string): 'warning' | 'info' | 'success' => {
    if (status === 'answered') return 'success';
    if (status === 'praying') return 'info';
    return 'warning';
  };

  const statusLabel = (status: string) => {
    if (status === 'answered') return '✅ Respondido';
    if (status === 'praying') return '🙏 Orando';
    return '⏳ Pendente';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Pedidos de Oração</h1>
          <p className="text-gray-500 mt-1">Receba e interceda pelos pedidos dos membros</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Novo Pedido
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.key ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
            {f.key !== 'all' && (
              <span className="ml-1 text-xs">
                ({mockPrayerRequests.filter(p => p.status === f.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((prayer) => (
          <Card key={prayer.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {prayer.isAnonymous ? (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <EyeOff size={18} className="text-gray-400" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{prayer.userName.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    {prayer.isAnonymous ? 'Anônimo' : prayer.userName}
                  </span>
                  <p className="text-xs text-gray-400">
                    {new Date(prayer.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <Badge variant={statusVariant(prayer.status)}>{statusLabel(prayer.status)}</Badge>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">{prayer.request}</p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><HeartHandshake size={14} /> {prayer.prayerCount} orações</span>
                {prayer.intercessors.length > 0 && (
                  <span className="flex items-center gap-1">
                    <User size={14} /> {prayer.intercessors.length} intercessores
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm">
                <HeartHandshake size={14} /> Orar
              </Button>
            </div>

            {prayer.intercessors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {prayer.intercessors.map((name, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{name}</span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => { setShowCreate(false); setSubmitted(false); setPrayerText(''); }} title={submitted ? 'Pedido Enviado!' : 'Novo Pedido de Oração'}>
        {!submitted ? (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (prayerText.trim()) setSubmitted(true); }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="prayer-text">Seu pedido de oração</label>
              <textarea
                id="prayer-text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={5}
                placeholder="Descreva seu pedido de oração..."
                value={prayerText}
                onChange={(e) => setPrayerText(e.target.value)}
                aria-label="Escreva seu pedido de oração"
                required
              />
              <p className="text-xs text-gray-400 mt-1">{prayerText.length}/500 caracteres</p>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Enviar como anônimo
            </label>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={() => { setShowCreate(false); setPrayerText(''); }}>Cancelar</Button>
              <Button type="submit" disabled={!prayerText.trim()}>
                <HeartHandshake size={16} aria-hidden="true" /> Enviar Pedido
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <HeartHandshake size={32} className="text-green-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Pedido enviado com sucesso!</h3>
              <p className="text-sm text-gray-500 mt-2">Nossos intercessores receberão seu pedido e orarão por você. Deus é fiel! 🙏</p>
            </div>
            <Button onClick={() => { setShowCreate(false); setSubmitted(false); setPrayerText(''); setIsAnonymous(false); }} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
