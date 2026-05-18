"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function InfoCard({ item, index }) {
  const lineRef = useRef(null);
  useEffect(() => {
    if (window.innerWidth < 1024) {
      gsap.set(lineRef.current, { scaleX: 1 });
    } else {
      gsap.set(lineRef.current, { scaleX: 0 });
    }
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth < 1024) return;
    gsap.killTweensOf(lineRef.current);
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return;
    gsap.killTweensOf(lineRef.current);
    gsap.to(lineRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <div
      className="relative flex flex-col gap-4 pt-6 cursor-default group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />

      {/* Orange fill line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-px bg-orange-500 origin-left"
      />

      {/* Number - sits ON the line */}
      <span className="absolute -top-3.5 left-0 text-white/90 text-sm bg-[#04050F] pr-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Info text */}
      <p className="text-white lg:text-white/40 text-lg lg:text-xl leading-relaxed lg:group-hover:text-white/90 transition-colors duration-300">
        {item.info}
      </p>
    </div>
  );
}
