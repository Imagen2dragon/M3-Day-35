import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dish) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...dish, lineId: `${dish.id}-${Date.now()}-${Math.random()}` },
          ],
        })),

      remove: (lineId) =>
        set((state) => ({
          items: state.items.filter((item) => item.lineId !== lineId),
        })),

      clear: () => set({ items: [] }),

      total: () =>
        (get().items || []).reduce((sum, item) => sum + item.price, 0),
    }),
    { name: "addis-eats-cart" }
  )
);
