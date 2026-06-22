import React from "react";
import { Link } from "react-router-dom"; // Swapped out 'next/link'
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="p-4 bg-orange-50 text-orange-500 rounded-full mb-5">
        <ShoppingBag className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 text-sm max-w-sm mb-8">
        Looks like you haven't added anything to your cart yet. Head back to the store to discover our latest shoe collection!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl text-sm transition-all shadow-md"
      >
        Continue Shopping
      </Link>
    </div>
  );
}