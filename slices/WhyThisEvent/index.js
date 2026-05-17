"use client";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.WhyThisEventSlice} WhyThisEventSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhyThisEventSlice>} WhyThisEventProps
 * @type {import("react").FC<WhyThisEventProps>}
 */
const WhyThisEvent = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#04050F] px-6 py-24 text-white md:px-10 xl:px-20 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mb-20 flex items-center gap-5">
          <img
            src="/arrow.svg"
            alt=""
            className="w-6 md:w-8 lg:w-10 object-contain"
          />

          <div>
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-4xl md:text-6xl font-medium leading-[0.95]">
                    {children}
                  </h1>
                ),

                heading2: ({ children }) => (
                  <h2 className="text-4xl md:text-6xl font-medium leading-[0.95]">
                    {children}
                  </h2>
                ),

                paragraph: ({ children }) => (
                  <p className="text-4xl md:text-6xl font-medium leading-[0.95]">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 border-t border-white/10 md:grid-cols-3">
          {slice.items.map((item, index) => (
            <div
              key={index}
              className="
                relative
                border-r
                border-white/10
                py-10
                pr-10

                last:border-r-0
              "
            >
              {/* Icon */}
              <div className="relative mb-10 h-[90px] w-[90px]">
                {/* Shadow */}
                <PrismicNextImage
                  field={item.icon_shadow}
                  fallbackAlt=""
                  className="absolute inset-0 h-full w-full object-contain"
                />

                {/* Main Icon */}
                <PrismicNextImage
                  field={item.icon}
                  fallbackAlt=""
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mb-5 max-w-[280px] text-3xl font-medium leading-[1]">
                {item.heading}
              </h3>

              {/* Description */}
              <p className="max-w-[320px] text-xl leading-relaxed text-white/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisEvent;
