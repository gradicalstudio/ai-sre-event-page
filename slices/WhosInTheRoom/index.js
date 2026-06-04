"use client";

import { useState, useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import InfoCard from "@/components/InfoCard";
import { PrismicRichText } from "@prismicio/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.WhosInTheRoomSlice} WhosInTheRoomSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhosInTheRoomSlice>} WhosInTheRoomProps
 * @type {import("react").FC<WhosInTheRoomProps>}
 */
const WhosInTheRoom = ({ slice }) => {
  const items = slice.primary.info_group;
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation Refs
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  // Auto-playing interval for state updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length]);

  // GSAP Entry Animations Matching Your Standard Blueprint
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Set Initial States (Hidden off-screen elements)
      gsap.set(arrowRef.current, {
        opacity: 0,
        x: -100,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        x: 40,
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        x: -120,
      });
      const isMobile = window.innerWidth < 767;
      // 2. Build the ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "-600px 95%" : "top 75%", // Triggers at standard viewport boundary
          once: true, // One-time execution
        },
      });

      // Step A: Slide and fade in the Arrow
      tl.to(arrowRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power4.out",
      })
        // Step B: Overlapping Heading slide in
        .to(
          headingRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.55", // Overlaps with arrow animation
        )
        // Step C: Overlapping Cards staggered grid entry
        .to(
          cardsRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1, // Smooth swift cascading entry for the card grid
            ease: "power4.out",
          },
          "-=0.9", // Tight overlapping sync block
        );
    }, sectionRef);

    return () => ctx.revert(); // Automatic bulletproof component cleanup
  }, []);

  return (
    <Bounded className="bg-[#04050F] overflow-hidden">
      <section
        ref={sectionRef}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F] overflow-hidden"
      >
        {/* Heading with animated standard arrow */}
        <div className="flex items-center gap-4 lg:mb-17 md:gap-3 mb-17">
          <img
            ref={arrowRef}
            src="/new-orange-arrow.svg"
            alt=""
            className="w-3 md:w-4 lg:w-6 object-contain opacity-0"
          />
          <div
            ref={headingRef}
            className="text-white text-3xl md:text-[38px] xl:text-[42px] font-normal opacity-0"
          >
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        {/* Info Cards Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 lg:gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="md:opacity-0"
            >
              <InfoCard item={item} index={index} activeIndex={activeIndex} />
            </div>
          ))}
        </div>
      </section>
    </Bounded>
  );
};

export default WhosInTheRoom;
