'use client';

import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Pizza } from 'lucide-react';

interface MenuListProps {
  products: Product[];
  isLoading?: boolean;
}

export function MenuList({ products, isLoading }: MenuListProps) {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1050px] px-3 py-12 text-center text-[#68716b]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent mb-3" />
        <p className="text-sm font-medium">Loading delicious menu...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-[1050px] px-3 py-16 text-center text-[#68716b]">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Pizza className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-[#17251c]">No items found</h3>
        <p className="mt-1 text-xs text-[#68716b]">Try searching for something else or pick another category.</p>
      </div>
    );
  }

  // Group products by their section
  const sectionMap = new Map<string, Product[]>();
  products.forEach((p) => {
    const list = sectionMap.get(p.section) || [];
    list.push(p);
    sectionMap.set(p.section, list);
  });

  const sections = Array.from(sectionMap.entries());

  return (
    <main className="mx-auto max-w-[1050px] px-3 pb-28 pt-2 sm:px-4">
      {sections.map(([sectionName, items]) => (
        <section key={sectionName} className="mb-7">
          {/* Section title & count */}
          <div className="mb-2.5 flex items-baseline justify-between border-b border-[#e2ebd0]/70 pb-1.5">
            <h2 className="text-lg sm:text-xl font-black text-[#17251c] tracking-tight">
              {sectionName}
            </h2>
            <p className="text-xs font-semibold text-[#68716b]">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Responsive product grid (1 col on extreme narrow, 2 cols on mobile, 3 cols on desktop) */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
