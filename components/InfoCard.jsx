"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function InfoCard({
  item,
  index,
  activeIndex,
  onActivate,
  totalItems,
}) {
  const lineRef = useRef(null);
  const lineTwoRef = useRef(null);
  const isActive = activeIndex === index;

  useEffect(() => {
    gsap.killTweensOf(lineRef.current);
    gsap.killTweensOf(lineTwoRef.current);

    if (isActive) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 10, ease: "power2.out" },
      );
      gsap.fromTo(
        lineTwoRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 10,
          ease: "power2.out",
          onComplete: () => {
            onActivate?.((index + 1) % totalItems);
          },
        },
      );
    } else {
      gsap.to(lineRef.current, {
        scaleX: 0,
        duration: 0,
        ease: "power3.inOut",
      });
      gsap.to(lineTwoRef.current, {
        scaleX: 0,
        duration: 0,
        ease: "power3.inOut",
      });
    }
  }, [isActive]);

  return (
    <div
      className="relative flex flex-col w-full h-full  cursor-default transition-colors duration-300"
      style={{
        backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent",
      }}
      onMouseEnter={() => onActivate?.(index)}
    >
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-px bg-orange-500 origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      <div className="flex items-start px-4 py-7.25">
        <span
          className="text-base pr-5 pt-1 transition-opacity duration-300"
          style={{ color: isActive ? "#FF6A50" : "#8F8F8F" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <p
          className="text-base text-pretty xl:text-[20px] leading-tight transition-colors duration-300"
          style={{
            color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
          }}
        >
          {item.info}
        </p>
      </div>

      <div
        ref={lineTwoRef}
        className="absolute bottom-0 left-0 w-full h-px bg-orange-500 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
