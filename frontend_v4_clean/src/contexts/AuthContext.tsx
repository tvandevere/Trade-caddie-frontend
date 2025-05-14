"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// import apiClient from '@/lib/api'; // We will mock API calls for now

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (/* credentials: any */) => Promise<void>; // Simplified for mock
  register: (/* userData: any */) => Promise<void>; // Simplified for mock
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuration for mocked user
const USE_MOCKED_USER = true; // Set to false to use real auth when backend is ready
const MOCKED_USER_DATA: User = {
  id: "mocked-user-123",
  username: "MockUser",
  email: "mockuser@example.com",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      if (USE_MOCKED_USER) {
        setUser(MOCKED_USER_DATA);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // Real authentication logic (when backend is ready)
        const token = localStorage.getItem('authToken');
        if (token) {
          try {
            // const response = await apiClient.get('/auth/me'); // Verify token with backend
            // setUser(response.data);
            // setIsAuthenticated(true);
            // For now, if token exists, assume valid - replace with actual verification
            console.warn("Auth: Using placeholder token validation. Implement real backend verification.");
            setUser({ id: "temp-id", username: "Temp User", email: "temp@example.com" }); // Placeholder user
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Failed to verify token', error);
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
            setUser(null);
          }
        }
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (/* credentials: any */) => {
    setIsLoading(true);
    if (USE_MOCKED_USER) {
      setUser(MOCKED_USER_DATA);
      setIsAuthenticated(true);
      setIsLoading(false);
      router.push('/market'); // Redirect to market after mock login
      return;
    }
    // Real login logic
    // try {
    //   const response = await apiClient.post('/auth/login', credentials);
    //   localStorage.setItem('authToken', response.data.token);
    //   setUser(response.data.user);
    //   setIsAuthenticated(true);
    //   router.push('/market');
    // } catch (error) {
    //   console.error('Login failed', error);
    //   throw error; // Rethrow to be caught by the form
    // } finally {
    //   setIsLoading(false);
    // }
    console.log("Login function called (real auth disabled)");
    setIsLoading(false);
  };

  const register = async (/* userData: any */) => {
    setIsLoading(true);
    if (USE_MOCKED_USER) {
      setUser(MOCKED_USER_DATA); // Simulate registration and login
      setIsAuthenticated(true);
      setIsLoading(false);
      router.push('/market');
      return;
    }
    // Real register logic
    // try {
    //   await apiClient.post('/auth/register', userData);
    //   // Optionally log in the user directly after registration or redirect to login
    //   // For now, redirecting to login page
    //   router.push('/auth/login');
    // } catch (error) {
    //   console.error('Registration failed', error);
    //   throw error;
    // } finally {
    //   setIsLoading(false);
    // }
    console.log("Register function called (real auth disabled)");
    setIsLoading(false);
  };

  const logout = () => {
    if (USE_MOCKED_USER) {
      setUser(null);
      setIsAuthenticated(false);
      router.push('/auth/login'); // Redirect to login after mock logout
      return;
    }
    // Real logout logic
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

