import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@prismicio/react";

import Marquee from "react-fast-marquee";

/**
 * @typedef {import("@prismicio/client").Content.SectorsRepresentedSlice} SectorsRepresentedSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectorsRepresentedSlice>} SectorsRepresentedProps
 * @type {import("react").FC<SectorsRepresentedProps>}
 */
const SectorsRepresented = ({ slice }) => {
  return (
    <Bounded className="bg-[#04050F] overflow-hidden">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F] flex flex-col lg:flex-row lg:items-center gap-16 md:gap-10 lg:gap-8 "
      >
        {/* LEFT — Fixed heading */}
        <div className="flex items-center gap-3 shrink-0">
          <img className="w-3 md:w-4 lg:w-6 object-contain" src="/arrow.svg" />
          <div className="text-white text-3xl md:text-[38px] lg:text-[38px]  font-medium ">
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        {/* RIGHT — Marquee */}
        <div className="relative w-full lg:flex-1 min-w-0 overflow-hidden">
          <Marquee speed={105} gradient={false} className="overflow-hidden">
            {slice.primary.marquee.map((item, index) => (
              <span key={index} className="flex items-center gap-4 px-4">
                <span className="text-white/80 text-[18px] lg:text-[24.26px] whitespace-nowrap    leading-none">
                  {item.partners}
                </span>
                <img className="w-1 lg:w-2 object-contain" src="/bullet.svg" />
              </span>
            ))}
          </Marquee>
          {/* LEFT FADE */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-24 lg:w-32 bg-gradient-to-r from-[#04050F] to-transparent z-10" />

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-24 lg:w-32 bg-gradient-to-l from-[#04050F] to-transparent z-10" />
        </div>
      </section>
    </Bounded>
  );
};

export default SectorsRepresented;
