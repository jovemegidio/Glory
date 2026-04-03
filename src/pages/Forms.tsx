import React, { useState } from 'react';
import { ClipboardList, Plus, BarChart3, Users, CheckCircle, XCircle, Star, MessageSquare, FileText, Search } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockForms } from '../data/mock';

const typeLabels: Record<string, string> = {
  survey: 'Pesquisa', registration: 'Cadastro', feedback: 'Avaliação', testimony: 'Testemunho',
};

const typeIcons: Record<string, React.ReactNode> = {
  survey: <BarChart3 size={20} className="text-blue-600" />,
  registration: <ClipboardList size={20} className="text-green-600" />,
  feedback: <Star size={20} className="text-amber-600" />,
  testimony: <MessageSquare size={20} className="text-purple-600" />,
};

const typeColors: Record<string, string> = {
  survey: 'bg-blue-50', registration: 'bg-green-50', feedback: 'bg-amber-50', testimony: 'bg-purple-50',
};

const statusLabels: Record<string, string> = {
  active: 'Ativo', closed: 'Encerrado', draft: 'Rascunho',
};

const statusVariant: Record<string, 'success' | 'gray' | 'warning'> = {
  active: 'success', closed: 'gray', draft: 'warning',
};

export default function Forms() {
  const { isAdmin } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [showForm, setShowForm] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = mockForms.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalResponses = mockForms.reduce((a, f) => a + f.responseCount, 0);
  const activeCount = mockForms.filter(f => f.status === 'active').length;
  const selectedForm = mockForms.find(f => f.id === showForm);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Formulários / Pesquisas</h1>
          <p className="text-gray-500 mt-1">Crie formulários, pesquisas e receba testemunhos</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Novo Formulário
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Formulários" value={mockForms.length} icon={ClipboardList} color="blue" />
        <StatCard title="Ativos" value={activeCount} icon={CheckCircle} color="green" />
        <StatCard title="Total Respostas" value={totalResponses} icon={Users} color="purple" />
        <StatCard title="Taxa Média" value={`${Math.round(totalResponses / mockForms.length)} resp/form`} icon={BarChart3} color="orange" />
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input type="text" placeholder="Buscar formulários..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" />
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((form) => (
          <Card key={form.id} hover onClick={() => setShowForm(form.id)}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${typeColors[form.type]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {typeIcons[form.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{form.title}</h3>
                  <Badge variant={statusVariant[form.status]}>{statusLabels[form.status]}</Badge>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{form.description}</p>

                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="info" size="sm">{typeLabels[form.type]}</Badge>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Users size={12} /> {form.responseCount} respostas
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FileText size={12} /> {form.fields.length} campos
                  </span>
                </div>

                {form.closesAt && (
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(form.closesAt) > new Date()
                      ? `Encerra em ${new Date(form.closesAt).toLocaleDateString('pt-BR')}`
                      : `Encerrado em ${new Date(form.closesAt).toLocaleDateString('pt-BR')}`
                    }
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Form Detail/Preview Modal */}
      {selectedForm && (
        <Modal isOpen={!!showForm} onClose={() => setShowForm(null)} title={selectedForm.title} size="lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${typeColors[selectedForm.type]} rounded-lg flex items-center justify-center`}>
                {typeIcons[selectedForm.type]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="info">{typeLabels[selectedForm.type]}</Badge>
                  <Badge variant={statusVariant[selectedForm.status]}>{statusLabels[selectedForm.status]}</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">{selectedForm.responseCount} respostas recebidas</p>
              </div>
            </div>

            <p className="text-sm text-gray-700">{selectedForm.description}</p>

            {/* Form Preview */}
            <div className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pré-visualização do formulário</p>
              {selectedForm.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'text' && (
                    <input type="text" disabled className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" />
                  )}
                  {field.type === 'textarea' && (
                    <textarea disabled className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" rows={3} />
                  )}
                  {field.type === 'select' && field.options && (
                    <select disabled className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                      <option>Selecione...</option>
                      {field.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  )}
                  {field.type === 'radio' && field.options && (
                    <div className="space-y-2">
                      {field.options.map(o => (
                        <label key={o} className="flex items-center gap-2 text-sm text-gray-600">
                          <input type="radio" disabled name={field.id} className="text-primary-600" />
                          {o}
                        </label>
                      ))}
                    </div>
                  )}
                  {field.type === 'rating' && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} size={24} className="text-gray-200" />
                      ))}
                    </div>
                  )}
                  {field.type === 'date' && (
                    <input type="date" disabled className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" />
                  )}
                  {field.type === 'checkbox' && field.options && (
                    <div className="space-y-2">
                      {field.options.map(o => (
                        <label key={o} className="flex items-center gap-2 text-sm text-gray-600">
                          <input type="checkbox" disabled className="rounded text-primary-600" />
                          {o}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedForm.status === 'active' && !isAdmin && (
              <Button className="w-full">Responder Formulário</Button>
            )}
            {isAdmin && (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <BarChart3 size={16} /> Ver Respostas ({selectedForm.responseCount})
                </Button>
                <Button className="flex-1">
                  <FileText size={16} /> Editar
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Formulário" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Encerramento</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Campos do Formulário</p>
            <p className="text-xs text-gray-400">Use o editor de formulários para adicionar campos personalizados após criar o formulário.</p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><ClipboardList size={16} /> Criar Formulário</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
