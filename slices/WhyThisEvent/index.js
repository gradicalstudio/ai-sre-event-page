"use client";

import { useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.WhyThisEventSlice} WhyThisEventSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhyThisEventSlice>} WhyThisEventProps
 * @type {import("react").FC<WhyThisEventProps>}
 */
const WhyThisEvent = ({ slice }) => {
  const sectionRef = useRef(null);

  const arrowRef = useRef(null);
  const headingRef = useRef(null);

  const cardsRef = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial States
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

      // Main icon starts merged with shadow
      gsap.set(iconRefs.current, {
        y: -5,
      });

      // ONE TIME INTRO ANIMATION
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          once: true,
        },
      });

      // Arrow
      tl.to(arrowRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power4.out",
      })

        // Heading
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

        // Cards
        .to(
          cardsRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: "power4.out",
          },
          "-=0.35",
        );

      // QUICK DEPTH SEPARATION EFFECT
      gsap.to(iconRefs.current, {
        y: -15,

        duration: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 25%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-[#04050F] px-6 py-14 text-white md:px-14 xl:px-20"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mb-10 flex items-center gap-4 md:mb-20 md:gap-3">
          <img
            ref={arrowRef}
            src="/arrow.svg"
            alt=""
            className="w-3 object-contain opacity-0 md:w-4 lg:w-10"
          />

          <div ref={headingRef} className="opacity-0">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-4xl font-medium leading-[0.95] md:text-6xl">
                    {children}
                  </h1>
                ),

                heading2: ({ children }) => (
                  <h2 className="text-3xl font-medium leading-[0.95] md:text-5xl">
                    {children}
                  </h2>
                ),

                paragraph: ({ children }) => (
                  <p className="text-4xl font-medium leading-[0.95] md:text-5xl">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 lg:gap-7 md:grid-cols-3 md:gap-0">
          {slice.primary.event_features.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="
                relative
                py-6
                opacity-0
                md:py-10
                md:pr-10
              "
            >
              {/* Icon + Connected Lines */}
              <div className="relative mb-8 h-[120px] w-[120px] md:mb-10 md:h-[140px] md:w-[140px]">
                {/* TOP LEFT LINE */}
                <div className="absolute left-0 right-full top-0 hidden h-px w-[500px] bg-white/10 md:block" />

                {/* TOP RIGHT LINE */}
                <div className="absolute left-full top-0 hidden h-px w-[500px] bg-white/10 md:block" />

                {/* BOTTOM LEFT LINE */}
                <div className="absolute left-0 right-full bottom-0 hidden h-px w-[500px] bg-white/10 md:block" />

                {/* BOTTOM RIGHT LINE */}
                <div className="absolute left-full bottom-0 hidden h-px w-[500px] bg-white/10 md:block" />

                {/* Icon Box */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    border
                    border-white/10
                    bg-[#0F101F]
                  "
                >
                  {/* TOP LEFT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute left-0 top-0 z-20 -rotate-90"
                  />

                  {/* TOP RIGHT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute right-0 top-0 z-20"
                  />

                  {/* BOTTOM RIGHT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute bottom-0 right-0 z-20 rotate-90"
                  />

                  {/* BOTTOM LEFT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute bottom-0 left-0 z-20 rotate-180"
                  />

                  {/* Icon Container */}
                  <div className="relative h-[70px] w-[70px] md:h-[90px] md:w-[90px]">
                    {/* Orange Shadow */}
                    <PrismicNextImage
                      field={item.icon_shadow}
                      fallbackAlt=""
                      className="
                        absolute
                        left-0
                        top-0
                        z-0
                        h-full
                        w-full
                        object-contain
                        opacity-100
                      "
                    />

                    {/* Main Icon */}
                    <PrismicNextImage
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      field={item.icon}
                      fallbackAlt=""
                      className="
                        absolute
                        left-0
                        top-0
                        z-10
                        h-full
                        w-full
                        object-contain
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-4 max-w-[280px] text-2xl font-medium leading-[1] md:mb-5 md:text-3xl">
                {item.heading}
              </h3>

              {/* Description */}
              <p className="max-w-[320px]  text-base leading-relaxed text-white/60 md:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisEvent;
