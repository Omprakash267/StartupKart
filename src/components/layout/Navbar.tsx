import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  TrendingUp,
  User,
  Package,
  Heart,
  ShoppingCart,
  LogOut,
  ChevronDown,
  FileText,
  Shield
} from "lucide-react";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Trends", href: "/trends" },
  { name: "Suppliers", href: "/suppliers" },
  { name: "Compare", href: "/compare" },
  { name: "GST Calculator", href: "/gst-calculator" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const isLoggedIn = !!localStorage.getItem("token");
  const userEmail = localStorage.getItem("user_email") || "User";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-card border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group"
        >
          <img
            src="/logo.svg"
            alt="StartupKart Logo"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://t.me/startupkart_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-2 text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 hover:bg-blue-100 rounded-full"
            title="Chat with our AI Bot"
          >
            <TelegramIcon className="w-5 h-5 -ml-0.5 mt-0.5" />
          </a>

          <Link to="/wishlist" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-6 h-6" />
          </Link>

          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cart?.items && cart.items.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {userEmail[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground">{userEmail.split('@')[0]}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isUserMenuOpen && "rotate-180")} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-primary/10 shadow-elevated rounded-2xl py-2 animate-in fade-in slide-in-from-top-2 z-[60]">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" /> Profile Info
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package className="w-4 h-4" /> My Orders
                  </Link>
                  <Link
                    to="/tax-records"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4" /> Tax Records
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" /> Settings
                  </Link>
                  <div className="my-2 border-t border-primary/5" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-gray-300" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="premium" asChild>
                <Link to="/register">Join Us</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-2">
          <Link to="/cart" className="relative p-2 text-white hover:bg-white/5 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cart?.items && cart.items.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
          <button
            className="p-2 rounded-lg text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 glass-card border-t border-white/5 transition-all duration-300 overflow-hidden",
          isMobileOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <a
            href="https://t.me/startupkart_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <TelegramIcon className="w-4 h-4" /> Chat on Telegram
          </a>

          {isLoggedIn && (
            <>
              <div className="my-2 border-t border-white/5" />
              <Link to="/profile" className="px-4 py-3 text-gray-300">Profile</Link>
              <Link to="/cart" className="px-4 py-3 text-gray-300 flex items-center justify-between">
                <span>My Cart</span>
                {cart?.items && cart.items.length > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link to="/orders" className="px-4 py-3 text-gray-300">Orders</Link>
              <Link to="/wishlist" className="px-4 py-3 text-gray-300">Wishlist</Link>
            </>
          )}

          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
            {isLoggedIn ? (
              <Button variant="destructive" className="w-full" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button variant="outline" className="w-full text-white" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="premium" className="w-full" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
