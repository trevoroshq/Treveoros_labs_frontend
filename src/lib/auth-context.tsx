'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authApi, ApiError } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'STUDENT' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    let userData: User | null = null;
    try {
      const data = await authApi.me() as { user: User };
      userData = data.user;
    } catch (firstErr) {
      // For genuine 401s (no/invalid token), don't retry — user is logged out
      const isUnauthorized = firstErr instanceof ApiError && firstErr.status === 401;
      if (!isUnauthorized) {
        // Transient failure (cold DB start, timeout, network blip) — retry once
        try {
          await new Promise(r => setTimeout(r, 1500));
          const data = await authApi.me() as { user: User };
          userData = data.user;
        } catch {
          console.warn('[AuthProvider] Auth retry also failed');
        }
      }
      if (userData === null) {
        console.warn('[AuthProvider] Auth check failed:', firstErr instanceof Error ? firstErr.message : firstErr);
      }
    }
    setUser(userData);
    setLoading(false);
  }, []);

  // Only run on mount - refreshUser is stable with no dependencies
  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authApi.login({ email, password }) as { user: User };
    setUser(data.user);
  };

  const register = async (regData: { name: string; email: string; password: string; phone?: string }) => {
    const data = await authApi.register(regData) as { user: User };
    setUser(data.user);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
