import { create } from 'zustand';

const USERS_KEY = 'ticketapp_users';
const SESSION_KEY = 'ticketapp_session';

const generateToken = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const readUsers = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return [];
  
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse users storage', error);
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const findUserByEmail = (users, email) =>
  users.find((user) => user.email.toLowerCase() === email.toLowerCase());

export const useAuthStore = create((set, get) => ({
  user: null,
  sessionToken: null,
  isHydrated: false,

  hydrate: () => {
    // Skip if we're not in a browser environment
    if (typeof window === 'undefined') {
      set({ isHydrated: true });
      return;
    }
    
    const rawSession = localStorage.getItem(SESSION_KEY);
    if (!rawSession) {
      set({ isHydrated: true });
      return;
    }

    try {
      const session = JSON.parse(rawSession);
      const users = readUsers();
      const user = users.find((candidate) => candidate.id === session.userId);

      if (session?.token && user) {
        set({
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
          sessionToken: session.token,
          isHydrated: true
        });
        return;
      }

      localStorage.removeItem(SESSION_KEY);
      set({ isHydrated: true });
    } catch (error) {
      console.error('Failed to hydrate session', error);
      localStorage.removeItem(SESSION_KEY);
      set({ isHydrated: true });
    }
  },

  register: ({ name, email, password }) => {
    const users = readUsers();
    const existing = findUserByEmail(users, email);

    if (existing) {
      const error = new Error('An account with that email already exists.');
      error.code = 'EMAIL_IN_USE';
      throw error;
    }

    const id = crypto.randomUUID();
    const nextUsers = [
      ...users,
      {
        id,
        name,
        email,
        password
      }
    ];

    writeUsers(nextUsers);

    const token = generateToken();
    const session = {
      token,
      userId: id,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    set({
      user: { id, name, email },
      sessionToken: token
    });

    return { token };
  },

  login: ({ email, password }) => {
    const users = readUsers();
    const user = findUserByEmail(users, email);

    if (!user || user.password !== password) {
      const error = new Error('Invalid credentials. Please try again.');
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    const token = generateToken();
    const session = {
      token,
      userId: user.id,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    set({
      user: { id: user.id, name: user.name, email: user.email },
      sessionToken: token
    });

    return { token };
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
    set({ user: null, sessionToken: null });
  },

  getSession: () => {
    const { sessionToken, user } = get();
    if (!sessionToken || !user) return null;
    return { sessionToken, user };
  },

  ensureAuthenticated: () => {
    const session = get().getSession();
    if (session) return session;
    const error = new Error('Your session has expired — please log in again.');
    error.code = 'UNAUTHORIZED';
    throw error;
  }
}));
