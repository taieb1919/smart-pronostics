export interface User {
  id: string;
  email: string;
  username: string;
  subscription: 'free' | 'premium' | 'vip';
  role?: 'user' | 'admin';
  createdAt: Date;
}