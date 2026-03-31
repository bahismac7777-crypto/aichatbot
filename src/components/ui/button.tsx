import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = "primary", 
  size = "md",
  href, 
  children, 
  className, 
  ...props 
}: ButtonProps) {
  const containerClasses = cn(
    "group relative p-[1px] inline-flex transition-all duration-300 ease-out rounded-md overflow-hidden",
    "bg-white/10 hover:bg-gradient-to-br hover:from-brand/50 hover:via-brand/5 hover:to-brand/50",
    "hover:shadow-[0_0_20px_rgba(190,242,100,0.15)]",
    "hover:-translate-y-0.5 active:scale-95",
    className
  );

  const innerClasses = cn(
    "relative w-full h-full rounded-[5px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2",
    size === "sm" && "px-4 py-2 text-[10px]",
    size === "md" && "px-8 py-3 text-sm",
    size === "lg" && "px-10 py-4 text-lg",
    variant === "primary" && "bg-brand text-black hover:bg-brand/90",
    variant === "secondary" && "bg-surface text-white hover:bg-surface/80",
    variant === "outline" && "bg-transparent text-white hover:bg-white/5"
  );

  const content = (
    <div className={innerClasses}>
      {/* Subtle Background Glow for Inner */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.1)_1px,transparent_1px)] bg-[length:4px_4px]" />
      </div>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className={containerClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={containerClasses} {...props}>
      {content}
    </button>
  );
}
