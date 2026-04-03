import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

export type UserRole = 'admin' | 'pastor' | 'leader' | 'member' | 'visitor';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMember: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: (User & { password: string })[] = [
  {
    id: 'u1',
    name: 'Pr. Carlos Silva',
    email: 'admin@glory.com',
    password: 'admin123',
    role: 'admin',
    churchId: 'church-1',
    phone: '(11) 99999-0001',
    joinedAt: '2020-01-15',
    groups: ['g5'],
  },
  {
    id: 'u2',
    name: 'Maria Oliveira',
    email: 'maria@glory.com',
    password: 'membro123',
    role: 'member',
    churchId: 'church-1',
    phone: '(11) 99999-0002',
    joinedAt: '2021-03-10',
    groups: ['g1'],
  },
  {
    id: 'u3',
    name: 'Pedro Santos',
    email: 'pedro@glory.com',
    password: 'lider123',
    role: 'leader',
    churchId: 'church-1',
    phone: '(11) 99999-0003',
    joinedAt: '2020-06-15',
    groups: ['g2'],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = !!user && ['admin', 'pastor'].includes(user.role);
  const isMember = !!user && ['member', 'visitor', 'leader'].includes(user.role);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin, isMember, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
