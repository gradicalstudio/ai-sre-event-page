"use client";

import { useState, useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FormModal from "@/components/FormModal";
import Bounded from "@/components/Bounded";
import PrimaryButton from "@/components/PrimaryButton";
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.StageFormatsSlice} StageFormatsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StageFormatsSlice>} StageFormatsProps
 * @type {import("react").FC<StageFormatsProps>}
 */
const StageFormats = ({ slice }) => {
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const sectionRef = useRef(null);
  const stageFormatRef = useRef(null);

  const cardsRef = useRef([]);
  const arrowRef = useRef(null);
  const headingRef = useRef(null);
  const topContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Set Initial States (Using your reference style: clean, consistent offsets)
      gsap.set(arrowRef.current, {
        opacity: 0,
        x: -100,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        x: 40,
      });

      gsap.set(stageFormatRef.current, {
        opacity: 0,
        x: 40, // Match heading direction to prevent conflicting visual patterns
      });

      gsap.set(topContentRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        x: -120, // Match the fast horizontal entry style from your reference
      });

      // 2. Build the ScrollTrigger Timeline (With tighter execution)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Triggers slightly earlier for a faster perceived load on scroll
          once: true,
        },
      });

      // Step A: Swiftly bring in the layout foundations
      tl.to([stageFormatRef.current, arrowRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.6, // Dropped down from 0.9s
        stagger: 0.05,
        ease: "power4.out",
      })
        // Step B: Overlapping Heading drop-in
        .to(
          headingRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power4.out",
          },
          "-=0.45", // Deep overlap
        )
        // Step C: Right content context fade
        .to(
          topContentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.45",
        )
        // Step D: High momentum staggered grid entry matching your blueprint
        .to(
          cardsRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08, // Rapid cascading grid fill
            ease: "power4.out",
          },
          "-=0.65", // Tight overlapping sync block
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded className="bg-[#04050F] text-white overflow-hidden ">
      <section
        id="stage-formats"
        ref={sectionRef}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F] text-white overflow-hidden"
      >
        <div className="">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 mb-10 md:mb-25 xl:mb-17">
            {/* Left Content */}
            <div>
              <p
                ref={stageFormatRef}
                className="text-[#FF6B4A] uppercase text-xs md:text-sm lg:text-xl mb-3 lg:mb-1 font-mono opacity-0"
              >
                {slice.primary.stage_format}
              </p>

              <div className="flex items-center gap-3 lg:gap-3">
                {/* Arrow */}
                <img
                  ref={arrowRef}
                  src="/new-orange-arrow.svg"
                  alt=""
                  className="w-4 md:w-5 lg:w-6 object-contain flex-shrink-0 opacity-0"
                />

                {/* Heading */}
                <div ref={headingRef} className="max-w-[520px] opacity-0">
                  <PrismicRichText
                    field={slice.primary.heading}
                    components={{
                      heading1: ({ children }) => (
                        <h1 className="text-5xl md:text-7xl leading-[0.95] font-medium">
                          {children}
                        </h1>
                      ),
                      heading2: ({ children }) => (
                        <h2 className="text-5xl md:text-7xl leading-[0.95] font-medium">
                          {children}
                        </h2>
                      ),
                      paragraph: ({ children }) => (
                        <p className="text-3xl md:text-[49px] xl:text-[55px] leading-[1.2] ">
                          {children}
                        </p>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div
              ref={topContentRef}
              className="lg:pt-8 flex lg:justify-end opacity-0"
            >
              <div className="max-w-[420px]">
                <PrismicRichText
                  field={slice.primary.short_description}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-white/60 text-base md:text-[16.61px] leading-relaxed mb-7 xl:mb-10">
                        {children}
                      </p>
                    ),
                  }}
                />
                <PrimaryButton
                  buttonText="Interested to Speak"
                  className="text-sm! xl:text-base!"
                  onClick={() => setIsSpeakerOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {slice.primary.blocks.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group relative min-h-[320px] p-8 flex flex-col opacity-0 transition-all duration-300 hover:bg-white/[0.02]"
              >
                {/* Dashed Border */}
                <div className="absolute inset-0 border border-white/10 border-dashed transition-opacity duration-300 group-hover:opacity-0" />

                {/* Solid Border */}
                <div className="absolute inset-0 border-2 border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Corner Decorations */}
                <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {/* TOP LEFT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute top-0 left-0 -rotate-90 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(58%) sepia(79%) saturate(1761%) hue-rotate(330deg) brightness(101%) contrast(101%)",
                    }}
                  />

                  {/* TOP RIGHT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute top-0 right-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(58%) sepia(79%) saturate(1761%) hue-rotate(330deg) brightness(101%) contrast(101%)",
                    }}
                  />
                  {/* BOTTOM RIGHT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute bottom-0 right-0 rotate-90 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(58%) sepia(79%) saturate(1761%) hue-rotate(330deg) brightness(101%) contrast(101%)",
                    }}
                  />
                  {/* BOTTOM LEFT */}
                  <img
                    src="/Rectangle 574056928.svg"
                    alt=""
                    className="absolute bottom-0 left-0 rotate-180 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(58%) sepia(79%) saturate(1761%) hue-rotate(330deg) brightness(101%) contrast(101%)",
                    }}
                  />
                </div>

                {/* Icon */}
                <div className="mb-8 relative z-10">
                  <PrismicNextImage
                    field={item.icon}
                    fallbackAlt=""
                    className="xl:w-10 xl:h-10 object-contain"
                  />
                </div>

                {/* Red Label */}
                <div className="mb-5 relative z-10">
                  <span className="font-mono border border-[#3FD9FB] text-[#3FD9FB] text-xs uppercase tracking-wider px-3 py-1 inline-block">
                    {item.red_block_text}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[22px] font-medium mb-5 relative z-10">
                  {item.title}
                </h3>

                {/* Description */}
                <div className="text-white text-[16px] relative z-10">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FormModal
          type="speaker"
          isOpen={isSpeakerOpen}
          onClose={() => setIsSpeakerOpen(false)}
        />
      </section>
    </Bounded>
  );
};

export default StageFormats;
