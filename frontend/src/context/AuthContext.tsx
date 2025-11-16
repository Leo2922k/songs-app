import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAdmin(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
