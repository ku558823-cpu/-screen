import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ImageWithFallback } from './ImageWithFallback';
import { ShoppingBag, Star, Plus, Minus, Trash2, ArrowRight, X, Check } from 'lucide-react';

export const StorefrontScreen: React.FC = () => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[2], quantity: 2 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = ['all', 'Audio Equipment', 'Workspace', 'Living & Dining', 'Accessories'];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setOrderPlaced(false);
      setIsCartOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-10">
      {/* Hero Showcase Frame */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="p-8 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Autumn 2026 Studio Collection
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance leading-tight">
                Objects Crafted for Tactile Permanence
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                Engineered from cold-machined titanium, full-grain Italian bridle leather, and solid acoustic timbers. Designed to mature with decades of daily touch.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => addToCart(PRODUCTS[0])}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Acquire Flagship Audio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="text-xs text-slate-500">
                <span>Free Insured Worldwide Freight</span>
                <span className="mx-2">·</span>
                <span>5-Year Studio Warranty</span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-full bg-slate-100">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
              alt="Flagship Planar Acoustic Monitor"
              fallbackTitle="Flagship Audio Showcase"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Filter Bar & Cart Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Objects' : cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4 text-slate-600" />
          <span>Shopping Bag</span>
          <span className="ml-1 px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-[11px]">
            {totalCartCount}
          </span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div
                className="relative aspect-4/3 bg-slate-100 cursor-pointer overflow-hidden"
                onClick={() => setActiveProductModal(product)}
              >
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.title}
                  fallbackTitle={product.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                    {product.badge}
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-medium">
                    Out of Production
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[11px] text-slate-500 font-medium">
                  {product.category}
                </div>
                <h3
                  onClick={() => setActiveProductModal(product)}
                  className="text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
                >
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 pt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-800 font-mono tabular-nums">{product.rating}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 text-[11px]">({product.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <button
                disabled={!product.inStock}
                onClick={() => addToCart(product)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  product.inStock
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-slate-100 relative">
              <ImageWithFallback
                src={activeProductModal.imageUrl}
                alt={activeProductModal.title}
                fallbackTitle={activeProductModal.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{activeProductModal.category}</span>
                  <button
                    onClick={() => setActiveProductModal(null)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{activeProductModal.title}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                    {activeProductModal.rating}
                  </span>
                  <span>·</span>
                  <span>{activeProductModal.reviewsCount} customer audits</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{activeProductModal.description}</p>
                <div className="text-2xl font-bold font-mono text-slate-900 pt-2">
                  ${activeProductModal.price}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  disabled={!activeProductModal.inStock}
                  onClick={() => {
                    addToCart(activeProductModal);
                    setActiveProductModal(null);
                  }}
                  className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
                >
                  {activeProductModal.inStock ? 'Add to Bag' : 'Out of Stock'}
                </button>
                <button
                  onClick={() => setActiveProductModal(null)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Your Shopping Bag</h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} selected
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-6 overflow-y-auto divide-y divide-slate-100 flex-1 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500 font-medium">Your shopping bag is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-semibold text-slate-900 underline"
                    >
                      Browse Studio Collection
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                        <ImageWithFallback
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-0.5 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-mono font-medium text-slate-700">
                          ${item.product.price}
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-semibold text-slate-900 w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-mono tabular-nums font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Freight & Logistics</span>
                      <span className="font-mono tabular-nums text-slate-900">
                        {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Estimated Regional Tax</span>
                      <span className="font-mono tabular-nums text-slate-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Due</span>
                      <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    disabled={orderPlaced}
                    onClick={handleCheckout}
                    className={`w-full py-3 text-xs font-semibold rounded-lg text-white transition-all shadow-xs flex items-center justify-center gap-2 ${
                      orderPlaced ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {orderPlaced ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Order Placed Successfully!</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Studio Acquisition</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
