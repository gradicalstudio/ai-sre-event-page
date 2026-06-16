"use client";

import { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SpeakerTakeaway = ({ slice }) => {
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const headingRef = useRef(null);
  const blocksRef = useRef([]);
  const blockBoxRefs = useRef([]);
  const showSlice = slice?.primary?.show_slice ?? true;
  useEffect(() => {
    if (!showSlice) return;
    const ctx = gsap.context(() => {
      gsap.set(arrowRef.current, { opacity: 0, x: -100 });
      gsap.set(headingRef.current, { opacity: 0, x: 40 });
      gsap.set(blocksRef.current, { opacity: 0, x: -120 });
      const isMobile = window.innerWidth < 767;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 90%" : "top 75%",
          once: true,
        },
      });

      tl.to(arrowRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power4.out",
      })
        .to(
          headingRef.current,
          { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" },
          "-=0.55",
        )
        .to(
          blocksRef.current,
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power4.out" },
          "-=0.9",
        );

      // GLASS SHINE EFFECT
      blockBoxRefs.current.forEach((box, index) => {
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
            { x: 0, opacity: 0 },
            {
              x: distance,
              opacity: 1,
              duration: 1.2,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(reflection, { x: 0, opacity: 0 });
                gsap.delayedCall(Math.random() * 5 + 2, animateReflection);
              },
            },
          );
        };

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
    window.addEventListener("load", () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => ctx.revert();
  }, [showSlice]);

  if (!showSlice) {
    return null;
  }
  return (
    <section
      ref={sectionRef}
      className="bg-[#04050F]   mx-auto w-full max-w-[1000px] xl:max-w-[1280px] 2xl:max-w-[1440px] px-6 md:px-14 mb-20 md:mb-27 lg:mb-20 xl:mb-30 lg:mt-10 xl:mt-15"
    >
      <section
        id="for-speakers"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F] "
      >
        <div className="relative ">
          {/* Corner Decorations */}
          <div className="pointer-events-none absolute inset-0">
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute top-0 left-0 -rotate-90 z-20 w-3 opacity-60 md:w-4"
            />
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute top-0 right-0 z-20 w-3 opacity-60 md:w-4"
            />
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute bottom-0 right-0 rotate-90 z-20 w-3 opacity-60 md:w-4"
            />
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute bottom-0 left-0 rotate-180 z-20 w-3 opacity-60 md:w-4"
            />
          </div>

          <div className="grid grid-cols-1  xl:grid-cols-[1fr_1.7fr]">
            {/* LEFT SIDE */}
            <div className="relative flex items-center p-6 md:p-8 lg:p-5 xl:p-10">
              <div className="absolute left-0 top-0 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)]" />
              <div className="absolute bottom-0 left-0 hidden h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)] lg:block" />
              <div className="absolute left-0 top-0 h-full w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)]" />
              <div className="absolute right-0 top-0 h-full w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)] lg:hidden" />

              <div className="flex items-start gap-5">
                <div className="mt-2 flex-shrink-0">
                  <img
                    ref={arrowRef}
                    src="/new-orange-arrow.svg"
                    alt="Arrow"
                    className="h-7 w-4 object-contain md:h-9 md:w-5 opacity-0"
                  />
                </div>

                <div
                  ref={headingRef}
                  className="w-full xl:max-w-[95%] text-white opacity-0"
                >
                  <PrismicRichText
                    field={slice.primary.heading}
                    components={{
                      heading1: ({ children }) => (
                        <h1 className="text-4xl font-light md:text-4xl lg:text-6xl">
                          {children}
                        </h1>
                      ),
                      heading2: ({ children }) => (
                        <h2 className="text-4xl font-light leading-[1.05] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                          {children}
                        </h2>
                      ),
                      paragraph: ({ children }) => (
                        <p className="text-4xl font-semi-bold md:text-[44px] lg:text-[40px] xl:text-[45px]">
                          {children}
                        </p>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="grid grid-cols-1 border border-white/10 sm:grid-cols-2">
              {slice.primary.blocks?.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    blocksRef.current[index] = el;
                  }}
                  className="
                    border-t border-white/10
                    sm:border-b-0
                    sm:border-l
                    p-3 md:p-4
                    first:border-t-0
                    opacity-0
                  "
                >
                  <div
                    ref={(el) => {
                      blockBoxRefs.current[index] = el;
                    }}
                    className="group  h-full relative grid grid-rows-[60px_3rem_1fr] 2xl:grid-rows-[60px_2rem_1fr] gap-2 z-10"
                  >
                    {item.icon?.url && (
                      <div className="relative h-10 w-20 mt-3">
                        {/* Normal Icon */}
                        <PrismicNextImage
                          field={item.icon}
                          className="
        absolute inset-0 h-full w-full object-contain
        transition-opacity duration-300 
        group-hover:opacity-0
      "
                        />

                        {/* Shadow Icon */}
                        {item.icon_shadow?.url && (
                          <PrismicNextImage
                            field={item.icon_shadow}
                            className="
          absolute inset-0 h-full w-full object-contain
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
                          />
                        )}
                      </div>
                    )}
                    <h3 className="text-[16px] lg:text-base font-semibold text-white">
                      {item.heading}
                    </h3>
                    <p className=" text-[16px] md:text-sm lg:text-base md:mt-2 lg:mt-2 text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SpeakerTakeaway;
