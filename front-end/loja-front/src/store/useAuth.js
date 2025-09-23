import { create } from "zustand";

export const useAuth = create((set) => ({
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  nome: localStorage.getItem("nome") || null,

  setAuth: (token, role, nome) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("nome", nome);
    set({ token, role, nome });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nome");
    set({ token: null, role: null, nome: null });
  },
}));
