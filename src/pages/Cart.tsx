import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, image: product1, name: "Oversize Red", price: 3299, quantity: 1 },
    { id: 2, image: product2, name: "Olive Green Floral", price: 3899, quantity: 2 },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock promo code logic
    if (promoCode.toUpperCase() === "KALATEET10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-10">
            My Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
              <Link to="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 bg-card rounded-xl p-4 shadow-soft"
                  >
                    <div className="w-28 h-36 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-accent font-medium mt-1">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-primary transition-smooth"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-soft sticky top-28">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>

                  {/* Promo Code */}
                  <form onSubmit={handlePromoSubmit} className="mb-6">
                    <label className="text-sm text-muted-foreground block mb-2">
                      Enter promo code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="KALATEET10"
                        className="flex-1 h-11 rounded-lg border-border"
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className="h-11 px-5 border-border hover:bg-muted"
                      >
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        {discount}% discount applied!
                      </p>
                    )}
                  </form>

                  {/* Order Breakdown */}
                  <div className="space-y-3 border-t border-border pt-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold text-foreground pt-3 border-t border-border">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full h-12 mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-smooth">
                    Proceed to Checkout
                  </Button>

                  <Link to="/" className="block text-center mt-4">
                    <span className="text-sm text-primary hover:text-primary/80 transition-smooth">
                      Continue Shopping
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
