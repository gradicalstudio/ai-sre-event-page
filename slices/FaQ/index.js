"use client";

import FaqItem from "@/components/FaqItem";
import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.FaQSlice} FaQSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FaQSlice>} FaQProps
 * @type {import("react").FC<FaQProps>}
 */

const FaQ = ({ slice }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="
      
      scrollbar-none
    
        relative
        bg-[#04050F]
        px-12 lg:px-20
        py-16 lg:pb-44
        z-10
      "
    >
      {/* Left Gradient */}
      <img
        src="/left side.svg"
        alt=""
        className="
     
          absolute
          -left-30 md:-left-24
          top-1/2
          -translate-y-1/2
          pointer-events-none
         z-[100]
          select-none
           md:  w-[320px]
  md:h-[800px]
      h-[700px]
      w-[120px]
      
          opacity-90
        "
        style={{
          maskImage: "linear-gradient(to right, black 10%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 10%, transparent 100%)",
        }}
      />

      {/* Right Gradient */}
      <img
        src="/rightside.svg"
        alt=""
        className="
        
          absolute
          -right-16 md:-right-24
          top-1/2
          -translate-y-1/2
          pointer-events-none
          z-[100]
          select-none
            md:w-[320px]
  md:h-[800px]
          opacity-90
        "
        style={{
          maskImage: "linear-gradient(to left, black 10%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 10%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 lg:px-20">
        {/* Heading */}
        <div className="text-white font-medium text-3xl lg:text-[38px] mb-10 lg:mb-16">
          <PrismicRichText field={slice.primary.heading} />
        </div>

        {/* FAQ Items */}
        <div>
          {slice.primary.faq.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaQ;
