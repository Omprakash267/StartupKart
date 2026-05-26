import { TrendingUp, TrendingDown } from "lucide-react";

const tickerData = [
  { name: "Cotton", price: "₹62,450", change: "+2.4%", up: true },
  { name: "Silk", price: "₹4,850", change: "+1.8%", up: true },
  { name: "Wool", price: "₹1,234", change: "-0.5%", up: false },
  { name: "Jute", price: "₹5,670", change: "+3.2%", up: true },
  { name: "Linen", price: "₹890", change: "-1.2%", up: false },
  { name: "Polyester", price: "₹145", change: "+0.8%", up: true },
  { name: "Nylon", price: "₹178", change: "+1.5%", up: true },
  { name: "Rayon", price: "₹234", change: "-0.3%", up: false },
];

export function PriceTicker() {
  return (
    <div className="glass-card border-t border-white/10 py-4 overflow-hidden">
      <div className="flex animate-ticker">
        {/* Duplicate for seamless loop */}
        {[...tickerData, ...tickerData].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 border-r border-white/10 whitespace-nowrap"
          >
            <span className="font-semibold text-foreground">{item.name}</span>
            <span className="text-muted-foreground">{item.price}/kg</span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                item.up ? "text-green-400" : "text-destructive"
              }`}
            >
              {item.up ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
