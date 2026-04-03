import React, { useState, useEffect } from 'react';
import { Accessibility, ZoomIn, ZoomOut, Sun, Moon, Type, RotateCcw, X, Eye } from 'lucide-react';

interface A11ySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  largePointer: boolean;
}

const defaultSettings: A11ySettings = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  largePointer: false,
};

function loadSettings(): A11ySettings {
  try {
    const data = localStorage.getItem('glory_accessibility');
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function saveSettings(s: A11ySettings) {
  localStorage.setItem('glory_accessibility', JSON.stringify(s));
}

function applySettings(s: A11ySettings) {
  const root = document.documentElement;

  // Font size
  root.style.fontSize = `${s.fontSize}%`;

  // High contrast
  if (s.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }

  // Reduced motion
  if (s.reducedMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }

  // Large pointer
  if (s.largePointer) {
    root.classList.add('large-pointer');
  } else {
    root.classList.remove('large-pointer');
  }
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(loadSettings);

  useEffect(() => {
    applySettings(settings);
    saveSettings(settings);
  }, [settings]);

  // Apply settings on mount
  useEffect(() => {
    applySettings(settings);
  }, []);

  const updateSetting = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setSettings(defaultSettings);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-xl shadow-primary-500/30 flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-300"
        aria-label="Abrir configurações de acessibilidade"
        aria-expanded={isOpen}
        title="Acessibilidade"
      >
        <Accessibility size={24} />
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsOpen(false)} />
          <div
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            role="dialog"
            aria-label="Configurações de acessibilidade"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary-600 to-primary-700">
              <div className="flex items-center gap-2 text-white">
                <Accessibility size={20} />
                <h2 className="text-base font-bold">Acessibilidade</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                aria-label="Fechar painel de acessibilidade"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Font Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Type size={16} className="inline mr-1.5" aria-hidden="true" />
                  Tamanho do Texto
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateSetting('fontSize', Math.max(80, settings.fontSize - 10))}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Diminuir texto"
                    disabled={settings.fontSize <= 80}
                  >
                    <ZoomOut size={18} className="text-gray-600" />
                  </button>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 relative">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${((settings.fontSize - 80) / 60) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => updateSetting('fontSize', Math.min(140, settings.fontSize + 10))}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Aumentar texto"
                    disabled={settings.fontSize >= 140}
                  >
                    <ZoomIn size={18} className="text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-1" aria-live="polite">{settings.fontSize}%</p>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-gray-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700">Alto Contraste</span>
                </div>
                <button
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    settings.highContrast ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.highContrast}
                  aria-label="Ativar alto contraste"
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon size={16} className="text-gray-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700">Reduzir Animações</span>
                </div>
                <button
                  onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    settings.reducedMotion ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.reducedMotion}
                  aria-label="Reduzir animações"
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Large Pointer / Touch */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun size={16} className="text-gray-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700">Áreas de Toque Maiores</span>
                </div>
                <button
                  onClick={() => updateSetting('largePointer', !settings.largePointer)}
                  className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    settings.largePointer ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.largePointer}
                  aria-label="Áreas de toque maiores"
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings.largePointer ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Reset */}
              <button
                onClick={resetAll}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Restaurar configurações padrão de acessibilidade"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Restaurar Padrão
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
