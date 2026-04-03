import React, { useState } from 'react';
import { Bell, Send, Plus, Users, Eye, Clock, CheckCheck } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import Modal from '../components/ui/Modal';
import { mockNotifications, mockGroups } from '../data/mock';

export default function Notifications() {
  const [showCreate, setShowCreate] = useState(false);

  const totalSent = mockNotifications.reduce((a, n) => a + n.totalSent, 0);
  const totalRead = mockNotifications.reduce((a, n) => a + n.readCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Push / Notificações</h1>
          <p className="text-gray-500 mt-1">Envie notificações ilimitadas para os usuários</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Send size={18} /> Enviar Notificação
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Notificações Enviadas" value={mockNotifications.length} icon={Bell} color="blue" />
        <StatCard title="Total de Envios" value={totalSent.toLocaleString('pt-BR')} icon={Send} color="purple" />
        <StatCard title="Taxa de Leitura" value={`${Math.round((totalRead / totalSent) * 100)}%`} icon={Eye} color="green" />
      </div>

      <Card>
        <CardHeader><CardTitle>Notificações Enviadas</CardTitle></CardHeader>
        <div className="space-y-3">
          {mockNotifications.map((notif) => (
            <div key={notif.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{notif.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{notif.body}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} /> {new Date(notif.sentAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Send size={12} /> {notif.totalSent} enviados
                      </span>
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCheck size={12} /> {notif.readCount} lidos ({Math.round((notif.readCount / notif.totalSent) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={notif.type === 'event' ? 'info' : notif.type === 'prayer' ? 'warning' : 'gray'}>
                  {notif.type === 'event' ? 'Evento' : notif.type === 'prayer' ? 'Oração' : 'Geral'}
                </Badge>
              </div>
              {notif.groupId && (
                <div className="mt-2 ml-13">
                  <Badge variant="primary" size="sm">
                    <Users size={10} className="mr-1" /> {mockGroups.find(g => g.id === notif.groupId)?.name}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Enviar Notificação" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Título da notificação" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={3} placeholder="Mensagem da notificação..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="general">Geral</option>
              <option value="event">Evento</option>
              <option value="prayer">Oração</option>
              <option value="donation">Doação</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Segmentar (opcional)</label>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="px-3 py-1.5 rounded-full text-xs font-medium border border-primary-300 bg-primary-50 text-primary-700">
                Todos os Membros
              </button>
              {mockGroups.map((g) => (
                <button key={g.id} type="button" className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50">
                  {g.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><Send size={16} /> Enviar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
