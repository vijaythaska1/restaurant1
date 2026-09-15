import React from 'react';
import Link from 'next/link';
import { STORE_CONFIG } from '../lib/constants';
import { Phone, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 bg-[#123c24] px-4 py-8 text-center text-[#eaf6ec]">
      <div className="mx-auto max-w-[1050px]">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-lg border border-emerald-800">
          <img
            src="/logo.png"
            alt={STORE_CONFIG.name}
            className="h-full w-full object-contain"
          />
        </div>
        <h3 className="font-serif text-2xl font-bold tracking-wide text-white">
          {STORE_CONFIG.name}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm font-medium text-emerald-200/90">
          {STORE_CONFIG.tagline}
        </p>
        <p className="mt-1 text-xs sm:text-sm font-semibold text-lime-300">
          {STORE_CONFIG.freeDeliveryText}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-[#d7f66d]">
          <Phone className="h-4 w-4" />
          <a
            href={`tel:${STORE_CONFIG.phone1}`}
            className="hover:underline transition-colors"
          >
            {STORE_CONFIG.phone1}
          </a>
          <span>•</span>
          <a
            href={`tel:${STORE_CONFIG.phone2}`}
            className="hover:underline transition-colors"
          >
            {STORE_CONFIG.phone2}
          </a>
        </div>

        <div className="mt-6 border-t border-emerald-900/60 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-300/80">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin / Kitchen Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
