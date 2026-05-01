import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import productFormalCollar from "@/assets/product-formal-collar.png";
import productKendrick from "@/assets/product-kendrick.png";
import productOversizeGrey from "@/assets/product-oversize-grey.png";
import productMastersUnion from "@/assets/product-masters-union.png";
import productIndigoIkat from "@/assets/product-indigo-ikat.jpeg";
import productWhiteChikankari from "@/assets/product-white-chikankari.jpeg";
import productMaroonPolka from "@/assets/product-maroon-polka.jpeg";
import productTealDiamond from "@/assets/product-teal-diamond.jpeg";
import productRustOmbre from "@/assets/product-rust-ombre.jpeg";
import productNavyFloral from "@/assets/product-navy-floral.jpeg";

const imageMap: Record<string, string> = {
  "11111111-1111-1111-1111-111111111111": product1,
  "22222222-2222-2222-2222-222222222222": product2,
  "33333333-3333-3333-3333-333333333333": product3,
  "44444444-4444-4444-4444-444444444444": product4,
  "55555555-5555-5555-5555-555555555555": productFormalCollar,
  "66666666-6666-6666-6666-666666666666": productKendrick,
  "77777777-7777-7777-7777-777777777777": productOversizeGrey,
  "88888888-8888-8888-8888-888888888888": productMastersUnion,
  "99999999-9999-9999-9999-999999999991": productIndigoIkat,
  "99999999-9999-9999-9999-999999999992": productWhiteChikankari,
  "99999999-9999-9999-9999-999999999993": productMaroonPolka,
  "99999999-9999-9999-9999-999999999994": productTealDiamond,
  "99999999-9999-9999-9999-999999999995": productRustOmbre,
  "99999999-9999-9999-9999-999999999996": productNavyFloral,
};

const Cart = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, subtotalInr, checkoutUrl } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Note: real promo codes are validated by Shopify at checkout. This is a UI hint.
    setDiscount(promoCode.toUpperCase() === "KALATEET10" ? 10 : 0);
  };

  const discountAmount = (subtotalInr * discount) / 100;
  const total = subtotalInr - discountAmount;

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
    }
  };

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-16 px-4 bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-10">My Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
              <Link to="/collection">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => {
                  const localImg = imageMap[item.product_id] || item.product?.image_url || "/placeholder.svg";
                  return (
                    <div key={item.id} className="flex gap-6 bg-card rounded-xl p-4 shadow-soft">
                      <div className="w-28 h-36 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img src={localImg} alt={item.product?.name || "Product"} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-foreground">{item.product?.name || "Product"}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                          <p className="text-accent font-medium mt-1">₹{(item.product?.price_inr || 0).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-primary transition-smooth"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-soft sticky top-28">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

                  <form onSubmit={handlePromoSubmit} className="mb-6">
                    <label className="text-sm text-muted-foreground block mb-2">Enter promo code</label>
                    <div className="flex gap-2">
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="KALATEET10"
                        className="flex-1 h-11 rounded-lg border-border"
                      />
                      <Button type="submit" variant="outline" className="h-11 px-5 border-border hover:bg-muted">
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && (
                      <p className="text-sm text-green-600 mt-2">{discount}% preview discount — final code applied at checkout.</p>
                    )}
                  </form>

                  <div className="space-y-3 border-t border-border pt-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotalInr.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Preview discount ({discount}%)</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold text-foreground pt-3 border-t border-border">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={!checkoutUrl || loading}
                    className="w-full h-12 mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-smooth"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <span className="inline-flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Secure Checkout</span>
                    )}
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center mt-3">
                    Checkout is securely processed by Shopify.
                  </p>

                  <Link to="/collection" className="block text-center mt-4">
                    <span className="text-sm text-primary hover:text-primary/80 transition-smooth">Continue Shopping</span>
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
