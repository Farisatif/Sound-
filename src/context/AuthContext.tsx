import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<'success' | 'exists' | 'error'>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // جلب جميع المستخدمين من localStorage
  const getUsers = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  // تسجيل الدخول
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // محاكاة تأخير

    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('currentUser', JSON.stringify(found));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  // تسجيل حساب جديد
  const signup = async (name: string, email: string, password: string): Promise<'success' | 'exists' | 'error'> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // محاكاة تأخير

    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      return 'exists';
    }

    if (name && email && password.length >= 6) {
      const newUser: User = { id: Date.now().toString(), name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setIsLoading(false);
      return 'success';
    }

    setIsLoading(false);
    return 'error';
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // تحميل المستخدم الحالي من localStorage عند بدء التطبيق
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) setUser(JSON.parse(currentUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
