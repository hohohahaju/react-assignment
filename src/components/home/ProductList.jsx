import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://sneakers-api-cmkf.onrender.com/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter on product.name — sneaker API uses 'name' not 'title'
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="text-center py-12">
        <p className="font-medium text-gray-500">Loading fresh kicks...</p>
        <p className="text-xs text-gray-400 mt-1">This may take up to 30 seconds on first load.</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12 text-red-500 font-medium">
        Error: {error}
      </div>
    );

  return (
    <div className="space-y-6">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.image[0], // API returns an array — use first image
                description: product.description,
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