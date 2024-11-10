import { Component, createContext, useContext, createEffect } from 'solid-js';
import { useAuth } from '../../hooks/useAuth';
import { LoadingState } from '../ui/loading-state';
import { useNavigate } from '@solidjs/router';

type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType>();

export const AuthProvider: Component = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  createEffect(() => {
    const user = auth.user();
    const currentPath = window.location.pathname;
    
    if (!user && !currentPath.startsWith('/auth/')) {
      navigate('/auth/login', { replace: true });
    } else if (user && currentPath.startsWith('/auth/')) {
      navigate('/dashboard', { replace: true });
    }
  });

  return (
    <AuthContext.Provider value={auth}>
      {auth.loading() ? <LoadingState /> : props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};