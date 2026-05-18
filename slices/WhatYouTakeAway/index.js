import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";

/**
 * @typedef {import("@prismicio/client").Content.WhatYouTakeAwaySlice} WhatYouTakeAwaySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhatYouTakeAwaySlice>} WhatYouTakeAwayProps
 * @type {import("react").FC<WhatYouTakeAwayProps>}
 */
const WhatYouTakeAway = ({ slice }) => {
  return (
    <Bounded className="bg-[#04050F]">
      <section
        id="for-attendees"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F] "
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* LEFT — Heading */}
          <div className="flex items-start gap-4 lg:gap-6 lg:w-[38%]  shrink-0">
            <img
              className="w-3 md:w-4 h-auto lg:w-6 mt-2 object-contain"
              src="/arrow.svg"
            />
            <div className="text-white text-3xl md:text-6xl leading-[1.2] lg:leading-[0.95] font-medium">
              <PrismicRichText field={slice.primary.heading} />
            </div>
          </div>

          {/* RIGHT — Cards grid */}
          <div
            className="
    grid
    grid-cols-1
    md:grid-cols-3

    gap-10 lg:gap-12

    flex-1

    max-w-[850px]
    
  "
          >
            {slice.primary.blocks.map((item, index) => (
              <div key={index} className="flex flex-col gap-3">
                {/* Icon */}
                <PrismicNextImage
                  field={item.icon}
                  className="w-12 h-12 object-contain"
                />

                {/* Title */}
                <p className="text-white text-xl font-medium ">{item.title}</p>

                {/* Short description */}
                <p className="text-white/80 text-sm lg:text-[18px]">
                  {item.short_description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Bounded>
  );
};

export default WhatYouTakeAway;
