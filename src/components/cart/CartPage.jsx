import { useCart } from "../../context/CartContext";
import CartItemList from "./CartItemList";
import EmptyCart from "./EmptyCart";

export default function CartPage() {
  const { cart } = useCart();

  if (!cart || cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 tracking-tight">
        Shopping Cart
      </h1>
      
      {/* Removed the grid columns so CartItemList can render smoothly on its own */}
      <div className="w-full">
        <CartItemList />
      </div>
    </div>
  );
}