import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, User, AlertCircle, ArrowRight, ArrowLeft, Sparkles, BookOpen, Heart, Users, Radio } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type LoginMode = 'select' | 'admin' | 'member';

// Animated floating particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: `rgba(255,255,255,${Math.random() * 0.5 + 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

// App features showcase
const features = [
  { icon: BookOpen, label: 'Bíblia Offline', desc: 'Leia a Palavra a qualquer momento' },
  { icon: Heart, label: 'Doações PIX', desc: 'Contribua de forma rápida e segura' },
  { icon: Users, label: 'Comunidade', desc: 'Conecte-se com sua igreja' },
  { icon: Radio, label: 'Ao Vivo', desc: 'Assista cultos em tempo real' },
];

export default function Login() {
  const { login } = useAuth();
  const [mode, setMode] = useState<LoginMode>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [animateIn, setAnimateIn] = useState(true);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (!success) {
        setError('E-mail ou senha incorretos. Tente novamente.');
      }
      setLoading(false);
    }, 800);
  };

  const switchMode = (newMode: LoginMode) => {
    setAnimateIn(false);
    setTimeout(() => {
      setMode(newMode);
      setEmail(newMode === 'admin' ? 'admin@glory.com' : newMode === 'member' ? 'maria@glory.com' : '');
      setPassword('');
      setError('');
      setAnimateIn(true);
    }, 150);
  };

  // ─── Select mode ────────────────────────────────────────────
  if (mode === 'select') {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left / Hero side */}
        <div className="relative flex-1 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 flex flex-col items-center justify-center p-8 lg:p-16 overflow-hidden">
          <FloatingParticles />

          {/* Large background cross/light motif */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]" aria-hidden="true">
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
              <path d="M250 0H350V250H600V350H350V600H250V350H0V250H250V0Z" fill="white"/>
            </svg>
          </div>

          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]" aria-hidden="true" />

          <div className={`relative z-10 text-center max-w-md transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 rounded-3xl shadow-2xl shadow-primary-500/40 mb-8 ring-4 ring-white/10">
              <Sparkles size={44} className="text-white" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight">
              Glory
            </h1>
            <p className="text-primary-200/80 mt-3 text-lg lg:text-xl font-medium">
              Gestão Completa para Igrejas
            </p>

            {/* Rotating feature highlight */}
            <div className="mt-12 h-24">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl px-4 sm:px-6 py-4 transition-all duration-500 absolute left-1/2 -translate-x-1/2 w-[260px] sm:w-[300px] ${
                      i === currentFeature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-primary-300" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{feature.label}</p>
                      <p className="text-primary-300/70 text-xs mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature dots */}
            <div className="flex items-center justify-center gap-2 mt-16" aria-hidden="true">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentFeature(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentFeature ? 'w-8 h-2 bg-primary-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Mobile-only: show info */}
            <p className="lg:hidden text-sm text-primary-300/50 mt-8">
              Deslize para baixo para entrar
            </p>
          </div>
        </div>

        {/* Right / Card side */}
        <div className="relative bg-gradient-to-b from-slate-50 to-white lg:w-[520px] flex flex-col items-center justify-center p-8 lg:p-14">
          {/* Decorative top bar on mobile */}
          <div className="lg:hidden w-12 h-1.5 bg-gray-200 rounded-full mb-8" aria-hidden="true" />

          <div className={`w-full max-w-sm transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Welcome text */}
            <div className="mb-10">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 font-display">
                Bem-vindo! 👋
              </h2>
              <p className="text-gray-500 mt-2 text-sm lg:text-base">
                Escolha como deseja acessar a plataforma
              </p>
            </div>

            {/* Login Type Cards */}
            <div className="space-y-4">
              <button
                onClick={() => switchMode('admin')}
                className="w-full group relative bg-white border-2 border-gray-100 hover:border-amber-300 rounded-2xl p-5 text-left transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                aria-label="Entrar como administrador"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow group-hover:scale-105 transform duration-300">
                    <Shield size={26} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                      Administrativo
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">Pastores, líderes e equipe</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-amber-100 flex items-center justify-center transition-all">
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => switchMode('member')}
                className="w-full group relative bg-white border-2 border-gray-100 hover:border-primary-300 rounded-2xl p-5 text-left transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                aria-label="Entrar como membro"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow group-hover:scale-105 transform duration-300">
                    <User size={26} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                      Membro
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">Membros e visitantes</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-primary-100 flex items-center justify-center transition-all">
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </button>
            </div>

            {/* Demo credentials */}
            <div className="mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                🔐 Credenciais de Demonstração
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Shield size={10} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-700">Admin</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-mono">admin@glory.com</p>
                  <p className="text-[11px] text-gray-400 font-mono">admin123</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <User size={10} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-700">Membro</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-mono">maria@glory.com</p>
                  <p className="text-[11px] text-gray-400 font-mono">membro123</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[11px] text-gray-300 mt-8">
              © 2026 Glory Church Management
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Login Form ─────────────────────────────────────────────
  const isAdminMode = mode === 'admin';
  const gradientFrom = isAdminMode ? 'from-amber-400' : 'from-primary-400';
  const gradientTo = isAdminMode ? 'to-orange-500' : 'to-primary-600';
  const ringColor = isAdminMode ? 'focus:ring-amber-400' : 'focus:ring-primary-400';
  const accentBg = isAdminMode ? 'bg-amber-50' : 'bg-primary-50';
  const accentText = isAdminMode ? 'text-amber-700' : 'text-primary-700';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left / Branded side */}
      <div className="relative flex-1 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 flex flex-col items-center justify-center p-8 lg:p-16 overflow-hidden min-h-[240px] lg:min-h-0">
        <FloatingParticles />

        {/* Background motif */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]" aria-hidden="true">
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
            <path d="M250 0H350V250H600V350H350V600H250V350H0V250H250V0Z" fill="white"/>
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]" aria-hidden="true" />

        <div className={`relative z-10 text-center transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 rounded-3xl shadow-2xl shadow-primary-500/40 mb-6 ring-4 ring-white/10">
            <Sparkles size={40} className="text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">Glory</h1>
          <p className="text-primary-200/70 mt-2 text-base lg:text-lg font-medium">Gestão Completa para Igrejas</p>

          {/* Verse */}
          <div className="hidden lg:block mt-12 max-w-xs mx-auto">
            <div className="bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5">
              <p className="text-white/80 italic text-sm leading-relaxed">
                "Porque onde estiverem dois ou três reunidos em meu nome, ali estou no meio deles."
              </p>
              <p className="text-primary-300/60 text-xs mt-3 font-medium">Mateus 18:20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right / Form side */}
      <div className="relative bg-gradient-to-b from-slate-50 to-white lg:w-[520px] flex flex-col items-center justify-center p-8 lg:p-14">
        <div className={`w-full max-w-sm transition-all duration-400 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Back button */}
          <button
            onClick={() => switchMode('select')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 group focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-lg px-2 py-1 -ml-2"
            aria-label="Voltar à seleção de modo"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Voltar
          </button>

          {/* Mode badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg`}>
              {isAdminMode ? <Shield size={22} className="text-white" /> : <User size={22} className="text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 font-display">
                {isAdminMode ? 'Acesso Admin' : 'Acesso Membro'}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {isAdminMode ? 'Painel administrativo da igreja' : 'Área do membro e visitante'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5 text-sm animate-fade-in" role="alert">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={16} className="text-red-500" />
                </div>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all text-sm font-medium`}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                aria-label="Endereço de e-mail"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 pr-12 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all text-sm font-medium`}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  aria-label="Senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-xs text-gray-500 font-medium">Lembrar de mim</span>
              </label>
              <button type="button" className={`text-xs font-semibold ${accentText} hover:underline focus:outline-none focus:ring-2 ${ringColor} rounded px-1`}>
                Esqueci a senha
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
                isAdminMode
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-orange-500/20 hover:shadow-orange-500/40'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-primary-500/20 hover:shadow-primary-500/40'
              } ${loading ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
              aria-label="Entrar na plataforma"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300 font-medium">ou</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Quick switch */}
          <button
            onClick={() => switchMode(isAdminMode ? 'member' : 'admin')}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-100 hover:border-gray-200 ${accentBg} hover:bg-opacity-80 text-sm font-semibold ${accentText} transition-all focus:outline-none focus:ring-2 ${ringColor} focus:ring-offset-2`}
          >
            {isAdminMode ? <User size={16} /> : <Shield size={16} />}
            Entrar como {isAdminMode ? 'Membro' : 'Administrador'}
          </button>

          {/* Footer */}
          <p className="text-center text-[11px] text-gray-300 mt-8">
            © 2026 Glory Church Management
          </p>
        </div>
      </div>
    </div>
  );
}
