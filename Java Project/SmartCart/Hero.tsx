import { ShoppingCart, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Main headline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-soft">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Welcome to the Future of Shopping</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Smart Cart</span>
            <br />
            <span className="text-foreground">Shopping Reimagined</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of retail with accelerated checkout, intelligent recommendations, 
            and effortless cart management—all in one seamless platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-xl"
              onClick={onShopNow}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-card/80 backdrop-blur-sm transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
            <div className="p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border shadow-soft hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Instant checkout with digital payment integration</p>
            </div>

            <div className="p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border shadow-soft hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Personalized recommendations based on your preferences</p>
            </div>

            <div className="p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border shadow-soft hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Safe</h3>
              <p className="text-sm text-muted-foreground">Protected transactions with advanced security</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
