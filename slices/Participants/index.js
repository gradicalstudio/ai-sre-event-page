"use client";

import { useEffect, useRef } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.PartnersSlice} PartnersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PartnersSlice>} PartnersProps
 * @type {import("react").FC<PartnersProps>}
 */
const Partners = ({ slice }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const cellsRef = useRef([]);
  const cornersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(gridRef.current, {
        opacity: 0,
        scale: 0.96,
      });

      gsap.set(cellsRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(cornersRef.current, {
        opacity: 0,
        scale: 0.7,
      });

      // Entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(gridRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          cellsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          cornersRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "back.out(2)",
          },
          "-=0.4",
        );

      // Strong single glass reflection
      cellsRef.current.forEach((cell, index) => {
        // Skip title cell
        if (!cell || index === 0) return;

        cell.style.position = "relative";
        cell.style.overflow = "hidden";

        const reflection = document.createElement("div");

        reflection.className = `
          absolute top-[-40%] left-[-220%]
          h-[240%] w-[45%]
          rotate-[25deg]
          bg-gradient-to-r
          from-transparent
          via-white/35
          to-transparent
          blur-xl
          pointer-events-none
          z-30
          mix-blend-screen
          opacity-0
        `;

        cell.appendChild(reflection);

        const animateReflection = () => {
          const distance = window.innerWidth * (0.7 + Math.random() * 0.5);

          gsap.fromTo(
            reflection,
            {
              x: 0,
              opacity: 0,
            },
            {
              x: distance,
              opacity: 1,
              duration: 1.6 + Math.random() * 0.7,
              ease: "power2.inOut",

              onComplete: () => {
                gsap.set(reflection, {
                  x: 0,
                  opacity: 0,
                });

                gsap.delayedCall(Math.random() * 5 + 1, animateReflection);
              },
            },
          );
        };

        // Random initial timing
        gsap.delayedCall(1 + Math.random() * 4, animateReflection);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#04050F] py-10 md:py-14 overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div ref={gridRef} className="group relative mx-auto w-[94%] max-w-7xl">
        {/* Main Border */}
        <div className="border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {/* Title Cell */}
            <div
              ref={(el) => {
                cellsRef.current[0] = el;
              }}
              className="
                font-mono
                flex min-h-[90px] md:min-h-[110px]
                items-center justify-center
                border-b border-r border-white/20
                px-4
              "
            >
              <h2
                className="
                  text-left uppercase text-[#ff5c35]
                  text-[10px] leading-[1.3]
                  tracking-[0.22em]
                  md:text-[16px]
                "
              >
                Companies
                <br />
                Participating
              </h2>
            </div>

            {/* Top Row */}
            {slice.primary.companies?.slice(0, 3).map((item, index) => (
              <div
                key={`top-${index}`}
                ref={(el) => {
                  cellsRef.current[index + 1] = el;
                }}
                className="
                  flex min-h-[90px] md:min-h-[110px]
                  items-center justify-center
                  border-b border-r border-white/20
                  px-4 md:px-6
                  even:border-r-0 md:even:border-r
                  last:border-r-0
                "
              >
                <PrismicNextLink field={item.link}>
                  <PrismicNextImage
                    field={item.logo}
                    className="
                      h-auto w-[95px]
                      object-contain opacity-90
                      transition-opacity duration-300
                      hover:opacity-100
                      md:w-[150px]
                    "
                  />
                </PrismicNextLink>
              </div>
            ))}

            {/* Bottom Row */}
            {slice.primary.companies?.slice(3, 7).map((item, index) => (
              <div
                key={`bottom-${index}`}
                ref={(el) => {
                  cellsRef.current[index + 4] = el;
                }}
                className="
                  flex min-h-[90px] md:min-h-[110px]
                  items-center justify-center
                  border-r border-white/20
                  px-4 md:px-6
                  even:border-r-0 md:even:border-r
                  last:border-r-0
                "
              >
                <PrismicNextLink field={item.link}>
                  <PrismicNextImage
                    field={item.logo}
                    className="
                      h-auto w-[95px]
                      object-contain opacity-90
                      transition-opacity duration-300
                      hover:opacity-100
                      md:w-[150px]
                    "
                  />
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>

        {/* Corner Decorations */}

        {/* TOP LEFT */}
        <img
          ref={(el) => {
            cornersRef.current[0] = el;
          }}
          src="/Rectangle 574056928.svg"
          alt=""
          className="absolute top-0 left-0 -rotate-90"
        />

        {/* TOP RIGHT */}
        <img
          ref={(el) => {
            cornersRef.current[1] = el;
          }}
          src="/Rectangle 574056928.svg"
          alt=""
          className="absolute top-0 right-0"
        />

        {/* BOTTOM RIGHT */}
        <img
          ref={(el) => {
            cornersRef.current[2] = el;
          }}
          src="/Rectangle 574056928.svg"
          alt=""
          className="absolute bottom-0 right-0 rotate-90"
        />

        {/* BOTTOM LEFT */}
        <img
          ref={(el) => {
            cornersRef.current[3] = el;
          }}
          src="/Rectangle 574056928.svg"
          alt=""
          className="absolute bottom-0 left-0 rotate-180"
        />
      </div>
    </section>
  );
};

export default Partners;
