import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const SESSION_KEY = "addis-eats-session";

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());

  const value = useMemo(
    () => ({
      user,
      login: ({ name, phone }) => {
        const next = { name: name.trim(), phone: phone.trim() };
        localStorage.setItem(SESSION_KEY, JSON.stringify(next));
        setUser(next);
      },
      logout: () => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      },
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
