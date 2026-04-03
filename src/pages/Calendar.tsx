import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Plus } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockEvents } from '../data/mock';

const typeLabels: Record<string, string> = {
  worship: 'Culto', conference: 'Conferência', training: 'Treinamento',
  meeting: 'Reunião', social: 'Social', youth: 'Jovens', other: 'Outro',
};

const typeColors: Record<string, string> = {
  worship: 'bg-blue-500', conference: 'bg-purple-500', training: 'bg-green-500',
  meeting: 'bg-yellow-500', social: 'bg-pink-500', youth: 'bg-orange-500', other: 'bg-gray-500',
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockEvents.filter(e => e.startDate === dateStr);
  };

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Agenda Múltipla</h1>
          <p className="text-gray-500 mt-1">Publique e promova seus eventos</p>
        </div>
        <Button><Plus size={18} /> Novo Evento</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prev} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20} /></button>
            <h2 className="text-lg font-semibold text-gray-900">{monthNames[month]} {year}</h2>
            <button onClick={next} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20} /></button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
            ))}
            {days.map((day, i) => {
              const events = day ? getEventsForDay(day) : [];
              const isToday = day === 20 && month === 1 && year === 2026;
              return (
                <div
                  key={i}
                  className={`min-h-[48px] sm:min-h-[80px] p-1 sm:p-1.5 rounded-lg border ${
                    day ? 'border-gray-100 hover:border-gray-200' : 'border-transparent'
                  } ${isToday ? 'bg-primary-50 border-primary-200' : ''}`}
                >
                  {day && (
                    <>
                      <span className={`text-xs sm:text-sm ${isToday ? 'font-bold text-primary-700' : 'text-gray-700'}`}>{day}</span>
                      {events.map(e => (
                        <div key={e.id} className={`mt-1 ${typeColors[e.type]} text-white text-[10px] px-1.5 py-0.5 rounded truncate`}>
                          {e.title}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardTitle>Próximos Eventos</CardTitle>
          <div className="mt-4 space-y-3">
            {mockEvents.map((event) => (
              <div key={event.id} className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${typeColors[event.type]}`} />
                  <Badge variant="gray" size="sm">{typeLabels[event.type]}</Badge>
                </div>
                <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                <div className="space-y-1 mt-2">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> {new Date(event.startDate).toLocaleDateString('pt-BR')} às {event.time}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {event.location}
                  </p>
                  {event.registrationEnabled && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Users size={12} /> {event.registeredCount} inscritos
                      {event.registrationLimit && ` / ${event.registrationLimit} vagas`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
