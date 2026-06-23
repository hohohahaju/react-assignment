import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams(); // Grabs the product ID from the link path
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only the specific item using the ID from the URL
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading product details...</div>;
  if (!product) return <div className="text-center py-20 text-red-500">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back link button */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 no-underline">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Product Image Layout */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-96 object-contain"
          />
        </div>

        {/* Right Side: Information Block */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Category: {product.category}</p>
            <p className="text-2xl font-bold text-gray-900 mt-3">${product.price.toFixed(2)}</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          <button 
            onClick={() => addToCart({
              id: product.id.toString(),
              name: product.title,
              price: product.price,
              image: product.image
            })}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 px-6 rounded-xl font-medium text-sm transition-colors shadow-md flex items-center justify-center gap-2.5"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
}