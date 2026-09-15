'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { OrderRecord, OrderStatus } from '../../types';
import { getOrders, updateOrderStatus } from '../../lib/api';
import { formatCurrency } from '../../lib/utils';
import {
  ArrowLeft,
  RefreshCw,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  PackageCheck,
} from 'lucide-react';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; icon: any }
> = {
  pending: {
    label: 'Pending',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    icon: AlertCircle,
  },
  confirmed: {
    label: 'Confirmed',
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: CheckCircle2,
  },
  preparing: {
    label: 'Preparing',
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    icon: ChefHat,
  },
  ready: {
    label: 'Ready',
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    icon: PackageCheck,
  },
  completed: {
    label: 'Completed',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    icon: AlertCircle,
  },
};

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadOrders = async (status?: string) => {
    setIsRefreshing(true);
    const data = await getOrders(status === 'all' ? undefined : status);
    setOrders(data);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadOrders(selectedStatus);
    const handleStorageChange = () => {
      loadOrders(selectedStatus);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [selectedStatus]);

  const handleStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
    const updated = await updateOrderStatus(orderId, nextStatus);
    if (updated) {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId || o.orderNumber === orderId
            ? { ...o, status: nextStatus }
            : o
        )
      );
    }
  };

  const handleResetOrders = () => {
    if (confirm('Reset kitchen orders to default demo orders?')) {
      localStorage.removeItem('pizza_holic_orders');
      loadOrders(selectedStatus);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7ef] text-[#17251c]">
      {/* Admin Navigation */}
      <header className="sticky top-0 z-20 border-b border-[#e1e9db] bg-white px-3 sm:px-4 py-3 shadow-xs">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5eb] text-[#0c6e37] hover:bg-[#d8edd0] transition-colors"
              title="Return to Digital Menu"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-black text-[#17251c]">
                Kitchen & Orders Dashboard
              </h1>
              <p className="text-[11px] sm:text-xs text-[#68716b]">
                Live Kitchen Feed • Urban Slice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetOrders}
              className="rounded-xl border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              title="Reset to demo orders"
            >
              Reset Demo
            </button>
            <button
              onClick={() => loadOrders(selectedStatus)}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 rounded-xl border border-[#d8e2d6] bg-white px-3 py-1.5 text-xs font-bold text-[#16813f] hover:bg-[#f0f5ee] active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-3 sm:px-4 py-5 sm:py-6">
        {/* Status Filters */}
        <div className="mb-6 flex flex-wrap gap-1.5 sm:gap-2">
          {['all', 'pending', 'confirmed', 'preparing', 'completed', 'cancelled'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-[#16813f] text-white shadow-xs'
                    : 'bg-white text-[#37503f] border border-[#dce5d9] hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* Orders Grid / List */}
        {isLoading ? (
          <div className="py-20 text-center text-[#68716b]">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent mb-3" />
            <p className="text-sm font-medium">Loading live kitchen orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cfdecc] bg-white p-8 sm:p-12 text-center text-[#68716b]">
            <h3 className="text-base font-bold text-[#17251c]">No orders found</h3>
            <p className="mt-1 text-xs text-[#68716b]">
              When customers place orders from the digital menu, they will appear here live!
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-xl bg-[#16813f] px-4 py-2 text-xs font-bold text-white hover:bg-[#126e35]"
            >
              Go to Customer Menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => {
              const statusInfo =
                STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const StatusIcon = statusInfo.icon;
              const orderId = order._id || order.orderNumber;

              return (
                <div
                  key={order.orderNumber}
                  className="flex flex-col justify-between rounded-2xl border border-[#e5ece3] bg-white p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#0c6e37]">
                          #{order.orderNumber}
                        </span>
                        <h3 className="mt-0.5 text-base font-bold text-[#17251c]">
                          {order.customerName}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusInfo.bg} ${statusInfo.text}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Customer details */}
                    <div className="mt-2 space-y-1 text-xs text-[#526056] border-y border-[#f2f6f1] py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-emerald-700" />
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="font-semibold text-emerald-800 hover:underline"
                          >
                            {order.customerPhone}
                          </a>
                        </div>
                        <a
                          href={`https://wa.me/91${order.customerPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 rounded-md bg-[#eaf7ee] px-2 py-0.5 text-[11px] font-bold text-[#15803d] hover:bg-[#d3efda]"
                        >
                          <MessageCircle className="h-3 w-3" />
                          <span>Chat</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-1.5 font-medium">
                        <span className="rounded-md bg-[#edf5e9] px-2 py-0.5 text-[11px] font-bold text-[#16813f]">
                          {order.orderType}
                        </span>
                        {order.tableNumber && (
                          <span className="font-bold text-[#17251c]">
                            Table #{order.tableNumber}
                          </span>
                        )}
                      </div>

                      {order.deliveryAddress && (
                        <div className="flex items-start gap-1 text-[11px] text-[#68716b]">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-700 mt-0.5" />
                          <span>{order.deliveryAddress}</span>
                        </div>
                      )}

                      {order.notes && (
                        <div className="mt-1 rounded-lg bg-amber-50 p-1.5 text-[11px] text-amber-800 border border-amber-200/60">
                          <b>Notes:</b> {order.notes}
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div className="mt-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#68716b]">
                        Items ({order.items.length})
                      </h4>
                      <ul className="mt-1.5 space-y-1 text-xs">
                        {order.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between text-[#17251c]"
                          >
                            <span>
                              <span className="font-bold text-emerald-700">
                                {item.qty}×
                              </span>{' '}
                              {item.name}
                              {item.size ? ` (${item.size})` : ''}
                            </span>
                            <span className="font-semibold text-[#68716b]">
                              {formatCurrency(item.subtotal || item.price * item.qty)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer & Status Actions */}
                  <div className="mt-4 pt-3 border-t border-[#edf2ec]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#68716b]">Total</span>
                      <span className="text-base font-black text-[#0c6e37]">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {order.status !== 'confirmed' && order.status !== 'completed' && (
                        <button
                          onClick={() => handleStatusChange(orderId, 'confirmed')}
                          className="flex-1 rounded-lg bg-blue-600 px-2 py-1 text-center text-[11px] font-bold text-white hover:bg-blue-700 cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}
                      {order.status !== 'preparing' && order.status !== 'completed' && (
                        <button
                          onClick={() => handleStatusChange(orderId, 'preparing')}
                          className="flex-1 rounded-lg bg-purple-600 px-2 py-1 text-center text-[11px] font-bold text-white hover:bg-purple-700 cursor-pointer"
                        >
                          Prepare
                        </button>
                      )}
                      {order.status !== 'completed' && (
                        <button
                          onClick={() => handleStatusChange(orderId, 'completed')}
                          className="flex-1 rounded-lg bg-emerald-600 px-2 py-1 text-center text-[11px] font-bold text-white hover:bg-emerald-700 cursor-pointer"
                        >
                          Done
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
