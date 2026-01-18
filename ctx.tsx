import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from './constants/Api';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  token?: string;
};

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, phoneNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  user: null,
  isLoading: true,
});

export function useSession() {
  return useContext(AuthContext);
}

function useProtectedRoute(user: User | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    setIsNavigationReady(true);
  }, []);

  useEffect(() => {
    if (!isNavigationReady || isLoading) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup';
    
    if (!user && !inAuthGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/client-home'); // Redirect to client home after login
    }
  }, [user, segments, isNavigationReady, isLoading]);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  useProtectedRoute(user, isLoading);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const userData = response.data;
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      // Axios default header for future requests if needed
      // axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

    } catch (error: any) {
       console.error("Sign in error", error.response?.data?.message || error.message);
       throw new Error(error.response?.data?.message || 'Login failed');
    }
  };
  
  const signUp = async (email: string, password: string, name: string, phoneNumber: string) => {
      try {
          const response = await axios.post(`${API_URL}/auth/register`, {
              name,
              email,
              password,
              phoneNumber
          });

          const userData = response.data;
          setUser(userData);
          await AsyncStorage.setItem('user', JSON.stringify(userData));

      } catch (error: any) {
          console.error("Sign up error", error.response?.data?.message || error.message);
          throw new Error(error.response?.data?.message || 'Signup failed');
      }
  }

  const signOut = async () => {
      try {
          setUser(null);
          await AsyncStorage.removeItem('user');
      } catch (error) {
          console.error("Sign out error", error);
      }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
