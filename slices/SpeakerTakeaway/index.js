import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.SpeakerTakeawaySlice} SpeakerTakeawaySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SpeakerTakeawaySlice>} SpeakerTakeawayProps
 * @type {import("react").FC<SpeakerTakeawayProps>}
 */
const SpeakerTakeaway = ({ slice }) => {
  return (
    <Bounded className="bg-[#04050F]">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F] "
      >
        <div className="relative ">
          {/* Corner Decorations */}
          <div className="pointer-events-none absolute inset-0">
            {/* TOP LEFT */}
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute top-0 left-0 -rotate-90 z-20 w-3 opacity-60 md:w-4"
            />

            {/* TOP RIGHT */}
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute top-0 right-0 z-20 w-3 opacity-60 md:w-4"
            />

            {/* BOTTOM RIGHT */}
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute bottom-0 right-0 rotate-90 z-20 w-3 opacity-60 md:w-4"
            />

            {/* BOTTOM LEFT */}
            <img
              src="/Rectangle 574056928.svg"
              alt=""
              className="absolute bottom-0 left-0 rotate-180 z-20 w-3 opacity-60 md:w-4"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr]">
            {/* LEFT SIDE */}
            <div className="relative flex items-center p-6 md:p-8 lg:p-10">
              {/* TOP DASH */}
              <div className="absolute left-0 top-0 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)]" />

              {/* BOTTOM DASH */}
              {/* BOTTOM DASH */}
              <div className="absolute bottom-0 left-0 hidden h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)] lg:block" />

              {/* LEFT DASH */}
              <div className="absolute left-0 top-0 h-full w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)]" />
              {/* LEFT DASH */}
              <div className="absolute left-0 top-0 h-full w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)]" />

              {/* RIGHT DASH - MOBILE ONLY */}
              <div className="absolute right-0 top-0 h-full w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0_8px,transparent_8px_18px)] lg:hidden" />
              <div className="flex items-start gap-5">
                {/* Arrow */}
                <div className="mt-2 flex-shrink-0">
                  <img
                    src="/arrow.svg"
                    alt="Arrow"
                    className="h-7 w-4 object-contain md:h-9 md:w-5"
                  />
                </div>

                {/* Heading */}
                <div className="max-w-[95%] text-white">
                  <PrismicRichText
                    field={slice.primary.heading}
                    components={{
                      heading1: ({ children }) => (
                        <h1 className="text-4xl font-light md:text-4xl lg:text-6xl">
                          {children}
                        </h1>
                      ),
                      heading2: ({ children }) => (
                        <h2 className="text-4xl font-light leading-[1.05] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                          {children}
                        </h2>
                      ),
                      paragraph: ({ children }) => (
                        <p className="text-4xl font-semi-bold md:text-4xl lg:text-[50px]">
                          {children}
                        </p>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="grid grid-cols-1 border border-white/10 sm:grid-cols-2">
              {slice.primary.blocks?.map((item, index) => (
                <div
                  key={index}
                  className="
  border-t border-white/10
  sm:border-b-0
  sm:border-l
  p-3 md:p-4
  first:border-t-0
"
                >
                  <div className="relative z-10">
                    {/* Icon */}
                    {item.icon?.url && (
                      <div className="">
                        <PrismicNextImage
                          field={item.icon}
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="mb-2 text-[16px] font-semibold  text-white ">
                      {item.heading}
                    </h3>

                    {/* Description */}
                    <p className="max-w-[90%] text-[16px] text-white/60 ">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Bounded>
  );
};

export default SpeakerTakeaway;
