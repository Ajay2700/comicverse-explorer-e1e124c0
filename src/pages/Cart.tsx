import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCart, updateQuantity, removeFromCart, getCartTotal, clearCart } from "@/utils/cart";
import { CartItem } from "@/utils/cart";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const loadCart = () => {
    setCartItems(getCart());
  };

  const handleUpdateQuantity = (comicId: string, newQuantity: number) => {
    updateQuantity(comicId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (comicId: string, title: string) => {
    removeFromCart(comicId);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`${title} removed from cart`);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
      setIsCheckingOut(false);
      toast.success("Thank you for your simulated order!");
    }, 1500);
  };

  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Start adding some amazing comics to your collection!</p>
            <Link to="/browse">
              <Button size="lg">Browse Comics</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-lg text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.comic.id} className="p-4 gradient-card">
                <div className="flex gap-4">
                  <Link to={`/comic/${item.comic.id}`} className="flex-shrink-0">
                    <img
                      src={item.comic.coverImage}
                      alt={item.comic.title}
                      className="w-24 h-36 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1 space-y-2">
                    <Link to={`/comic/${item.comic.id}`}>
                      <h3 className="font-bold hover:text-primary transition-colors">
                        {item.comic.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.comic.publisher}</p>
                    <p className="text-lg font-bold text-primary">
                      ${item.comic.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleUpdateQuantity(item.comic.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleUpdateQuantity(item.comic.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(item.comic.id, item.comic.title)}
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 gradient-card sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full shadow-glow"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
              <Link to="/browse">
                <Button variant="ghost" className="w-full mt-2">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
