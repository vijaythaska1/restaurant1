'use client';

import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    changeQty,
    removeItem,
    totalAmount,
    openCheckout,
  } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6ece4] px-5 py-4">
          <h2 className="text-xl font-bold text-[#17251c]">Your Order</h2>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef3ed] text-lg font-bold text-[#37503f] hover:bg-[#e1e9df] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-3 divide-y divide-[#edf0ec]">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#68716b] py-12">
              <p className="text-base font-semibold text-[#17251c]">Your cart is empty.</p>
              <p className="mt-1 text-xs text-[#68716b]">Tap <b>Add +</b> on any delicious item to order.</p>
            </div>
          ) : (
            items.map((item) => {
              const lineTotal = item.price * item.qty;
              return (
                <div key={item.key} className="py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#17251c]">
                        {item.name}
                        {item.size && (
                          <span className="ml-1 text-xs font-semibold text-[#16813f]">
                            • {item.size}
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-[#68716b]">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                    <span className="text-sm font-extrabold text-[#17251c]">
                      {formatCurrency(lineTotal)}
                    </span>
                  </div>

                  {/* Item controls */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <button
                      onClick={() => removeItem(item.key)}
                      className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.key, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#edf5e9] text-[#126b37] hover:bg-[#d8edd0] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5 font-bold" />
                      </button>
                      <span className="min-w-5 text-center text-xs font-bold text-[#17251c]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => changeQty(item.key, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#edf5e9] text-[#126b37] hover:bg-[#d8edd0] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5 font-bold" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e6ece4] bg-[#fbfdfa] p-5">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-base font-bold text-[#17251c]">Total</span>
              <span className="text-xl font-black text-[#0c6e37]">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <button
              onClick={openCheckout}
              className="w-full rounded-xl bg-[#12823f] py-3.5 text-center text-sm sm:text-base font-black text-white shadow-md hover:bg-[#0e6e34] active:scale-[0.99] transition-all cursor-pointer"
            >
              Continue to Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
