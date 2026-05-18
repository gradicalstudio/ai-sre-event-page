"use client";

import { useState, useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FormModal from "@/components/FormModal";
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.StageFormatsSlice} StageFormatsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StageFormatsSlice>} StageFormatsProps
 * @type {import("react").FC<StageFormatsProps>}
 */
const StageFormats = ({ slice }) => {
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const sectionRef = useRef(null);

  const cardsRef = useRef([]);
  const arrowRef = useRef(null);
  const headingRef = useRef(null);
  const topContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial States
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 80,
        x: 45,
        scale: 0.92,
      });

      gsap.set(arrowRef.current, {
        opacity: 0,
        x: -120,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 40,
        x: 20,
      });

      gsap.set(topContentRef.current, {
        opacity: 0,
        y: 30,
      });

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 58%",
          once: true,
        },
      });

      // Arrow
      tl.to(arrowRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
      })

        // Heading
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.2",
        )

        // Right content
        .to(
          topContentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.6",
        )

        // Cards
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stage-formats"
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#04050F] text-white py-16 px-6 md:px-10 xl:px-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-25">
          {/* Left Content */}
          <div>
            <p className="text-[#FF6B4A] uppercase text-xs md:text-sm lg:text-xl mb-3 lg:mb-6 font-mono">
              {slice.primary.stage_format}
            </p>

            <div className="flex items-center gap-3 lg:gap-6">
              {/* Arrow */}
              <img
                ref={arrowRef}
                src="/arrow.svg"
                alt=""
                className="w-4 md:w-5 lg:w-10 object-contain flex-shrink-0"
              />

              {/* Heading */}
              <div ref={headingRef} className="max-w-[520px]">
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
                      <p className="text-3xl md:text-5xl leading-[1.2] lg:leading-[0.95] font-medium">
                        {children}
                      </p>
                    ),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div ref={topContentRef} className="lg:pt-8 flex lg:justify-end">
            <div className="max-w-[420px]">
              <PrismicRichText
                field={slice.primary.short_description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-10">
                      {children}
                    </p>
                  ),
                }}
              />
              <button
                onClick={() => setIsSpeakerOpen(true)}
                className="bg-[#57D9FF] text-black px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(87,217,255,0.3)]"
              >
                Interested to Speak
              </button>
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
                  className="absolute top-0 left-0 -rotate-90 z-20"
                />

                {/* TOP RIGHT */}
                <img
                  src="/Rectangle 574056928.svg"
                  alt=""
                  className="absolute top-0 right-0 z-20"
                />

                {/* BOTTOM RIGHT */}
                <img
                  src="/Rectangle 574056928.svg"
                  alt=""
                  className="absolute bottom-0 right-0 rotate-90 z-20"
                />

                {/* BOTTOM LEFT */}
                <img
                  src="/Rectangle 574056928.svg"
                  alt=""
                  className="absolute bottom-0 left-0 rotate-180 z-20"
                />
              </div>

              {/* Icon */}
              <div className="mb-8 relative z-10">
                <PrismicNextImage
                  field={item.icon}
                  fallbackAlt=""
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Red Label */}
              <div className="mb-5 relative z-10">
                <span className="font-mono border border-[#FF6B4A] text-[#FF6B4A] text-xs uppercase tracking-wider px-3 py-1 inline-block">
                  {item.red_block_text}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-medium mb-5 relative z-10">
                {item.title}
              </h3>

              {/* Description */}
              <div className="text-white text-lg relative z-10">
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
  );
};

export default StageFormats;
