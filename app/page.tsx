'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { CategoryTabs } from '../components/CategoryTabs';
import { MenuList } from '../components/MenuList';
import { BottomCartBar } from '../components/BottomCartBar';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { Footer } from '../components/Footer';
import { getCategories, getProducts } from '../lib/api';
import { Category, Product } from '../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../lib/constants';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initial load for categories and products
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts('all'),
        ]);
        if (isMounted) {
          if (cats && cats.length > 0) setCategories(cats);
          if (prods && prods.length > 0) setProducts(prods);
        }
      } catch (err) {
        console.error('Initial load failed, keeping fallback data:', err);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products by active category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.cat === activeCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        p.section.toLowerCase().includes(q);

      return matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    // Optional: scroll smoothly to top of menu
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f4f7ef] text-[#17251c] flex flex-col justify-between selection:bg-lime-200">
      <div>
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <Banner />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
        <MenuList products={filteredProducts} isLoading={isLoading} />
      </div>

      <Footer />

      {/* Floating cart bar & overlays */}
      <BottomCartBar />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}
