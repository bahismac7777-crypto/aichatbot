import { motion } from "motion/react";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <svg
        viewBox="20 20 60 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* The lime green chat bubble shape */}
        <path
          d="M25 20L75 20V65L60 80L25 80V20Z"
          fill="#bef264"
          className="hidden"
        />
        {/* Replicating the specific shape from the image */}
        <path
          d="M30 35H70V75L55 85L30 85V35Z"
          fill="#bef264"
          className="hidden"
        />
        
        {/* Let's try to draw the exact shape: 
            It looks like a rectangle with two corners cut/extended.
            Top left has a triangle pointing up.
            Bottom right has a triangle pointing down.
        */}
        <path
          d="M20 35V75H40V90L60 75H80V35H60V20L40 35H20Z"
          fill="#bef264"
        />
        
        {/* Two black dots (eyes) */}
        <circle cx="38" cy="55" r="5" fill="black" />
        <circle cx="58" cy="55" r="5" fill="black" />
      </svg>
    </div>
  );
}
