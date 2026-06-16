import React from "react";
import { Button } from "../ui/button";       // Relative path to your ui folder
import { Separator } from "../ui/separator"; // Relative path to your ui folder
import { useCart } from "../../context/CartContext"; // Relative path to context
import { Trash2, Minus, Plus } from "lucide-react"; // FIXED: Added missing icon imports
import { Link } from "react-router-dom";

export default function CartItem({ item, isLast }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="relative w-[100px] h-[100px]">
          {/* FIXED: Changed from Next.js <Image> to standard HTML <img> */}
          <img
            src={item.image}
            alt={item.name}
            className="rounded-lg object-cover bg-muted w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <Link to={`/product/${item.id}`}>
                <h2 className="font-semibold text-foreground line-clamp-2">
                  {item.name}
                </h2>
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                disabled={item.quantity <= 1}
                className="h-8 w-8 rounded-r-none"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="px-4 py-2 min-w-[50px] text-center text-sm font-medium">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 rounded-l-none"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-foreground">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {!isLast && <Separator className="mt-4" />}
    </div>
  );
}