import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { request } from '@/lib/api';

// ── Types (matching backend cart_service response) ─────────────────────────
interface CartItem {
  cart_item_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  gst_rate: number;
  gst_amount: number;
  item_total: number;
  in_stock?: boolean;
}

interface CartData {
  cart_id?: number;
  items: CartItem[];
  item_count?: number;
  subtotal: number;
  gst_amount: number;
  shipping_amount: number;
  total: number;
}

interface CartContextType {
  cart: CartData | null;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = async () => {
    // Don't fetch if user is not logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setCart(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      // Use explicit trailing slash — avoids FastAPI 307 redirect
      // which causes browsers to drop the Authorization header
      const data = await request('/cart/');
      setCart(data as CartData);
    } catch (err: any) {
      const msg: string = err?.message || '';
      // Auth errors: silently reset (api.ts already redirects to /login)
      if (
        msg.includes('401') || msg.includes('403') ||
        msg.toLowerCase().includes('credential') ||
        msg.toLowerCase().includes('session') ||
        msg.toLowerCase().includes('not authenticated') ||
        msg.toLowerCase().includes('expired')
      ) {
        setCart(null);
        setError(null);
      } else {
        setError(msg || 'Failed to load cart');
        console.error('[CartContext] refreshCart error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      setError(null);
      await request('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      await refreshCart();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      setError(null);
      await request(`/cart/items/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
      await refreshCart();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      setError(null);
      await request(`/cart/items/${cartItemId}`, { method: 'DELETE' });
      await refreshCart();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      await request('/cart/', { method: 'DELETE' });
      await refreshCart();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Load cart on mount if logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, loading, error, refreshCart, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
