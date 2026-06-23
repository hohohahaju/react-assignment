import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ProductList from "./components/home/ProductList";
import LoginPage from "./components/auth/LoginPage"; 
import CartPage from "./components/cart/CartPage"; 

// 1. IMPORT YOUR EXISTING CONTACT VIEW HERE
import ContactsPage from "./components/contact/contactspage"; 

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProductDetailPage from "./components/home/ProductDetailPage";
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
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                {/* 2. ADD THE ROUTE MATCHING YOUR HEADER LINK */}
                <Route path="/contact" element={<ContactsPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}