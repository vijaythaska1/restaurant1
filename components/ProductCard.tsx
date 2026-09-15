'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, changeQty } = useCart();
  const hasSizes = !!(product.sizes && Object.keys(product.sizes).length > 0);
  const sizeKeys = hasSizes ? Object.keys(product.sizes!) : [];

  const [selectedSize, setSelectedSize] = useState<string>(
    hasSizes ? sizeKeys[0] : ''
  );

  // Dynamic price calculation
  const currentPrice = hasSizes && product.sizes && selectedSize
    ? (product.sizes[selectedSize] ?? 0)
    : (product.price ?? 0);

  // Determine if this specific item + size is in the cart
  const cartKey = product.id + (hasSizes && selectedSize ? `:${selectedSize}` : '');
  const cartItem = items.find((i) => i.key === cartKey);
  const isAdded = !!cartItem;
  const quantity = cartItem?.qty || 0;

  const handleAdd = () => {
    addItem(product, hasSizes ? selectedSize : undefined);
  };

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#e5ede2] bg-white p-2.5 sm:p-3.5 shadow-xs transition-all hover:shadow-md hover:border-[#c5dcc0] overflow-hidden">
      <div>
        {/* Header: Item Name */}
        <div className="min-w-0">
          <h3 className="text-[13px] sm:text-[15px] font-bold text-[#17251c] leading-snug break-words">
            {product.name}
          </h3>
        </div>

        {/* Product Description */}
        {product.desc && (
          <p className="mt-1 text-[11px] sm:text-xs text-[#68716b] line-clamp-2 leading-relaxed break-words">
            {product.desc}
          </p>
        )}

        {/* Multi-size representation: Interactive Pill Buttons */}
        {hasSizes && product.sizes && (
          <div className="mt-2.5">
            <div className="flex items-center gap-1 sm:gap-1.5">
              {sizeKeys.map((size) => {
                const isSelected = selectedSize === size;
                const price = product.sizes![size];
                const shortName =
                  size === 'Small' ? 'S' : size === 'Medium' ? 'M' : size === 'Large' ? 'L' : size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 min-w-0 py-1 px-0.5 sm:px-1 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#16813f] text-white border-[#16813f] shadow-xs scale-[1.02]'
                        : 'bg-[#f6faf4] text-[#2c3e32] border-[#d8e3d5] hover:bg-[#ebf5e7]'
                    }`}
                  >
                    <span className="block text-[11px] font-bold leading-tight truncate">
                      {shortName}
                    </span>
                    <span
                      className={`block text-[10px] font-semibold leading-tight truncate ${
                        isSelected ? 'text-lime-200' : 'text-[#5b7364]'
                      }`}
                    >
                      ₹{price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-3 pt-2 border-t border-[#f2f6f1]">
        {/* Price & Size info */}
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-base sm:text-lg font-black text-[#0b7139]">
              {formatCurrency(currentPrice)}
            </span>
            {hasSizes && (
              <span className="text-[11px] font-semibold text-[#687a6c] truncate">
                • {selectedSize}
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Full width inside card to ensure it NEVER overflows or collides */}
        {isAdded ? (
          <div className="flex w-full items-center justify-between rounded-xl bg-[#0f6b31] p-1 text-white shadow-xs">
            <button
              type="button"
              onClick={() => changeQty(cartKey, -1)}
              className="flex h-7 w-7 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-black/15 hover:bg-black/25 active:scale-90 transition-all cursor-pointer font-bold"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5 text-white" />
            </button>
            <div className="flex items-center justify-center gap-1 px-1 text-[11px] sm:text-xs font-black text-lime-200 min-w-0 truncate">
              <Check className="h-3.5 w-3.5 shrink-0 text-lime-300" />
              <span className="truncate">Added{quantity > 1 ? ` (${quantity})` : ''}</span>
            </div>
            <button
              type="button"
              onClick={() => changeQty(cartKey, 1)}
              className="flex h-7 w-7 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-black/15 hover:bg-black/25 active:scale-90 transition-all cursor-pointer font-bold"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#16813f] py-2 text-xs font-bold text-white shadow-xs hover:bg-[#126e35] active:scale-98 transition-all cursor-pointer"
            aria-label={`Add ${product.name} to order`}
          >
            <span>Add</span>
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </article>
  );
}
