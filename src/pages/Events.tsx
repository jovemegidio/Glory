import React, { useState } from 'react';
import { Ticket, Users, DollarSign, MapPin, Clock, Plus, ExternalLink, Share2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockEvents } from '../data/mock';

export default function Events() {
  const [showCreate, setShowCreate] = useState(false);
  const { isAdmin } = useAuth();
  const eventsWithRegistration = mockEvents.filter(e => e.registrationEnabled);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Inscrições / Eventos</h1>
          <p className="text-gray-500 mt-1">Gerencie inscrições e pagamentos de eventos</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Novo Evento
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-xl"><Ticket size={24} className="text-blue-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Eventos Abertos</p>
              <p className="text-2xl font-bold text-gray-900">{eventsWithRegistration.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-xl"><Users size={24} className="text-green-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total Inscritos</p>
              <p className="text-2xl font-bold text-gray-900">{eventsWithRegistration.reduce((a, e) => a + e.registeredCount, 0)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-xl"><DollarSign size={24} className="text-purple-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Receita Eventos</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(eventsWithRegistration.reduce((a, e) => a + (e.price || 0) * e.registeredCount, 0))}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {eventsWithRegistration.map((event) => (
          <Card key={event.id}>
            <div className="flex flex-col md:flex-row gap-4">
              {event.imageUrl && (
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  </div>
                  {event.price && (
                    <span className="text-lg font-bold text-green-600">{formatCurrency(event.price)}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock size={14} /> {new Date(event.startDate).toLocaleDateString('pt-BR')} às {event.time}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> {event.location}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-2 w-32">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{ width: `${event.registrationLimit ? (event.registeredCount / event.registrationLimit) * 100 : 50}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {event.registeredCount}{event.registrationLimit ? `/${event.registrationLimit}` : ''} inscritos
                    </span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm"><Share2 size={14} /> Compartilhar</Button>
                    {isAdmin ? (
                      <Button size="sm"><ExternalLink size={14} /> Gerenciar</Button>
                    ) : (
                      <Button size="sm"><Ticket size={14} /> Inscrever-se</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Evento com Inscrição" size="xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Evento</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={3} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
              <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Limite de Vagas</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
              <input type="number" step="0.01" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button>Criar Evento</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
