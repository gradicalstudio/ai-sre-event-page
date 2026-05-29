"use client";

import { useEffect, useRef, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Marquee from "react-fast-marquee";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";

gsap.registerPlugin(ScrollTrigger);

const Partners = ({ slice }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const cellsRef = useRef([]);
  const cornersRef = useRef([]);

  cellsRef.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validCells = cellsRef.current.filter(Boolean);

      gsap.set(gridRef.current, { opacity: 0, scale: 0.96 });
      gsap.set(validCells, { opacity: 0, y: 20 });
      gsap.set(cornersRef.current, { opacity: 0, scale: 0.7 });

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

      validCells.forEach((cell, index) => {
        if (!cell || index === 0) return;

        cell.style.position = "relative";
        cell.style.overflow = "hidden";

        const reflection = document.createElement("div");
        reflection.className = `
          absolute top-[-40%] left-[-150%] h-[240%] w-[45%] rotate-[25deg]
          bg-gradient-to-r from-transparent via-white/25 to-transparent
          blur-md pointer-events-none z-30 mix-blend-screen opacity-0
        `;
        cell.appendChild(reflection);

        const animateReflection = () => {
          const distance = cell.offsetWidth * 3;
          gsap.fromTo(
            reflection,
            { x: 0, opacity: 0 },
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

    return () => ctx.revert();
  }, []);

  const showSlice = slice.primary.show_slice;
  if (!showSlice) return null;

  const companies = slice.primary.companies || [];
  const topCompanies = companies.slice(0, 3);
  const bottomCompanies = companies.slice(3, 7);
  const totalCols = topCompanies.length + 1;

  const LogoItem = ({ item }) => {
    const inner = (
      <div className="flex items-center justify-center w-full">
        <div className="w-[120px] h-[44px] md:w-[150px] md:h-[52px] flex items-center justify-center">
          <PrismicNextImage
            field={item.logo}
            className="w-full h-full object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </div>
    );

    return item.link?.url ? (
      <PrismicNextLink
        field={item.link}
        className="flex items-center justify-center w-full h-full"
      >
        {inner}
      </PrismicNextLink>
    ) : (
      inner
    );
  };

  return (
    <section
      className="bg-[#04050F] mx-auto w-full
        max-w-[1000px] 2xl:max-w-[1320px]
        px-3 md:px-6 lg:px-8
        pb-20 md:pb-27 lg:pb-43"
    >
      <section
        ref={sectionRef}
        className="bg-[#04050F] overflow-hidden"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {/* ─── MOBILE MARQUEE — only when > 3 logos ─── */}
        {companies.length > 3 && (
          <div className="md:hidden border border-white/20 relative">
            {/* Title row */}
            <div className="flex items-center justify-start border-b border-white/20 min-h-[70px] px-4">
              <h2 className="font-mono uppercase text-[#ff5c35] text-[16px] leading-[1.3] tracking-[0.22em]">
                Companies Participating
              </h2>
            </div>

            {/* Marquee row */}
            <div
              className="relative min-h-[90px] flex items-center overflow-hidden"
              style={{
                WebkitTransform: "translateZ(0)",
                transform: "translateZ(0)",
              }}
            >
              <Marquee
                speed={60}
                gradient={false}
                pauseOnHover={false}
                style={{ willChange: "transform" }}
              >
                {companies.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center px-8 min-h-[90px]"
                  >
                    <LogoItem item={item} />
                    <span className="ml-8 h-8 w-px bg-white/20 block" />
                  </div>
                ))}
              </Marquee>

              {/* LEFT FADE */}
              <div className="pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#04050F] via-[#04050F]/80 to-transparent z-10" />
              {/* RIGHT FADE */}
              <div className="pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#04050F] via-[#04050F]/80 to-transparent z-10" />
            </div>

            {/* Corners */}
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute top-0 left-0 -rotate-90"
            />
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute top-0 right-0"
            />
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute bottom-0 right-0 rotate-90"
            />
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute bottom-0 left-0 rotate-180"
            />
          </div>
        )}

        {/* ─── DESKTOP GRID (also mobile fallback when ≤ 3 logos) ─── */}
        <div
          ref={gridRef}
          className={`group relative ${companies.length > 3 ? "hidden md:block" : "block"}`}
        >
          <div className="border border-white/20">
            {/* Top Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
              }}
            >
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
                <h2 className="md:hidden text-left uppercase text-[#ff5c35] text-[16px] leading-[1.3] tracking-[0.22em]">
                  Companies Participating
                </h2>
                <h2 className="hidden md:block text-left uppercase text-[#ff5c35] text-[15px] leading-[1.3] tracking-[0.22em]">
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
                    px-4
                  "
                >
                  <LogoItem item={item} />
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            {bottomCompanies.length > 0 && (
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(bottomCompanies.length, 4)}, minmax(0, 1fr))`,
                }}
              >
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
                    <LogoItem item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Corners */}
          <img
            ref={(el) => {
              cornersRef.current[0] = el;
            }}
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute top-0 left-0 -rotate-90"
          />
          <img
            ref={(el) => {
              cornersRef.current[1] = el;
            }}
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <img
            ref={(el) => {
              cornersRef.current[2] = el;
            }}
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute bottom-0 right-0 rotate-90"
          />
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
