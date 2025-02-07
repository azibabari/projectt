import { create } from 'zustand';
import { CartItem, Product } from '@/types/product';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from './useAuthStore';

interface CartStore {
  items: CartItem[];
  loading: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: true,
  addItem: async (product: Product, quantity = 1) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newItems = [...get().items];
    const existingItem = newItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newItems.push({ ...product, quantity });
    }

    set({ items: newItems });
    await supabase
      .from('carts')
      .update({ items: newItems })
      .eq('user_id', user.id);
  },
  removeItem: async (productId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newItems = get().items.filter((item) => item.id !== productId);
    set({ items: newItems });
    await supabase
      .from('carts')
      .update({ items: newItems })
      .eq('user_id', user.id);
  },
  updateQuantity: async (productId: string, quantity: number) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newItems = get().items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    set({ items: newItems });
    await supabase
      .from('carts')
      .update({ items: newItems })
      .eq('user_id', user.id);
  },
  clearCart: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ items: [] });
    await supabase
      .from('carts')
      .update({ items: [] })
      .eq('user_id', user.id);
  },
  loadCart: async () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      set({ items: [], loading: false });
      return;
    }

    const { data } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', user.id)
      .single();

    set({ items: data?.items || [], loading: false });
  },
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));