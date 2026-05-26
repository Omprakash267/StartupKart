import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, TrendingUp, Sparkles } from "lucide-react";
import { PriceTicker } from "./PriceTicker";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-background" />

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" style={{ animationDelay: "4s" }} />

        {/* Floating Textile Elements */}
        <div className="absolute top-20 right-[15%] w-24 h-24 glass-card rounded-2xl float-animation flex items-center justify-center opacity-60">
          <span className="text-3xl">🧵</span>
        </div>
        <div className="absolute top-1/3 left-[10%] w-20 h-20 glass-card rounded-2xl float-animation-delayed flex items-center justify-center opacity-60" style={{ animationDelay: "-2s" }}>
          <span className="text-2xl">🪡</span>
        </div>
        <div className="absolute bottom-1/4 right-[20%] w-28 h-28 glass-card rounded-2xl float-animation flex items-center justify-center opacity-60" style={{ animationDelay: "-4s" }}>
          <span className="text-4xl">🧶</span>
        </div>
        <div className="absolute top-1/2 left-[20%] w-16 h-16 glass-card rounded-xl float-animation-delayed flex items-center justify-center opacity-50" style={{ animationDelay: "-1s" }}>
          <span className="text-xl">✂️</span>
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,120,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,120,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">India's #1 Textile Business Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Start Your Business
            <br />
            <span className="gradient-text text-glow">Smarter</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Access real-time textile market prices, 10-year trends, GST calculations,
            and AI-powered insights. Everything you need to make smarter business decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/register" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/products" className="group">
                <Play className="w-5 h-5 mr-1" />
                Explore Products
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            {[
              { value: "10K+", label: "Active Users" },
              { value: "₹500Cr+", label: "Transactions" },
              { value: "50+", label: "Textile Types" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 rounded-xl card-hover">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Ticker */}
      <div className="absolute bottom-0 left-0 right-0">
        <PriceTicker />
      </div>
    </section>
  );
}
