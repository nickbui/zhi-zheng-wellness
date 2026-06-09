/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, ShieldCheck, Mail, Globe, MapPin, CheckCircle2, ChevronRight, Plus, Minus } from "lucide-react";
import { PRODUCTS } from "../data";
import { Product } from "../types";

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function StoreModal({ isOpen, onClose }: StoreModalProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<"browse" | "checkout" | "success">("browse");
  
  // Checkout Form State
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "United States"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prevCart];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => {
    const rawPrice = parseFloat(item.product.price.replace("$", ""));
    return acc + rawPrice * item.quantity;
  }, 0);

  const shippingCost = subtotal > 35 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 1500);
  };

  const clearCartAndReset = () => {
    setCart([]);
    setStep("browse");
    setShippingData({ name: "", email: "", address: "", city: "", zip: "", country: "United States" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-background rounded-[28px] overflow-hidden soft-shadow border border-outline/10 h-[90vh] md:h-auto max-h-[92vh] flex flex-col z-10 text-[#1a1c1b]">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline/10 bg-surface-container-low">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={20} />
            <h3 className="font-serif text-xl text-primary font-semibold">Collective Store</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Panels according to state */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar">
          <AnimatePresence mode="wait">
            
            {/* BROWSE STATE */}
            {step === "browse" && (
              <motion.div 
                key="browse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Products List columns (Left) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-outline/5 pb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a96245]">Mindfulness Catalog</span>
                    <h4 className="font-serif text-lg font-bold text-on-surface">Available Books &amp; Resources</h4>
                  </div>

                  <div className="space-y-6">
                    {PRODUCTS.map((prod) => (
                      <div 
                        key={prod.id}
                        className="flex flex-col sm:flex-row gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline/5 shadow-sm"
                      >
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container border border-outline/5 self-center">
                          <img 
                            referrerPolicy="no-referrer"
                            src={prod.image} 
                            alt={prod.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <h5 className="font-serif text-base font-bold text-on-surface leading-tight">{prod.title}</h5>
                              <span className="text-xs font-bold text-primary font-sans">{prod.price}</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-tertiary block font-sans">
                              {prod.subtitle}
                            </span>
                            <p className="text-xs text-on-surface-variant font-sans line-clamp-3 leading-relaxed mt-1">
                              {prod.description}
                            </p>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => addToCart(prod)}
                              className="bg-primary text-on-primary px-4 py-1.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
                            >
                              Add to Basket
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shopping Basket Columns (Right) */}
                <div className="lg:col-span-5 bg-surface-container-low/60 rounded-3xl p-6 border border-outline/5 h-fit space-y-4">
                  <h4 className="font-serif text-base font-bold text-on-surface border-b border-outline/10 pb-2">
                    Shopping Basket ({cart.reduce((a, b) => a + b.quantity, 0)})
                  </h4>

                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-xs text-on-surface-variant font-sans space-y-2">
                      <ShoppingBag className="mx-auto text-outline" size={28} />
                      <p>Your basket is currently empty.</p>
                      <p className="text-[10px] opacity-75">Click &ldquo;Add to Basket&rdquo; to add beautiful items from our catalog.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="max-h-[220px] overflow-y-auto pr-1 space-y-3 scrollbar">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex gap-3 items-center justify-between text-xs font-sans pb-3 border-b border-outline/5">
                            <div className="flex-1 min-w-0 pr-2">
                              <span className="font-bold text-on-surface truncate block font-serif">{item.product.title}</span>
                              <span className="text-[10px] text-secondary font-sans">{item.product.price} each</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-1.5 py-0.5">
                                <button onClick={() => updateQuantity(item.product.id, -1)} className="p-0.5 text-secondary hover:text-on-surface">
                                  <Minus size={11} />
                                </button>
                                <span className="font-bold text-[11px] min-w-[12px] text-center font-mono">{item.quantity}</span>
                                <button onClick={() => addToCart(item.product)} className="p-0.5 text-secondary hover:text-on-surface">
                                  <Plus size={11} />
                                </button>
                              </div>
                              <button onClick={() => removeFromCart(item.product.id)} className="text-outline hover:text-error p-1">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 border-t border-outline/10 pt-3 text-xs font-sans text-on-surface-variant">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-mono text-on-surface font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span className="font-mono text-on-surface font-semibold">
                            {shippingCost === 0 ? "Free Shipping" : `$${shippingCost.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-outline/5 pt-2 text-sm font-semibold font-serif text-on-surface">
                          <span>Total Amount:</span>
                          <span className="font-mono text-primary font-bold">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setStep("checkout")}
                          className="w-full bg-[#8c4a2f] hover:opacity-90 text-[#ffffff] py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 hover:shadow-sm transition-all duration-300"
                        >
                          <span>Proceed to checkout</span>
                          <ChevronRight size={14} />
                        </button>
                        <p className="text-[10px] text-center text-on-surface-variant font-sans mt-2">
                          Free physical shipping on orders above $35.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* CHECKOUT STATE */}
            {step === "checkout" && (
              <motion.div 
                key="checkout"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-2xl mx-auto py-2"
              >
                <h4 className="font-serif text-xl font-bold text-on-surface mb-6 text-center">Shipping &amp; Delivery Alignment</h4>
                
                <form onSubmit={handleCheckoutSubmit} className="space-y-5 bg-surface-container-low/50 p-6 rounded-3xl border border-outline/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="block text-secondary font-semibold">Full Name:</label>
                      <input
                        type="text"
                        required
                        value={shippingData.name}
                        onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-xl px-3 py-2.5 text-xs font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-secondary font-semibold">Email Address:</label>
                      <input
                        type="email"
                        required
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-xl px-3 py-2.5 text-xs font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-sans">
                    <label className="block text-secondary font-semibold">Delivery Address:</label>
                    <input
                      type="text"
                      required
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      placeholder="123 Serenity Park Lane"
                      className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-xl px-3 py-2.5 text-xs font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="block text-secondary font-semibold">City:</label>
                      <input
                        type="text"
                        required
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        placeholder="Seattle"
                        className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-xl px-3 py-2.5 text-xs font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-secondary font-semibold">Zip / Postal:</label>
                      <input
                        type="text"
                        required
                        value={shippingData.zip}
                        onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                        placeholder="98101"
                        className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-xl px-3 py-2.5 text-xs font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-secondary font-semibold">Country:</label>
                      <select
                        value={shippingData.country}
                        onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                        className="w-full bg-[#ffffff] border-outline/25 focus:border-primary focus:ring-0 rounded-xl px-3 py-2 focus:outline-none text-xs font-sans"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                        <option>Singapore</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary before payment */}
                  <div className="border-t border-outline/10 pt-4 text-xs font-sans flex justify-between items-center text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="text-primary" size={14} />
                      <span>Security committed. Mock payment processing</span>
                    </span>
                    <span>Total due: <strong className="text-primary text-sm font-mono">${total.toFixed(2)}</strong></span>
                  </div>

                  <div className="flex gap-4 pt-4 font-sans text-xs">
                    <button
                      type="button"
                      onClick={() => setStep("browse")}
                      className="flex-1 border border-outline py-3 rounded-full font-bold uppercase tracking-wider hover:bg-surface-container-high text-on-surface transition-colors"
                    >
                      Back to basket
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-on-primary py-3 rounded-full font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? "Dispatching Reservation..." : "Submit Pre-order"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* SUCCESS STATE */}
            {step === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto space-y-5"
              >
                <CheckCircle2 size={56} className="text-primary" />
                <h3 className="font-serif text-2xl text-on-surface font-semibold">Commit Completed ✓</h3>
                
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Success! Your pre-order has been safely indexed. An automated receipt and tracking configuration details have been compiled and sent to <span className="font-bold text-primary">{shippingData.email}</span>.
                </p>

                <div className="w-full bg-surface-container-low border border-outline/10 rounded-2xl p-4 text-left text-xs font-sans space-y-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-secondary border-b border-outline/5 pb-1">
                    <span>Invoice Details</span>
                    <span className="text-primary font-mono">Paid (Simulated)</span>
                  </div>
                  <div className="pt-1 select-all font-mono">Invoice Ref: INV-{Math.floor(Date.now() / 10000)}</div>
                  <div>Carrier Target: {shippingData.name}</div>
                  <div className="indent-0">Target Address: {shippingData.address}, {shippingData.city} (Zip {shippingData.zip})</div>
                  <div className="text-right border-t border-outline/5 pt-1 mt-1 font-serif font-bold text-on-surface">
                    Debited Subtotal: ${total.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={clearCartAndReset}
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all"
                >
                  Return to Main Sanctuary
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
