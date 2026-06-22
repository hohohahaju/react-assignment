import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ProductList from "./components/home/ProductList";
import LoginPage from "./components/auth/LoginPage"; 

// IMPORT THE CART VIEW CONTAINER
import CartPage from "./components/cart/CartPage"; 

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          Welcome to the E-Commerce Store
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                          Browse our products and enjoy shopping!
                        </p>
                      </div>
                      <ProductList searchQuery={searchQuery} />
                    </>
                  } 
                />
                <Route path="/login" element={<LoginPage />} />
                
                {/* NEW CART ENTRY POINT */}
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}