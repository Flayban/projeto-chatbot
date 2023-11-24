import { useContext, createContext } from "react";

const AuthContext = createContext();
//Exporta funçõs para aprovação e validação dos dados para realizar loading
export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}