export interface Product {
  id: string;
  cat: 'pizza' | 'sides' | 'beverages' | 'burgers' | 'value' | string;
  section: string;
  name: string;
  desc?: string;
  price?: number;
  sizes?: Record<string, number>;
  isAvailable?: boolean;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  desc: string;
  order: number;
}

export interface CartItem {
  key: string;
  id: string;
  name: string;
  size?: string;
  price: number;
  qty: number;
}

export type OrderType = 'Dine-in' | 'Takeaway' | 'Home Delivery';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderItemDetail {
  key: string;
  id: string;
  name: string;
  size?: string;
  price: number;
  qty: number;
  subtotal: number;
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  notes?: string;
  items: OrderItemDetail[];
  totalAmount: number;
  whatsappMessage?: string;
}

export interface OrderRecord extends CreateOrderPayload {
  _id?: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
}
