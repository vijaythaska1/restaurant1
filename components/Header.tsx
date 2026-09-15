'use client';

import React from 'react';
import { Search, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../lib/constants';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { totalCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#0c6e37] to-[#20a653] text-white shadow-md transition-all">
      <div className="mx-auto max-w-[1050px] px-4 py-3">
        {/* Top brand row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md transition-transform hover:scale-105 border border-white/20">
              <img
                src="/logo.png"
                alt={STORE_CONFIG.name}
                className="h-full w-full object-cover p-1"
              />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
                {STORE_CONFIG.name}
              </h1>
              <small className="block text-xs font-medium text-emerald-100/90 sm:text-sm">
                {STORE_CONFIG.tagline}
              </small>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              id="header-cart-btn"
              className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-black text-[#0b7139] shadow-sm transition-all hover:bg-emerald-50 active:scale-95 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingCart className="h-4 w-4 text-[#0b7139]" />
              <span id="header-cart-count" className="font-extrabold">{totalCount}</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mt-3.5 flex items-center">
          <div className="pointer-events-none absolute left-3.5 flex items-center text-gray-400">
            <Search className="h-4 w-4 text-emerald-700" />
          </div>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search pizza, burger, shake, fries..."
            className="w-full rounded-2xl bg-white py-2.5 sm:py-3 pl-10 pr-10 text-base sm:text-sm font-medium text-[#17251c] shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
