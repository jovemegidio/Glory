import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AccessibilityWidget from '../ui/AccessibilityWidget';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content - accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Ir para o conteúdo principal
      </a>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full z-50 lg:hidden animate-slide-in">
            <Sidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-72 min-h-screen flex flex-col">
        <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main id="main-content" className="flex-1 p-4 sm:p-5 lg:p-6 max-w-[1600px] w-full mx-auto" role="main" aria-label="Conteúdo principal">
          <Outlet />
        </main>
      </div>

      {/* Accessibility Widget */}
      <AccessibilityWidget />
    </div>
  );
}
