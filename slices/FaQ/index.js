import FaqItem from "@/components/FaqItem";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.FaQSlice} FaQSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FaQSlice>} FaQProps
 * @type {import("react").FC<FaQProps>}
 */
const FaQ = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-[#04050F] px-18 lg:px-20 py-16 lg:py-44"
    >
      {/* Left gradient SVG */}
      <img
        src="/left side.svg"
        className="absolute -left-5 top-1/2 -translate-y-1/2 pointer-events-none z-0 select-none w-[130px] lg:w-auto"
        style={{
          maskImage: "linear-gradient(to right, black 1%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 1%, transparent 100%)",
        }}
      />

      {/* Right gradient SVG */}
      <img
        src="/rightside.svg"
        className="absolute -right-5 top-1/2 -translate-y-1/2 pointer-events-none z-0 select-none w-[130px] lg:w-auto"
        style={{
          maskImage: "linear-gradient(to left, black 1%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 1%, transparent 100%)",
        }}
      />

      {/* Content above gradients */}
      <div className="relative z-10 lg:px-20">
        {/* Heading */}
        <div className="text-white font-medium text-[32px] lg:text-[38px] mb-10 lg:mb-16">
          <PrismicRichText field={slice.primary.heading} />
        </div>

        {/* FAQ Items */}
        <div>
          {slice.primary.faq.map((item, index) => (
            <FaqItem key={index} item={item} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaQ;
