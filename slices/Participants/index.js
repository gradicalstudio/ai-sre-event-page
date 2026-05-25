"use client";

import { useEffect, useRef, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";

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

  // Responsive state tracker matching standard Tailwind md breakpoint (768px)
  const [isDesktop, setIsDesktop] = useState(false);

  cellsRef.current = [];

  useEffect(() => {
    // 1. RESPONSIVE BREAKPOINT LISTENER
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Set initial layout state
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // 2. GSAP INTERACTIVE GRAPHICS TIMELINE
    const ctx = gsap.context(() => {
      const validCells = cellsRef.current.filter(Boolean);

      gsap.set(gridRef.current, {
        opacity: 0,
        scale: 0.96,
      });

      gsap.set(validCells, {
        opacity: 0,
        y: 20,
      });

      gsap.set(cornersRef.current, {
        opacity: 0,
        scale: 0.7,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(gridRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          validCells,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          cornersRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: "back.out(1.5)",
          },
          "-=0.3",
        );

      // Glass reflection looping mechanics
      validCells.forEach((cell, index) => {
        if (!cell || index === 0) return;

        cell.style.position = "relative";
        cell.style.overflow = "hidden";

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

        cell.appendChild(reflection);

        const animateReflection = () => {
          const cellWidth = cell.offsetWidth;
          const distance = cellWidth * 3;

          gsap.fromTo(
            reflection,
            {
              x: 0,
              opacity: 0,
            },
            {
              x: distance,
              opacity: 1,
              duration: 1.2 + Math.random() * 0.5,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(reflection, { x: 0, opacity: 0 });
                gsap.delayedCall(Math.random() * 6 + 2, animateReflection);
              },
            },
          );
        };

        gsap.delayedCall(1 + Math.random() * 4, animateReflection);
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const companies = slice.primary.companies || [];
  const topCompanies = companies.slice(0, 3);
  const bottomCompanies = companies.slice(3, 7);
  const totalCols = topCompanies.length + 1;

  // Compute inline grids depending dynamically on screen properties
  const topGridStyle = isDesktop
    ? { gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }
    : { gridTemplateColumns: "repeat(1, minmax(0, 1fr))" };

  const bottomGridStyle = isDesktop
    ? {
        gridTemplateColumns: `repeat(${Math.min(bottomCompanies.length, 4)}, minmax(0, 1fr))`,
      }
    : { gridTemplateColumns: "repeat(1, minmax(0, 1fr))" };

  return (
    <section
      className="bg-[#04050F] mx-auto w-full
          max-w-[1000px]
          2xl:max-w-[1320px]
          px-3 md:px-6 lg:px-8
          pb-20 md:pb-14 lg:pb-30"
    >
      <section
        ref={sectionRef}
        className="bg-[#04050F] overflow-hidden"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div ref={gridRef} className="group relative">
          {/* Main Border */}
          <div className="border border-white/20">
            {/* Top Row */}
            <div className="grid" style={topGridStyle}>
              {/* Title Cell */}
              <div
                ref={(el) => {
                  if (el) cellsRef.current.push(el);
                }}
                className="
                  font-mono
                  flex min-h-[90px] md:min-h-[110px]
                  items-center justify-center
                  border-b border-r border-white/20
                  px-4
                "
              >
                <h2 className="md:hidden text-left uppercase text-[#ff5c35] text-[16px] leading-[1.3] tracking-[0.22em] md:text-[16px]">
                  Companies Participating
                </h2>
                <h2 className="hidden md:block text-left uppercase text-[#ff5c35] text-[15px] leading-[1.3] tracking-[0.22em] md:text-[16px]">
                  Companies
                  <br />
                  Participating
                </h2>
              </div>

              {topCompanies.map((item, index) => (
                <div
                  key={`top-${index}`}
                  ref={(el) => {
                    if (el) cellsRef.current.push(el);
                  }}
                  className="
                    flex min-h-[90px] md:min-h-[110px]
                    items-center justify-center
                    border-b border-r border-white/20 last:border-r-0
                    px-4 md:px-4
                  "
                >
                  <PrismicNextLink
                    field={item.link}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <div className="flex items-center justify-center w-full h-9 md:w-full xl:w-50 xl:h-11">
                      <PrismicNextImage
                        field={item.logo}
                        className="w-full h-full object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                      />
                    </div>
                  </PrismicNextLink>
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            {bottomCompanies.length > 0 && (
              <div className="grid" style={bottomGridStyle}>
                {bottomCompanies.map((item, index) => (
                  <div
                    key={`bottom-${index}`}
                    ref={(el) => {
                      if (el) cellsRef.current.push(el);
                    }}
                    className={`
                      flex min-h-[90px] md:min-h-[110px]
                      items-center justify-center
                      border-r border-white/20
                      px-4 md:px-6
                      md:[&:last-child]:border-r-0

                      ${
                        index === bottomCompanies.length - 1 &&
                        bottomCompanies.length % 2 !== 0
                          ? "border-r-0"
                          : ""
                      }
                    `}
                  >
                    <PrismicNextLink field={item.link}>
                      <PrismicNextImage
                        field={item.logo}
                        className="h-auto w-[95px] object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 md:w-[150px]"
                      />
                    </PrismicNextLink>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TOP LEFT CORNER */}
          <img
            ref={(el) => {
              cornersRef.current[0] = el;
            }}
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute top-0 left-0 -rotate-90"
          />

          {/* TOP RIGHT CORNER */}
          <img
            ref={(el) => {
              cornersRef.current[1] = el;
            }}
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute top-0 right-0"
          />

          {/* BOTTOM RIGHT CORNER */}
          <img
            ref={(el) => {
              cornersRef.current[2] = el;
            }}
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute bottom-0 right-0 rotate-90"
          />

          {/* BOTTOM LEFT CORNER */}
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
    </section>
  );
};

export default Partners;
