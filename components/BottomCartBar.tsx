'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export function BottomCartBar() {
  const { totalCount, totalAmount, openCart } = useCart();

  if (totalCount === 0) return null;

  return (
    <aside
      aria-label="Current order summary"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex w-[calc(100%-24px)] max-w-[620px] -translate-x-1/2 items-center justify-between rounded-2xl bg-[#123c24] px-4 py-3 text-white shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lime-300">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-black text-white">
            {totalCount} {totalCount === 1 ? 'item' : 'items'}
          </div>
          <div className="text-sm sm:text-base font-extrabold text-lime-300">
            {formatCurrency(totalAmount)}
          </div>
        </div>
      </div>

      <button
        onClick={openCart}
        className="flex items-center gap-1.5 rounded-xl bg-[#b9e84b] px-4 py-2 text-xs sm:text-sm font-black text-[#18311f] shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>View Cart</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </aside>
  );
}
