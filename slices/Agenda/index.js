"use client";

import { useEffect, useRef } from "react";
import AgendaItem from "@/components/AgentaItem";
import { PrismicRichText } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.AgendaSlice} AgendaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AgendaSlice>} AgendaProps
 * @type {import("react").FC<AgendaProps>}
 */

const Agenda = ({ slice }) => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 80,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="agenda"
      className="relative bg-[#04050F] px-6 md:px-8 lg:px-20 pb-16 md:pb-27 lg:pb-43"
    >
      <div className="grid grid-cols-[6%_1fr_6%] lg:grid-cols-[15%_1fr_15%] grid-rows-[auto_1fr_auto]">
        {/* Row 1 - top corners */}
        <div className="h-6 sm:h-10 lg:h-35 border-r border-b border-white/10" />
        <div className="border-b border-white/10" />
        <div className="h-6 sm:h-10 lg:h-35 border-l border-b border-white/10" />

        {/* Row 2 - content */}
        <div className="border-r border-white/10" />

        <div className="lg:p-10">
          {/* Heading */}
          <div className="text-white text-3xl md:text-[32px] lg:text-[34px] xl:text-[38px] pl-2 pt-2 font-normal mb-12">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          {/* Agenda Items */}
          <div>
            {slice.primary.blocks.map((item, index) => (
              <div key={index} ref={(el) => (itemsRef.current[index] = el)}>
                <AgendaItem item={item} defaultOpen={index === 1} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-l border-white/10" />

        {/* Row 3 - bottom corners */}
        <div className="h-6 sm:h-10 lg:h-35 border-t border-r border-white/10" />
        <div className="border-t border-white/10" />
        <div className="h-6 sm:h-10 lg:h-35 border-t border-l border-white/10" />
      </div>
    </section>
  );
};

export default Agenda;
