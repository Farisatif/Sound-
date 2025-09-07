// src/utils/auth.ts
export interface User {
  name: string;
  email: string;
  password: string;
}

// جلب المستخدمين من localStorage
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// حفظ مستخدم جديد
export const addUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

// تحقق تسجيل الدخول
export const checkLogin = (email: string, password: string): boolean => {
  const users = getUsers();
  return users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
};

// تحقق إذا البريد موجود مسبقًا
export const emailExists = (email: string): boolean => {
  const users = getUsers();
  return users.some(u => u.email.toLowerCase() === email.toLowerCase());
};
