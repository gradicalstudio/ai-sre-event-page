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

  const sectionRefDefault = useRef(null);
  const sectionRefInfinity = useRef(null);
  const arrowRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const showSlice = slice?.primary?.show_slice ?? true;

  useEffect(() => {
    if (!showSlice) return;
    const activeSectionRef =
      slice.variation === "default" ? sectionRefDefault : sectionRefInfinity;

    const ctx = gsap.context(() => {
      gsap.set(arrowRef.current, { opacity: 0, x: -100 });
      gsap.set(headingRef.current, { opacity: 0, x: 40 });
      gsap.set(cardsRef.current, { opacity: 0, x: -120 });

      const isMobile = window.innerWidth < 767;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: activeSectionRef.current,
          start: isMobile ? "top 95%" : "top 75%",
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
          cardsRef.current,
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power4.out" },
          "-=0.9",
        );
    }, activeSectionRef);

    return () => ctx.revert();
  }, [slice.variation, showSlice]);
  if (!showSlice) {
    return null;
  }
  return (
    <>
      {slice.variation === "default" && (
        <Bounded className="bg-[#04050F] overflow-hidden">
          <section
            ref={sectionRefDefault}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="bg-[#04050F] overflow-hidden"
          >
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 lg:gap-8">
              {items.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="opacity-0" // ✅ fixed from md:opacity-0
                >
                  <InfoCard
                    item={item}
                    index={index}
                    activeIndex={activeIndex}
                    onActivate={setActiveIndex}
                    totalItems={items.length}
                  />
                </div>
              ))}
            </div>
          </section>
        </Bounded>
      )}

      {slice.variation === "withInfinity" && (
        <Bounded className="bg-[#04050F] overflow-visible">
          {" "}
          {/* ✅ fixed overflow */}
          <section
            ref={sectionRefInfinity}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="bg-[#04050F] overflow-visible"
          >
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

            <div className="flex flex-col lg:flex-row lg:items-stretch w-full">
              {/* Left panel */}
              <div className="flex relative flex-col lg:w-[55%] border border-gray-600">
                <img
                  src="/cross-orange.svg"
                  className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2"
                />
                <img
                  src="/cross-orange.svg"
                  className="absolute bottom-0 left-0 w-4 h-4 -translate-x-1/2 translate-y-1/2"
                />
                <img
                  src="/cross-orange.svg"
                  className="absolute top-0 right-0 w-4 h-4 translate-x-1/2 -translate-y-1/2"
                />
                <img
                  src="/cross-orange.svg"
                  className="absolute bottom-0 right-0 w-4 h-4 translate-x-1/2 translate-y-1/2"
                />

                {items.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="opacity-0"
                  >
                    <InfoCard
                      item={item}
                      index={index}
                      activeIndex={activeIndex}
                      onActivate={setActiveIndex}
                      totalItems={items.length}
                    />
                  </div>
                ))}
              </div>

              {/* Right panel — iframe */}
              <div className="lg:w-[45%] relative border-b border-x lg:border-y lg:border-r border-white/20">
                {/* ✅ simplified cross positions — only the ones this panel owns */}
                <img
                  src="/cross-orange.svg"
                  className="absolute bottom-0 left-0 lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 w-4 h-4 -translate-x-1/2 translate-y-1/2 lg:translate-x-1/2 lg:-translate-y-1/2"
                />
                <img
                  src="/cross-orange.svg"
                  className="absolute bottom-0 right-0 w-4 h-4 translate-x-1/2 translate-y-1/2"
                />

                <div className="relative w-full h-0 pb-[56.25%] lg:h-full lg:pb-0">
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                      backgroundSize: "25% 25%",
                    }}
                  />
                  <iframe
                    className="absolute lg:py-15 2xl:py-0 inset-0 w-full h-full"
                    src="https://www.unicorn.studio/embed/DTcrFZq8midd4tbCz7YK"
                    allow="autoplay"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </section>
        </Bounded>
      )}
    </>
  );
};

export default WhosInTheRoom;
