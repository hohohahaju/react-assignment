import React from "react";
import { useCart } from "../../context/CartContext"; // Fixed path resolution
import { ShieldCheck, Truck } from "lucide-react";

export default function OrderSummary() {
  const { cart } = useCart();

  // Calculate order metrics inline safely
  const subtotal = cart?.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0) || 0;
  const shipping = subtotal > 150 ? 0 : 9.99; // Free shipping over $150
  const tax = subtotal * 0.08; // 8% Estimated Tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
        </div>

        {shipping > 0 && (
          <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center gap-2.5 text-xs text-gray-500">
            <Truck className="h-4 w-4 text-gray-400 shrink-0" />
            <span>Add <span className="font-semibold text-gray-700">${(150 - subtotal).toFixed(2)}</span> more to unlock free delivery!</span>
          </div>
        )}

        {/* Custom Separator Line */}
        <div className="border-t border-gray-100 my-2" />

        <div className="flex justify-between text-base font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-3.5 px-4 rounded-xl font-medium text-sm transition-colors shadow-md flex items-center justify-center">
        Proceed to Checkout
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4 text-gray-400" />
        <span>Secure checkout encryption active</span>
      </div>
    </div>
  );
}