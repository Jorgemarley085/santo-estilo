import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart")) || [],

  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((p) => p.id === product.id);
      let updated;

      if (exists) {
        updated = state.items.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updated = [...state.items, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  removeItem: (id) =>
    set((state) => {
      const updated = state.items.filter((p) => p.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  increaseQty: (id) =>
    set((state) => {
      const updated = state.items.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  decreaseQty: (id) =>
    set((state) => {
      const updated = state.items.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce((acc, p) => acc + p.price * (p.quantity || 1), 0);
  },
}));
