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
        className="bg-[#04050F] flex flex-col lg:flex-row lg:items-center gap-6 md:gap-10 lg:gap-8 "
      >
        {/* LEFT — Fixed heading */}
        <div className="flex items-center gap-3 shrink-0">
          <img className="w-3 md:w-4 lg:w-6 object-contain" src="/arrow.svg" />
          <div className="text-white text-3xl md:text-5xl lg:text-4xl font-medium ">
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        {/* RIGHT — Marquee */}
        <div className="w-full lg:flex-1 overflow-hidden md:px-9">
          <Marquee speed={60} gradient={false}>
            {slice.primary.marquee.map((item, index) => (
              <span key={index} className="flex items-center gap-4 px-4">
                <span className="text-white/50 text-[18px] lg:text-2xl whitespace-nowrap">
                  {item.partners}
                </span>
                <span className="text-orange-500 text-xs">▪</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    </Bounded>
  );
};

export default SectorsRepresented;
