import { Category, CreateOrderPayload, OrderRecord, OrderStatus, Product } from '../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from './constants';

const ORDERS_STORAGE_KEY = 'pizza_holic_orders';

// Initial sample orders for kitchen dashboard demonstration
const INITIAL_DEMO_ORDERS: OrderRecord[] = [
  {
    _id: 'ord-demo-1',
    orderNumber: 'PH-849201',
    customerName: 'Aman Sharma',
    customerPhone: '9876543210',
    orderType: 'Dine-in',
    tableNumber: '4',
    items: [
      {
        key: 'sv1:Medium',
        id: 'sv1',
        name: 'Just Cheese Magreta Pizza',
        size: 'Medium',
        price: 240,
        qty: 1,
        subtotal: 240,
      },
      {
        key: 'fr3',
        id: 'fr3',
        name: 'Peri Peri Fries',
        price: 99,
        qty: 1,
        subtotal: 99,
      },
    ],
    totalAmount: 339,
    status: 'preparing',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    _id: 'ord-demo-2',
    orderNumber: 'PH-712390',
    customerName: 'Pooja Verma',
    customerPhone: '9812345678',
    orderType: 'Home Delivery',
    deliveryAddress: 'House 42, Green Avenue, Sector 14',
    notes: 'Please bring extra ketchup and oregano sachets',
    items: [
      {
        key: 'bc2:Large',
        id: 'bc2',
        name: 'Tandoori Paneer',
        size: 'Large',
        price: 439,
        qty: 1,
        subtotal: 439,
      },
      {
        key: 'sh4',
        id: 'sh4',
        name: 'Oreo Shakes',
        price: 69,
        qty: 2,
        subtotal: 138,
      },
    ],
    totalAmount: 577,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

// Helper to get stored orders safely
function getStoredOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      return INITIAL_DEMO_ORDERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read orders from localStorage:', err);
    return INITIAL_DEMO_ORDERS;
  }
}

// Helper to save orders safely
function saveStoredOrders(orders: OrderRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Failed to save orders to localStorage:', err);
  }
}

/**
 * Returns categories instantly without backend network calls
 */
export async function getCategories(): Promise<Category[]> {
  return FALLBACK_CATEGORIES;
}

/**
 * Returns products with optional category and search filters instantly
 */
export async function getProducts(cat?: string, search?: string): Promise<Product[]> {
  let list = [...FALLBACK_PRODUCTS];

  if (cat && cat !== 'all') {
    list = list.filter((p) => p.cat === cat);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((p) =>
      [p.name, p.desc || '', p.section].join(' ').toLowerCase().includes(q)
    );
  }

  return list;
}

/**
 * Saves placed order directly in local storage and dispatches live update
 */
export async function submitOrder(payload: CreateOrderPayload): Promise<OrderRecord> {
  const orderNumber = `PH-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder: OrderRecord = {
    ...payload,
    _id: `ord-${Date.now()}`,
    orderNumber,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const existing = getStoredOrders();
  const updated = [newOrder, ...existing];
  saveStoredOrders(updated);

  return newOrder;
}

/**
 * Fetches all orders from client storage with optional status filter
 */
export async function getOrders(status?: string): Promise<OrderRecord[]> {
  const orders = getStoredOrders();
  if (status && status !== 'all') {
    return orders.filter((o) => o.status === status);
  }
  return orders;
}

/**
 * Updates an order status in client storage
 */
export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<OrderRecord | null> {
  const orders = getStoredOrders();
  let updatedOrder: OrderRecord | null = null;

  const nextOrders = orders.map((o) => {
    if (o._id === id || o.orderNumber === id) {
      updatedOrder = { ...o, status };
      return updatedOrder;
    }
    return o;
  });

  if (updatedOrder) {
    saveStoredOrders(nextOrders);
  }

  return updatedOrder;
}
