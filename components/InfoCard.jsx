"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function InfoCard({ item, index, activeIndex }) {
  const lineRef = useRef(null);
  const isActive = activeIndex === index;

  useEffect(() => {
    if (isActive) {
      // Animate line in
      gsap.killTweensOf(lineRef.current);
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      // Animate line out
      gsap.killTweensOf(lineRef.current);
      gsap.to(lineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <div className="relative flex flex-col gap-4 pt-6 cursor-default">
      {/* Default top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />

      {/* Orange fill line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-px bg-orange-500 origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Number - sits ON the line */}
      <span
        className="absolute -top-3.5 left-0 text-white/90 text-sm bg-[#04050F] pr-2 transition-opacity duration-300"
        style={{ opacity: isActive ? 1 : 0 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Info text */}
      <p
        className="text-lg lg:text-xl leading-relaxed transition-colors duration-300"
        style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)" }}
      >
        {item.info}
      </p>
    </div>
  );
}