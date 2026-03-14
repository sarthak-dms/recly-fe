import { createContext, useContext, useEffect, useState } from 'react';
import { validateAdminCredentials } from '../auth/adminAuth';

const LOCAL_STORAGE_KEY = 'recly-auth-user';
const SESSION_STORAGE_KEY = 'recly-auth-user-session';

const AuthContext = createContext(null);

const getStoredUser = () => {
  const storedUser =
    window.localStorage.getItem(LOCAL_STORAGE_KEY) ||
    window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    if (!user) {
      return;
    }

    const serializedUser = JSON.stringify(user);
    const existingLocal = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (existingLocal) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, serializedUser);
      return;
    }

    window.sessionStorage.setItem(SESSION_STORAGE_KEY, serializedUser);
  }, [user]);

  const signIn = ({ email, password, remember }) => {
    const validatedUser = validateAdminCredentials({ email, password });

    if (!validatedUser) {
      return {
        ok: false,
        error: 'Only configured admin users can sign in.',
      };
    }

    const storage = remember ? window.localStorage : window.sessionStorage;
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    storage.setItem(
      remember ? LOCAL_STORAGE_KEY : SESSION_STORAGE_KEY,
      JSON.stringify(validatedUser)
    );
    setUser(validatedUser);

    return {
      ok: true,
      user: validatedUser,
    };
  };

  const signOut = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
