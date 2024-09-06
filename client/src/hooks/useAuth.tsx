import { ReactNode, createContext, useContext, useState } from "react";

type AuthType = {
  userId: string;
  userRole: string;
} | null;

type AuthContextType = {
  auth: AuthType;
  setAuth: (auth: AuthType) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthType>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
