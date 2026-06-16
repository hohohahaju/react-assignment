import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header'; 
import Footer from './components/layout/Footer'; 
import ProductList from './components/home/ProductList'; 

// IMPORT MIGRATED TEMPLATE PAGES
import CartPage from './components/cart/CartItemList'; 
import ContactPage from './components/contact/contactspage'; 
import ProductDetailPage from './components/product/ProductDetailPage'; // 1. IMPORT DETAILED VIEW COMPONENT

// CONNECTED: Import your newly converted JavaScript CartProvider
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          
          {/* Main Content Area */}
          <main className="flex-grow pt-20"> 
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              <Routes>
                {/* Home Route showing your Bloom template products */}
                <Route path="/" element={
                  <>
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900">Welcome to the E-Commerce Store</h1>
                      <p className="mt-2 text-gray-600">Browse our products and enjoy shopping!</p>
                    </div>
                    
                    {/* Your Bloom template product list rendering here */}
                    <ProductList /> 
                  </>
                } />

                {/* REGISTERED CART ROUTE */}
                <Route path="/cart" element={<CartPage />} />

                {/* REGISTERED CONTACT ROUTE */}
                <Route path="/contact" element={<ContactPage />} />

                {/* 2. REGISTER THE DYNAMIC PRODUCT PATH ROUTE */}
                <Route path="/product/:id" element={<ProductDetailPage />} />
              </Routes>

            </div>
          </main>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;