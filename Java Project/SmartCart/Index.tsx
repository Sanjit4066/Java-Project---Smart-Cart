import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart as ShoppingCartIcon, Search, Filter } from "lucide-react";
import { products } from "@/data/products";
import { CartItem, Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const shopRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `${product.name} quantity increased`,
        });
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const item = cartItems.find(i => i.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Removed from cart",
      description: `${item?.name} has been removed`,
      variant: "destructive",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout successful!",
      description: "Your order has been placed. Thank you for shopping!",
    });
    setCartItems([]);
    setShowCart(false);
  };

  const handleShopNow = () => {
    shopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <ShoppingCartIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Smart Cart
            </span>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowCart(!showCart)}
            className="relative rounded-xl border-2 hover:shadow-soft transition-all duration-300"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Cart
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-gradient-accent shadow-lg">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="pt-16">
        {/* Hero Section */}
        <Hero onShopNow={handleShopNow} />

        {/* Shopping Section */}
        <section ref={shopRef} className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {showCart ? (
              <div className="max-w-2xl mx-auto animate-fade-in-up">
                <Button
                  variant="ghost"
                  onClick={() => setShowCart(false)}
                  className="mb-6"
                >
                  ← Continue Shopping
                </Button>
                <ShoppingCart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>
            ) : (
              <>
                <div className="max-w-6xl mx-auto mb-12 space-y-6 animate-fade-in-up">
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl md:text-5xl font-bold">
                      <span className="text-foreground">Explore Our </span>
                      <span className="bg-gradient-primary bg-clip-text text-transparent">Products</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Discover amazing products with intelligent recommendations
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 bg-card/60 backdrop-blur-sm border-border rounded-xl"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl border-2 hover:shadow-soft transition-all duration-300"
                    >
                      <Filter className="w-5 h-5 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-xl text-muted-foreground">
                      No products found matching your search.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
