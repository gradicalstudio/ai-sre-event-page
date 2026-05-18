import InfoCard from "@/components/InfoCard";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.WhosInTheRoomSlice} WhosInTheRoomSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhosInTheRoomSlice>} WhosInTheRoomProps
 * @type {import("react").FC<WhosInTheRoomProps>}
 */
const WhosInTheRoom = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#04050F] px-8 lg:px-20 py-12"
    >
      {/* Heading with arrow placeholder */}
      <div className="flex items-center gap-2 md:gap-3 lg:gap-6 mb-17">
        {/* Arrow */}
        <img
          src="/arrow.svg"
          alt=""
          className="w-3 md:w-4 lg:w-6 object-contain "
        />
        <div className="text-white text-3xl md:text-5xl font-normal">
          <PrismicRichText field={slice.primary.heading} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15 lg:gap-8">
        {slice.primary.info_group.map((item, index) => (
          <InfoCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WhosInTheRoom;
