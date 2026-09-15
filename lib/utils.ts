import { CartItem, OrderType } from '../types';
import { STORE_CONFIG } from './constants';

export function formatCurrency(amount: number): string {
  return `${STORE_CONFIG.currencySymbol}${Number(amount || 0).toLocaleString('en-IN')}`;
}

export function buildWhatsAppMessage(params: {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  notes?: string;
  items: CartItem[];
  total: number;
}): string {
  const {
    customerName,
    customerPhone,
    orderType,
    tableNumber,
    deliveryAddress,
    notes,
    items,
    total,
  } = params;

  let msg = `*PIZZA HOLIC – NEW ORDER*\n\n`;
  msg += `*Customer:* ${customerName}\n`;
  msg += `*Mobile:* ${customerPhone}\n`;
  msg += `*Order Type:* ${orderType}\n`;

  if (orderType === 'Dine-in' && tableNumber) {
    msg += `*Table:* ${tableNumber}\n`;
  }
  if (orderType === 'Home Delivery' && deliveryAddress) {
    msg += `*Address:* ${deliveryAddress}\n`;
  }

  msg += `\n*ITEMS*\n`;
  items.forEach((item, index) => {
    const sizeStr = item.size ? ` (${item.size})` : '';
    const lineTotal = formatCurrency(item.price * item.qty);
    msg += `${index + 1}. ${item.name}${sizeStr} × ${item.qty} = ${lineTotal}\n`;
  });

  msg += `\n*TOTAL: ${formatCurrency(total)}*\n`;

  if (notes && notes.trim()) {
    msg += `\n*Notes:* ${notes.trim()}\n`;
  }

  return msg;
}

export function getWhatsAppUrl(phone: string, text: string): string {
  const sanitizedPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(text)}`;
}
