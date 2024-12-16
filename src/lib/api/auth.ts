import { User } from '../../types/auth';

// Demo credentials with simpler passwords
const DEMO_CREDENTIALS: Record<string, { password: string; role: string; name: string }> = {
  admin: { password: 'admin', role: 'admin', name: 'Admin User' },
  cashier: { password: 'cash', role: 'cashier', name: 'Cashier User' },
  kitchen: { password: 'kitchen', role: 'kitchen', name: 'Kitchen Staff' },
};

export const auth = {
  login: async (username: string, password: string) => {
    return new Promise<{ token: string; user: User }>((resolve, reject) => {
      setTimeout(() => {
        const userCredentials = DEMO_CREDENTIALS[username];
        
        if (userCredentials && userCredentials.password === password) {
          const user: User = {
            id: `user-${username}`,
            username,
            role: userCredentials.role as User['role'],
            name: userCredentials.name,
          };
          
          const token = btoa(`${username}:${Date.now()}`);
          
          // Store auth data in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          resolve({ token, user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr) as User;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  addUser: (username: string, password: string, role: string) => {
    if (DEMO_CREDENTIALS[username]) {
      throw new Error('Username already exists');
    }
    
    DEMO_CREDENTIALS[username] = {
      password,
      role,
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
    };
  },
};