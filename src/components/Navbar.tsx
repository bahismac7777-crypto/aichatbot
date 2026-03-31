import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import { cn } from "../lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav className="w-full max-w-7xl h-16 flex items-center justify-between px-4 sm:px-8 rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto relative">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -inset-1 bg-brand/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-display uppercase tracking-[2px] font-bold">
            Univo
          </span>
        </Link>

        {/* Navigation Links - Centered Pill (Desktop) */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "relative px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full",
                location.pathname === link.path 
                  ? "text-black" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-brand rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link 
            to="/login"
            className="hidden sm:block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/chat"
            className="relative group flex items-center gap-2 bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-brand transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Chat Now</span>
            <span className="relative z-10 text-base">↗</span>
            <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 p-6 rounded-2xl border border-white/15 bg-black/95 backdrop-blur-3xl shadow-2xl md:hidden flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all",
                      location.pathname === link.path
                        ? "bg-brand text-black"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.name}
                    <ArrowRight className={cn("w-4 h-4", location.pathname === link.path ? "text-black" : "text-white/20")} />
                  </Link>
                ))}
              </div>
              
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <Link
                  to="/login"
                  className="flex items-center justify-center p-4 rounded-xl bg-white/5 text-white font-bold uppercase tracking-widest text-xs"
                >
                  Sign In to Account
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
