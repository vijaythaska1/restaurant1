import React from 'react';

export function Banner() {
  return (
    <div className="mx-auto max-w-[1050px] px-3 pt-3.5 sm:px-4">
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#d8f66d] via-[#eafd8f] to-[#f8fff0] p-4 shadow-sm border border-[#cbe95e]/40 transition-all hover:shadow-md">
        <div>
          <strong className="text-base sm:text-lg font-extrabold text-[#17251c]">
            All New Value Menu
          </strong>
          <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#3e5144]">
            Starting at just ₹59 • Order directly on WhatsApp
          </p>
        </div>
        <div className="text-3xl sm:text-4xl filter drop-shadow-sm select-none animate-pulse">
          🍕
        </div>
      </div>
    </div>
  );
}
