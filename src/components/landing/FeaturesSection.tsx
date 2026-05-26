import {
  TrendingUp,
  Calculator,
  BarChart3,
  ShoppingCart,
  Globe,
  Shield,
  Zap,
  Brain
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Prices",
    description: "Live market prices for cotton, silk, wool, jute, and 50+ textile materials updated every minute.",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    icon: BarChart3,
    title: "10-Year Trends",
    description: "Comprehensive historical data and trend analysis to predict market movements accurately.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Calculator,
    title: "GST Calculator",
    description: "Instant SGST, CGST, and IGST calculations with export-ready invoice generation.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Machine learning powered predictions and personalized business recommendations.",
    gradient: "from-orange-400 to-red-500",
  },
  {
    icon: ShoppingCart,
    title: "Smart Procurement",
    description: "Compare suppliers, negotiate prices, and manage your entire supply chain effortlessly.",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: Globe,
    title: "Export Tools",
    description: "Calculate export costs, duties, and shipping estimates for international trade.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-grade security with multiple payment options including UPI, cards, and net banking.",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: Zap,
    title: "Instant Reports",
    description: "Generate professional tax reports, invoices, and analytics in seconds.",
    gradient: "from-yellow-400 to-orange-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 mesh-background opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools designed specifically for textile businesses.
            From market analysis to tax compliance, we've got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              variant="glass"
              className="group card-hover cursor-pointer"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
