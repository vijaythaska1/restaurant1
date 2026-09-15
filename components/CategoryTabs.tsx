'use client';

import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const allTabs = [
    { id: 'all', name: 'All Items' },
    ...categories,
  ];

  return (
    <nav
      className="mx-auto max-w-[1050px] px-3 pt-3.5 pb-2 sm:px-4"
      aria-label="Menu categories"
    >
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {allTabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#16813f] text-white shadow-sm border border-[#16813f]'
                  : 'bg-white text-[#37503f] border border-[#dce5d9] hover:bg-[#f0f5ee]'
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
