"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function FaqItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const chevronRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // Set initial state without animation
      if (isOpen) {
        gsap.set(contentRef.current, { display: "block", height: "auto", opacity: 1 });
        gsap.set(chevronRef.current, { rotation: 180 });
      } else {
        gsap.set(contentRef.current, { display: "none" });
        gsap.set(chevronRef.current, { rotation: 0 });
      }
      isFirstRender.current = false;
      return;
    }

    // Animate on subsequent changes
    if (isOpen) {
      gsap.set(contentRef.current, { display: "block", height: 0, opacity: 0 });
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(chevronRef.current, { rotation: 180, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(contentRef.current, { display: "none" }),
      });
      gsap.to(chevronRef.current, { rotation: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div
      className="border-t border-white/15 py-8 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          <p className="text-white font-medium text-[16px] lg:text-[24px]">
            {item.title}
          </p>
          <div ref={contentRef} className="overflow-hidden">
            <p className="text-white/60 text-sm lg:text-[18px] leading-relaxed mt-3">
              {item.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 mt-1">
          <svg
            ref={chevronRef}
            width="14"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.349979 9.65005C-0.116798 9.18328 -0.116521 8.42634 0.349979 7.95939L7.95915 0.350187C8.42607 -0.11673 9.1829 -0.11673 9.64981 0.350187L17.2589 7.95939C17.7254 8.42633 17.7258 9.18327 17.2589 9.65005C16.7922 10.1168 16.0352 10.1165 15.5683 9.65005L8.80448 2.88622L2.04065 9.65005C1.57371 10.1165 0.816759 10.1168 0.349979 9.65005Z"
              fill={isOpen ? "#ffffff" : "#3FD9FB"}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}