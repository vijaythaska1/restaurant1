'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderType } from '../types';
import { STORE_CONFIG } from '../lib/constants';
import { buildWhatsAppMessage, getWhatsAppUrl } from '../lib/utils';
import { submitOrder } from '../lib/api';
import { X, MessageSquareShare, Loader2 } from 'lucide-react';

export function CheckoutModal() {
  const {
    items,
    totalAmount,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('Dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = customerName.trim();
    const trimmedPhone = customerPhone.trim();
    const trimmedTable = tableNumber.trim();
    const trimmedAddress = deliveryAddress.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!trimmedPhone || trimmedPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (orderType === 'Dine-in' && !trimmedTable) {
      setErrorMessage('Please enter your table number.');
      return;
    }
    if (orderType === 'Home Delivery' && !trimmedAddress) {
      setErrorMessage('Please enter your full delivery address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Build WhatsApp formatted message
      const whatsappMsg = buildWhatsAppMessage({
        customerName: trimmedName,
        customerPhone: trimmedPhone,
        orderType,
        tableNumber: trimmedTable,
        deliveryAddress: trimmedAddress,
        notes: notes.trim(),
        items,
        total: totalAmount,
      });

      // 2. Persist order to MongoDB backend via NestJS API
      const orderPayload = {
        customerName: trimmedName,
        customerPhone: trimmedPhone,
        orderType,
        tableNumber: orderType === 'Dine-in' ? trimmedTable : undefined,
        deliveryAddress: orderType === 'Home Delivery' ? trimmedAddress : undefined,
        notes: notes.trim() || undefined,
        items: items.map((i) => ({
          key: i.key,
          id: i.id,
          name: i.name,
          size: i.size,
          price: i.price,
          qty: i.qty,
          subtotal: i.price * i.qty,
        })),
        totalAmount,
        whatsappMessage: whatsappMsg,
      };

      await submitOrder(orderPayload);

      // 3. Open WhatsApp link in new tab
      const waUrl = getWhatsAppUrl(STORE_CONFIG.whatsappNumber, whatsappMsg);
      window.open(waUrl, '_blank');

      // 4. Reset & Clear Cart
      clearCart();
      closeCheckout();
    } catch (err) {
      console.error('Order process error:', err);
      // Fallback: still open WhatsApp even if network issues occur
      const fallbackMsg = buildWhatsAppMessage({
        customerName: trimmedName,
        customerPhone: trimmedPhone,
        orderType,
        tableNumber: trimmedTable,
        deliveryAddress: trimmedAddress,
        notes: notes.trim(),
        items,
        total: totalAmount,
      });
      window.open(getWhatsAppUrl(STORE_CONFIG.whatsappNumber, fallbackMsg), '_blank');
      clearCart();
      closeCheckout();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCheckout();
      }}
    >
      <div className="relative flex h-full w-full max-w-[500px] flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6ece4] px-5 py-4">
          <h2 className="text-xl font-bold text-[#17251c]">Order Details</h2>
          <button
            onClick={closeCheckout}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef3ed] text-lg font-bold text-[#37503f] hover:bg-[#e1e9df] transition-colors cursor-pointer"
            aria-label="Close order details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5">
          {errorMessage && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Customer Name */}
          <div className="mb-3.5">
            <label className="block text-xs font-bold text-[#17251c] mb-1.5">
              Customer name
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-[#d7e0d5] bg-white p-3 text-base sm:text-sm text-[#17251c] focus:border-[#16813f] focus:outline-none"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-3.5">
            <label className="block text-xs font-bold text-[#17251c] mb-1.5">
              Mobile number
            </label>
            <input
              type="tel"
              inputMode="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full rounded-xl border border-[#d7e0d5] bg-white p-3 text-base sm:text-sm text-[#17251c] focus:border-[#16813f] focus:outline-none"
            />
          </div>

          {/* Order Type */}
          <div className="mb-3.5">
            <label className="block text-xs font-bold text-[#17251c] mb-1.5">
              Order type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Dine-in', 'Takeaway', 'Home Delivery'] as OrderType[]).map((type) => {
                const checked = orderType === type;
                return (
                  <label
                    key={type}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold cursor-pointer transition-all ${
                      checked
                        ? 'border-[#16813f] bg-[#eef8e9] text-[#0c6e37]'
                        : 'border-[#d8e1d7] bg-white text-[#3e5144] hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value={type}
                      checked={checked}
                      onChange={() => setOrderType(type)}
                      className="accent-[#16813f]"
                    />
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Dine-in Table Number */}
          {orderType === 'Dine-in' && (
            <div className="mb-3.5">
              <label className="block text-xs font-bold text-[#17251c] mb-1.5">
                Table number
              </label>
              <input
                type="text"
                required
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 4"
                className="w-full rounded-xl border border-[#d7e0d5] bg-white p-3 text-base sm:text-sm text-[#17251c] focus:border-[#16813f] focus:outline-none"
              />
            </div>
          )}

          {/* Home Delivery Address */}
          {orderType === 'Home Delivery' && (
            <div className="mb-3.5">
              <label className="block text-xs font-bold text-[#17251c] mb-1.5">
                Delivery address
              </label>
              <textarea
                rows={3}
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Full delivery address (house #, street, landmark)"
                className="w-full rounded-xl border border-[#d7e0d5] bg-white p-3 text-base sm:text-sm text-[#17251c] focus:border-[#16813f] focus:outline-none"
              />
            </div>
          )}

          {/* Special Instructions */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-[#17251c] mb-1.5">
              Special instructions
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Less spicy, no onion, extra oregano, etc."
              className="w-full rounded-xl border border-[#d7e0d5] bg-white p-3 text-base sm:text-sm text-[#17251c] focus:border-[#16813f] focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#19a857] py-3.5 text-center text-sm sm:text-base font-black text-white shadow-md hover:bg-[#158f4a] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <MessageSquareShare className="h-5 w-5" />
                <span>📲 Send Order on WhatsApp</span>
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[11px] font-medium text-[#68716b]">
            Your order will be instantly saved and opened in WhatsApp. Please press Send to confirm.
          </p>
        </form>
      </div>
    </div>
  );
}
