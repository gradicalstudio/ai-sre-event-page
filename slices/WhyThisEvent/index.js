"use client";

import { useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";

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
  const boxRefs = useRef([]);

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
          start: "top 75%",
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
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.9",
        );

      // QUICK DEPTH SEPARATION EFFECT
      gsap.to(iconRefs.current, {
        y: -15,
        delay: 0.9,
        duration: 0.3,
        ease: "power1.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      // GLASS SHINE EFFECT

      boxRefs.current.forEach((box, index) => {
        if (!box) return;

        box.style.position = "relative";
        box.style.overflow = "hidden";

        const reflection = document.createElement("div");

        reflection.className = `
          absolute top-[-40%] left-[-150%]
          h-[240%] w-[45%]
          rotate-[25deg]
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          blur-md
          pointer-events-none
          z-30
          mix-blend-screen
          opacity-0
        `;

        box.appendChild(reflection);

        const animateReflection = () => {
          const distance = box.offsetWidth * 3;

          gsap.fromTo(
            reflection,
            {
              x: 0,
              opacity: 0,
            },
            {
              x: distance,
              opacity: 1,
              duration: 1.2,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(reflection, {
                  x: 0,
                  opacity: 0,
                });

                gsap.delayedCall(Math.random() * 5 + 2, animateReflection);
              },
            },
          );
        };

        // START ONLY WHEN IN VIEWPORT

        ScrollTrigger.create({
          trigger: box,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.delayedCall(index * 0.4, animateReflection);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded className="bg-[#04050F] text-white overflow-hidden">
      <section
        ref={sectionRef}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="overflow-hidden bg-[#04050F] text-white"
      >
        <div className="">
          {/* Heading */}
          <div className="mb-17 flex items-center gap-4 lg:mb-17 md:gap-3">
            <img
              ref={arrowRef}
              src="/new-orange-arrow.svg"
              alt=""
              className="w-3 object-contain opacity-0 md:w-4 lg:w-6"
            />

            <div ref={headingRef} className="opacity-0">
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  heading1: ({ children }) => (
                    <h1 className="text-4xl font-medium leading-[0.95] md:text-[44px] lg:text-6xl">
                      {children}
                    </h1>
                  ),

                  heading2: ({ children }) => (
                    <h2 className="text-3xl font-normal leading-[0.95] md:text-[44px] lg:text-[46px] xl:text-[50px]">
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
                className={`
                  relative
                  opacity-0
                  ${index === 0 ? "pt-0" : "pt-10 md:pt-0"}
                  md:pr-10
                  ${index === 1 ? "xl:-ml-16" : ""}
                  ${index === 2 ? "xl:-ml-32" : ""}
                `}
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
                    ref={(el) => {
                      boxRefs.current[index] = el;
                    }}
                    className="
  group
  relative
  z-10
  flex
  h-full
  w-full
  items-center
  justify-center
  border
  border-white/10
  bg-transparent
transition-all
duration-300
hover:bg-[#0F101F]
"
                  >
                    {/* TOP LEFT */}
                    <img
                      src="/Rectangle 574056928.svg"
                      alt=""
                      className="absolute left-0 top-0 z-20 -rotate-90  transition-all  group-hover:[filter:brightness(0)_saturate(100%)_invert(58%)_sepia(79%)_saturate(1761%)_hue-rotate(330deg)_brightness(101%)_contrast(101%)]"
                    />

                    {/* TOP RIGHT */}
                    <img
                      src="/Rectangle 574056928.svg"
                      alt=""
                      className="absolute right-0 top-0 z-20  transition-all  group-hover:[filter:brightness(0)_saturate(100%)_invert(58%)_sepia(79%)_saturate(1761%)_hue-rotate(330deg)_brightness(101%)_contrast(101%)]"
                    />

                    {/* BOTTOM RIGHT */}
                    <img
                      src="/Rectangle 574056928.svg"
                      alt=""
                      className="absolute bottom-0 right-0 z-20 rotate-90  transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(58%)_sepia(79%)_saturate(1761%)_hue-rotate(330deg)_brightness(101%)_contrast(101%)]"
                    />

                    {/* BOTTOM LEFT */}
                    <img
                      src="/Rectangle 574056928.svg"
                      alt=""
                      className="absolute bottom-0 left-0 z-20 rotate-180  transition-all  group-hover:[filter:brightness(0)_saturate(100%)_invert(58%)_sepia(79%)_saturate(1761%)_hue-rotate(330deg)_brightness(101%)_contrast(101%)]"
                    />

                    {/* Icon Container */}
                    <div className="relative h-17.5 w-17.5 md:h-22.5 md:w-22.5">
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
                {/* Title */}
                <h3 className="mb-4 max-w-[280px] text-[20px] font-medium leading-[1.2] whitespace-pre-line md:mb-5 md:text-[20px] xl:text-[22px] xl:max-w-[230px]">
                  {item.heading}
                </h3>
                {/* Description */}
                <p className="max-w-[320px] text-base leading-relaxed text-white/60 md:text-[15px] lg:text-[16px] xl:max-w-[260px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Bounded>
  );
};

export default WhyThisEvent;
