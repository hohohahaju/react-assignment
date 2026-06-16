import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

// FIXED: Locked onto your real products array inside your data folder
import products from "../../data/products";

export default function ProductDetailPage() {
  const { id } = useParams(); // Grabs the product ID directly from the browser URL address bar
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // FIXED: Changed from PRODUCTS_DATA to look inside your real 'products' data array
  // Compares both strings and numbers safely just in case your product IDs are integers
  const product = products?.find((item) => String(item.id) === String(id));

  // Fallback UI if the item ID specified in the URL path string doesn't exist
  if (!product) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-900">Product Not Found</h3>
        <p className="text-gray-500 mt-2">The product you are looking for does not exist or has been moved.</p>
        <Link to="/">
          <Button className="mt-6">Return to Shop Frontend</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Back to storefront navigation anchor */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Side: Product Image Layout Container */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl bg-gray-50"
          />
        </div>

        {/* Right Side: Product Meta and Content Ordering Panels */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.category || "Footwear"}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3">{product.name}</h1>
            
            {/* Reviews / Star Panel section markup wrapper */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-semibold ml-1 text-gray-900">{product.rating || 4.5}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">{product.reviews || 10} customer reviews</span>
            </div>
          </div>

          <div className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            {product.description || "No description available for this template item."}
          </p>

          <hr className="border-gray-100" />

          {/* Action Operations Blocks */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-11">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:text-blue-600 transition-colors font-medium"
              >
                -
              </button>
              <span className="w-10 text-center font-semibold text-sm text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:text-blue-600 transition-colors font-medium"
              >
                +
              </button>
            </div>

            <Button 
              onClick={() => {
                // Add product with specific selected quantity multiplier
                for(let i = 0; i < quantity; i++) {
                  addToCart(product);
                }
                alert(`🛒 Added ${quantity}x ${product.name} to your shopping cart!`);
              }}
              className="flex-1 h-11 flex items-center justify-center gap-2 text-sm font-semibold shadow-sm"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Shopping Cart
            </Button>
          </div>

          {/* Core Trust Seals Metadata grids */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Free delivery over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-blue-600" />
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Secure checkout encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}