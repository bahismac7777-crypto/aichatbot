"use client";

import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    href?: string;
}

interface BentoGridProps {
    items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
            {items.map((item, index) => {
                const containerClasses = cn(
                    "group relative p-[1px] transition-all duration-500 ease-out",
                    "bg-white/10 hover:bg-gradient-to-br hover:from-brand/50 hover:via-brand/5 hover:to-brand/50",
                    "hover:shadow-[0_0_30px_rgba(190,242,100,0.05)]",
                    "hover:-translate-y-1",
                    item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                    {
                        "bg-gradient-to-br from-brand/50 via-brand/5 to-brand/50 shadow-[0_0_30px_rgba(190,242,100,0.05)] -translate-y-1":
                            item.hasPersistentHover,
                    }
                );

                const Content = (
                    <div className="relative h-full w-full bg-surface p-5 transition-all duration-300 group-hover:bg-surface/95 flex flex-col space-y-4">
                        {/* Background Dots */}
                        <div
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700 pointer-events-none",
                                item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.04)_1px,transparent_1px)] bg-[length:6px_6px]" />
                        </div>

                        {/* Top Row: Icon and Status */}
                        <div className="relative flex items-center justify-between z-10">
                            <div className="w-10 h-10 flex items-center justify-center bg-white/5 group-hover:bg-brand transition-all duration-500">
                                <div className="text-brand group-hover:text-black transition-colors duration-300">
                                    {item.icon}
                                </div>
                            </div>
                            <span
                                className={cn(
                                    "text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 bg-white/5 text-white/40 border border-white/5",
                                    "transition-all duration-300 group-hover:bg-brand/10 group-hover:text-brand group-hover:border-brand/20"
                                )}
                            >
                                {item.status || "Active"}
                            </span>
                        </div>

                        {/* Middle Row: Title and Description */}
                        <div className="relative space-y-2 flex-grow z-10">
                            <h3 className="font-display uppercase tracking-widest text-lg text-white group-hover:text-brand transition-colors duration-300">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-2 text-[10px] text-white/20 font-mono uppercase tracking-normal">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed font-[425]">
                                {item.description}
                            </p>
                        </div>

                        {/* Bottom Row: Tags and CTA */}
                        <div className="relative flex items-center justify-between mt-4 z-10">
                            <div className="flex items-center space-x-2">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-mono uppercase px-2 py-0.5 bg-white/5 text-white/30 border border-white/5"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-brand uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 duration-300">
                                {item.cta || "Explore →"}
                            </span>
                        </div>
                    </div>
                );

                if (item.href) {
                    return (
                        <Link key={index} to={item.href} className={containerClasses}>
                            {Content}
                        </Link>
                    );
                }

                return (
                    <div key={index} className={containerClasses}>
                        {Content}
                    </div>
                );
            })}
        </div>
    );
}

export { BentoGrid }
