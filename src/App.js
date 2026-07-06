import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ProductList from "./components/home/ProductList";
import LoginPage from "./components/auth/LoginPage";
import CartPage from "./components/cart/CartPage";
import ContactsPage from "./components/contact/contactspage";
import ProductDetailPage from "./components/home/ProductDetailPage";
import PrivateRoute from "./components/auth/PrivateRoute";

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
                {/* Public routes — anyone can visit */}
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
                <Route path="/contact" element={<ContactsPage />} />

                {/* Protected routes — login required */}
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <CartPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <PrivateRoute>
                      <ProductDetailPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}