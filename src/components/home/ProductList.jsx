import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; 

// FIXED: Receives the global header search query directly as a prop
export default function ProductList({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/search?q=shoes")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filters the live array in real time using the query typing from the top header
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center py-12 font-medium text-gray-500">Loading fresh kicks...</div>;
  if (error) return <div className="text-center py-12 text-red-500 font-medium">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id.toString(),
                name: product.title, 
                price: product.price,
                image: product.thumbnail, 
                description: product.description
              }} 
        />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No shoes found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}