'use client';

import { createContext, useContext, useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ['/signin', '/signup'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);
  const mountedRef = useRef(true);
  const navigationInProgress = useRef(false);

  // Initialize auth state
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mountedRef.current) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mountedRef.current) return;

      setUser(session?.user ?? null);
      
      if (!navigationInProgress.current) {
        navigationInProgress.current = true;
        try {
          if (event === 'SIGNED_IN') {
            router.push('/dashboard');
          } else if (event === 'SIGNED_OUT') {
            router.push('/signin');
          }
        } catch (error) {
          console.error('Navigation error:', error);
        } finally {
          navigationInProgress.current = false;
        }
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [router]);

  // Handle route protection
  useEffect(() => {
    if (isInitialMount.current || loading || navigationInProgress.current) {
      isInitialMount.current = false;
      return;
    }

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    if (!navigationInProgress.current) {
      navigationInProgress.current = true;
      try {
        if (!user && !isPublicRoute) {
          router.push('/signin');
        } else if (user && isPublicRoute) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        navigationInProgress.current = false;
      }
    }
  }, [user, loading, pathname, router]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }), [user, loading, signIn, signUp, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
