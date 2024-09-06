import { ReactNode, createContext, useContext, useState } from "react";

const AuthContext = createContext<unknown>({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
