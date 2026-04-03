import React, { useState } from 'react';
import { GraduationCap, BookOpen, Play, Users, Clock, Plus, Search, Award, ChevronRight, BarChart3, CheckCircle } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses, mockCourseLessons } from '../data/mock';

const categoryLabels: Record<string, string> = {
  biblical: 'Estudo Bíblico', theology: 'Teologia', leadership: 'Liderança',
  discipleship: 'Discipulado', family: 'Família', youth: 'Jovens',
};

const categoryColors: Record<string, string> = {
  biblical: 'from-blue-500 to-blue-600',
  theology: 'from-purple-500 to-purple-600',
  leadership: 'from-amber-500 to-amber-600',
  discipleship: 'from-green-500 to-green-600',
  family: 'from-pink-500 to-pink-600',
  youth: 'from-orange-500 to-orange-600',
};

const levelLabels: Record<string, string> = {
  beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado',
};

const levelVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  beginner: 'success', intermediate: 'warning', advanced: 'danger',
};

export default function Courses() {
  const { isAdmin } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [showCourse, setShowCourse] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = mockCourses
    .filter(c => categoryFilter === 'all' || c.category === categoryFilter)
    .filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
    );

  const totalEnrolled = mockCourses.reduce((a, c) => a + c.enrolledCount, 0);
  const selectedCourse = mockCourses.find(c => c.id === showCourse);
  const courseLessons = mockCourseLessons.filter(l => l.courseId === showCourse);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Cursos / EBD Online</h1>
          <p className="text-gray-500 mt-1">Plataforma de ensino bíblico e formação de líderes</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Novo Curso
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Cursos Disponíveis" value={mockCourses.length} icon={GraduationCap} color="blue" />
        <StatCard title="Alunos Matriculados" value={totalEnrolled} icon={Users} color="green" />
        <StatCard title="Aulas Publicadas" value={mockCourses.reduce((a, c) => a + c.totalLessons, 0)} icon={BookOpen} color="purple" />
        <StatCard title="Categorias" value={Object.keys(categoryLabels).length} icon={Award} color="orange" />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-gray-200 flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Buscar cursos..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Todos
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategoryFilter(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                categoryFilter === key ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => (
          <Card key={course.id} hover padding={false} onClick={() => setShowCourse(course.id)}>
            <div className={`h-36 bg-gradient-to-br ${categoryColors[course.category] || 'from-gray-400 to-gray-500'} rounded-t-xl relative overflow-hidden`}>
              {course.thumbnailUrl ? (
                <>
                  <img src={course.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap size={48} className="text-white/30" />
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant={levelVariant[course.level]}>{levelLabels[course.level]}</Badge>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                {course.totalLessons} aulas
              </div>
            </div>
            <div className="p-4">
              <Badge variant="info" size="sm">{categoryLabels[course.category]}</Badge>
              <h3 className="font-semibold text-gray-900 mt-2 mb-1">{course.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={14} /> {course.enrolledCount} alunos
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} /> {course.duration}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Por {course.instructor}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <Modal isOpen={!!showCourse} onClose={() => setShowCourse(null)} title={selectedCourse.title} size="xl">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[selectedCourse.category]} rounded-xl flex items-center justify-center`}>
                <GraduationCap size={32} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="info">{categoryLabels[selectedCourse.category]}</Badge>
                  <Badge variant={levelVariant[selectedCourse.level]}>{levelLabels[selectedCourse.level]}</Badge>
                </div>
                <p className="text-sm text-gray-500">{selectedCourse.instructor} • {selectedCourse.duration} • {selectedCourse.totalLessons} aulas</p>
              </div>
            </div>

            <p className="text-sm text-gray-700">{selectedCourse.description}</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-700">{selectedCourse.enrolledCount}</p>
                <p className="text-xs text-blue-500">Alunos</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-green-700">{selectedCourse.totalLessons}</p>
                <p className="text-xs text-green-500">Aulas</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-purple-700">{selectedCourse.duration}</p>
                <p className="text-xs text-purple-500">Duração</p>
              </div>
            </div>

            {/* Lessons */}
            {courseLessons.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Conteúdo do Curso</h4>
                <div className="space-y-2">
                  {courseLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lesson.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {lesson.completed ? (
                          <CheckCircle size={18} className="text-green-600" />
                        ) : (
                          <span className="text-sm font-bold text-gray-400">{lesson.order}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${lesson.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{lesson.title}</p>
                        <p className="text-xs text-gray-400">{lesson.type === 'video' ? '🎬 Vídeo' : lesson.type === 'audio' ? '🎧 Áudio' : '📄 Texto'} {lesson.duration ? `• ${lesson.duration}` : ''}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button className="w-full">
              <Play size={16} /> {isAdmin ? 'Editar Curso' : 'Iniciar Curso'}
            </Button>
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo Curso" size="lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Curso</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={3} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nível</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {Object.entries(levelLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: 6 semanas" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instrutor</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button><GraduationCap size={16} /> Criar Curso</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
