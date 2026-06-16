import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";       
import { Card, CardContent } from "../ui/card"; 
import { useCart } from "../../context/CartContext"; 
import CartItem from "./CartItem";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function CartItemList() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate(); // Hook to handle manual redirecting

  const handleCheckout = () => {
    // 1. Show a successful alert to the user
    alert("🎉 Order placed successfully! Thank you for your purchase.");
    
    // 2. Clear out the global shopping cart state
    clearCart();
    
    // 3. Redirect the user back to the shop home page automatically
    navigate("/");
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our shop to find great items!
        </p>
        {/* FIXED: Removed Next.js 'asChild' and wrapped button cleanly with Link */}
        <Link to="/">
          <Button className="mt-6">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardContent className="p-6 divide-y divide-border space-y-4">
            {cart.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                isLast={index === cart.length - 1}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Summary Side Block */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Order Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Items count:</span>
                <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground border-t pt-2">
                <span>Total Subtotal:</span>
                <span>
                  ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* FIXED: Connected onClick listener to trigger checkout process */}
            <Button 
              onClick={handleCheckout}
              className="w-full mt-4 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}