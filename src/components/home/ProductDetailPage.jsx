import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`https://sneakers-api-cmkf.onrender.com/get-sneaker/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20">
        <p className="font-medium text-gray-500">Loading product details...</p>
        <p className="text-xs text-gray-400 mt-1">This may take up to 30 seconds on first load.</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-900">Product Not Found</h3>
        <p className="text-gray-500 mt-2">
          The product you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button className="mt-6">Return to Shop</Button>
        </Link>
      </div>
    );

  // API returns image as an array — use first as main, rest as thumbnails
  const mainImage = Array.isArray(product.image) ? product.image[0] : product.image;
  const thumbnails = Array.isArray(product.image) ? product.image.slice(1) : [];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: mainImage,
        description: product.description,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Images */}
        <div className="space-y-3">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded-xl bg-gray-50"
            />
          </div>

          {/* Thumbnail strip — only shown if extra images exist */}
          {thumbnails.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 2}`}
                  className="h-16 w-16 object-contain rounded-lg border border-gray-100 bg-white flex-shrink-0"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.brand || "Footwear"}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-semibold ml-1 text-gray-900">4.5</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">10 customer reviews</span>
              {product.color && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-500">{product.color}</span>
                </>
              )}
            </div>
          </div>

          <div className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            {product.description || "No description available."}
          </p>

          <hr className="border-gray-100" />

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-11">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:text-blue-600 transition-colors font-medium"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-sm text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:text-blue-600 transition-colors font-medium"
              >
                +
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 h-11 flex items-center justify-center gap-2 text-sm font-semibold shadow-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              {added ? "Added to Cart!" : "Add to Shopping Cart"}
            </Button>
          </div>

          {/* Trust badges */}
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
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}