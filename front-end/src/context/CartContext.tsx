"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "celavi-cart";

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "SET_NOTE"; productId: string; note: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + qty }
              : i,
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: qty }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case "SET_QTY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i,
        ),
      };
    }
    case "SET_NOTE":
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, note: action.note } : i,
        ),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  setNote: (productId: string, note: string) => void;
  clear: () => void;
  quantityOf: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Carregar do localStorage no arranque.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) as CartItem[] });
    } catch {
      /* ignora dados corrompidos */
    }
    setHydrated(true);
  }, []);

  // Persistir sempre que muda.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* armazenamento indisponível */
    }
  }, [state.items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const total = state.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
    return {
      items: state.items,
      count,
      total,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add: (product, quantity) => dispatch({ type: "ADD", product, quantity }),
      remove: (productId) => dispatch({ type: "REMOVE", productId }),
      setQty: (productId, quantity) => dispatch({ type: "SET_QTY", productId, quantity }),
      setNote: (productId, note) => dispatch({ type: "SET_NOTE", productId, note }),
      clear: () => dispatch({ type: "CLEAR" }),
      quantityOf: (productId) =>
        state.items.find((i) => i.product.id === productId)?.quantity ?? 0,
    };
  }, [state.items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
