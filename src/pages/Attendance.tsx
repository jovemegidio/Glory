import React, { useState } from 'react';
import { UserCheck, QrCode, Users, Calendar, Clock, TrendingUp, Plus, Search, CheckCircle2, BarChart3 } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import Modal from '../components/ui/Modal';
import { mockCheckIns, mockEvents } from '../data/mock';

export default function Attendance() {
  const [showCheckin, setShowCheckin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  const totalAttendees = mockCheckIns.reduce((a, c) => a + c.totalAttendees, 0);
  const avgAttendees = Math.round(totalAttendees / mockCheckIns.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Check-in / Presença</h1>
          <p className="text-gray-500 mt-1">Controle de presença via QR Code ou lista</p>
        </div>
        <Button onClick={() => setShowCheckin(true)}>
          <QrCode size={18} /> Novo Check-in
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Check-ins Realizados" value={mockCheckIns.length} icon={UserCheck} color="blue" />
        <StatCard title="Total de Presenças" value={totalAttendees.toLocaleString('pt-BR')} icon={Users} color="green" />
        <StatCard title="Média por Evento" value={avgAttendees} icon={BarChart3} color="purple" />
        <StatCard title="Maior Público" value={Math.max(...mockCheckIns.map(c => c.totalAttendees))} icon={TrendingUp} color="orange" />
      </div>

      {/* QR Code Section */}
      <Card>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 flex-shrink-0">
            <div className="text-center">
              <QrCode size={64} className="text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">QR Code do evento</p>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Check-in por QR Code</h3>
            <p className="text-sm text-gray-500">
              Gere um QR Code exclusivo para cada evento. Os membros escaneiam na entrada para registrar presença automaticamente.
            </p>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 flex-1">
                <option value="">Selecione o evento...</option>
                {mockEvents.map(e => (
                  <option key={e.id} value={e.id}>{e.title} - {new Date(e.startDate).toLocaleDateString('pt-BR')}</option>
                ))}
              </select>
              <Button>Gerar QR Code</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Check-in History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico de Presenças</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-3">
          {mockCheckIns.map((checkin) => (
            <div key={checkin.id} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{checkin.eventTitle}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar size={14} /> {new Date(checkin.date).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Users size={14} /> {checkin.totalAttendees} presentes
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="success">{checkin.totalAttendees} pessoas</Badge>
              </div>

              {/* Attendance bar */}
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((checkin.totalAttendees / 600) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{Math.round((checkin.totalAttendees / 1250) * 100)}% dos membros</span>
                </div>
              </div>

              {/* Member check-ins */}
              {checkin.members.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {checkin.members.map((m, i) => (
                    <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                      <UserCheck size={10} className="text-green-500" /> {m.userName}
                    </span>
                  ))}
                  {checkin.totalAttendees > checkin.members.length && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{checkin.totalAttendees - checkin.members.length} outros
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* New Check-in Modal */}
      <Modal isOpen={showCheckin} onClose={() => setShowCheckin(false)} title="Novo Check-in" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Evento</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Selecione o evento...</option>
              {mockEvents.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Método de Check-in</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="p-4 border-2 border-primary-300 bg-primary-50 rounded-xl text-center">
                <QrCode size={32} className="text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-primary-700">QR Code</p>
                <p className="text-xs text-primary-500 mt-1">Membros escaneiam</p>
              </button>
              <button type="button" className="p-4 border-2 border-gray-200 hover:border-gray-300 rounded-xl text-center transition-colors">
                <UserCheck size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Lista Manual</p>
                <p className="text-xs text-gray-500 mt-1">Marcar presença</p>
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCheckin(false)}>Cancelar</Button>
            <Button><UserCheck size={16} /> Iniciar Check-in</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
