import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.WhatYouTakeAwaySlice} WhatYouTakeAwaySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhatYouTakeAwaySlice>} WhatYouTakeAwayProps
 * @type {import("react").FC<WhatYouTakeAwayProps>}
 */
const WhatYouTakeAway = ({ slice }) => {
  return (
    <section
      id="for-attendees"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#04050F] px-8 md:px-10 lg:px-20 py-16 lg:py-24"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
        {/* LEFT — Heading */}
        <div className="flex items-center gap-3 lg:w-[35%] shrink-0">
          <img
            className="w-3 md:w-4 lg:w-6 mt-2 object-contain"
            src="/arrow.svg"
          />
          <div className="text-white font-medium text-3xl md:text-5xl lg:text-[50px] leading-[1.1]">
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        {/* RIGHT — Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 flex-1">
          {slice.primary.blocks.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              {/* Icon */}
              <PrismicNextImage
                field={item.icon}
                className="w-8 h-8 object-contain"
              />

              {/* Title */}
              <p className="text-white font-semibold text-[15px] lg:text-[16px]">
                {item.title}
              </p>

              {/* Short description */}
              <p className="text-white/50 text-sm lg:text-[16px]">
                {item.short_description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouTakeAway;
