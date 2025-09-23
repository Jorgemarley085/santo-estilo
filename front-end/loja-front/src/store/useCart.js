import { create } from "zustand";

export const useCart = create((set) => ({
  items: JSON.parse(localStorage.getItem("cart")) || [],

  addItem: (product) =>
    set((state) => {
      const updated = [...state.items, product];
      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  removeItem: (id) =>
    set((state) => {
      const updated = state.items.filter((p) => p.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },
}));
