const STORAGE_KEY = "celavi-orders";

export interface OrderLine {
  name: string;
  quantity: number;
  price: number;
  note?: string;
}

export interface Order {
  id: string;
  date: string; // ISO
  items: OrderLine[];
  total: number;
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(items: OrderLine[], total: number): Order {
  const order: Order = {
    id: `PED-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString(),
    items,
    total,
  };
  try {
    const all = [order, ...getOrders()].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* armazenamento indisponível */
  }
  return order;
}
