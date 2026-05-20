"use client";

import { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@prismicio/react";

import Marquee from "react-fast-marquee";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.SectorsRepresentedSlice} SectorsRepresentedSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectorsRepresentedSlice>} SectorsRepresentedProps
 * @type {import("react").FC<SectorsRepresentedProps>}
 */
const SectorsRepresented = ({ slice }) => {
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const headingRef = useRef(null);
  const marqueeContainerRef = useRef(null);

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

      gsap.set(marqueeContainerRef.current, {
        opacity: 0,
        x: -120,
      });

      // 2. Build the ScrollTrigger Timeline matching your standard
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Step A: Arrow Entry
      tl.to(arrowRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power4.out",
      })
        // Step B: Overlapping Heading Entry
        .to(
          headingRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.55",
        )
        // Step C: Overlapping Marquee Entry
        .to(
          marqueeContainerRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power4.out",
          },
          "-=0.9",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded className="bg-[#04050F] overflow-hidden">
      <section
        ref={sectionRef}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F] flex flex-col lg:flex-row lg:items-center gap-16 md:gap-10 lg:gap-8 overflow-hidden"
      >
        {/* LEFT — Fixed heading */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            ref={arrowRef}
            className="w-3 md:w-4 lg:w-6 object-contain opacity-0"
            src="/arrow.svg"
          />
          <div
            ref={headingRef}
            className="text-white text-3xl md:text-[38px] lg:text-[38px] font-medium opacity-0"
          >
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        {/* RIGHT — Marquee */}
        <div
          ref={marqueeContainerRef}
          className="relative w-full lg:flex-1 min-w-0 overflow-hidden opacity-0"
        >
          <Marquee speed={105} gradient={false} className="overflow-hidden">
            {slice.primary.marquee.map((item, index) => (
              <span key={index} className="flex items-center gap-4 px-4">
                <span className="text-white/80 text-[18px] lg:text-[24.26px] whitespace-nowrap leading-none">
                  {item.partners}
                </span>
                <img className="w-1 lg:w-2 object-contain" src="/bullet.svg" />
              </span>
            ))}
          </Marquee>
          {/* LEFT FADE */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-24 lg:w-32 bg-gradient-to-r from-[#04050F] to-transparent z-10" />

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-24 lg:w-32 bg-gradient-to-l from-[#04050F] to-transparent z-10" />
        </div>
      </section>
    </Bounded>
  );
};

export default SectorsRepresented;
