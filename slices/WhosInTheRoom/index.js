"use client";

import { useState, useEffect } from "react";
import Bounded from "@/components/Bounded";
import InfoCard from "@/components/InfoCard";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.WhosInTheRoomSlice} WhosInTheRoomSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhosInTheRoomSlice>} WhosInTheRoomProps
 * @type {import("react").FC<WhosInTheRoomProps>}
 */
const WhosInTheRoom = ({ slice }) => {
  const items = slice.primary.info_group;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <Bounded className="bg-[#04050F]">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F]"
      >
        {/* Heading with arrow placeholder */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-3 mb-17">
          <img
            src="/arrow.svg"
            alt=""
            className="w-3 md:w-4 lg:w-6 object-contain"
          />
          <div className="text-white text-3xl md:text-[42px] lg:text-[42px] font-normal">
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15 lg:gap-8">
          {items.map((item, index) => (
            <InfoCard
              key={index}
              item={item}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </section>
    </Bounded>
  );
};

export default WhosInTheRoom;
