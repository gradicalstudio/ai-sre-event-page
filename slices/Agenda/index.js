import AgendaItem from "@/components/AgentaItem";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.AgendaSlice} AgendaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AgendaSlice>} AgendaProps
 * @type {import("react").FC<AgendaProps>}
 */
const Agenda = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="agenda"
      className="relative bg-[#04050F] px-6 md:px-8 lg:px-20 py-16 md:py-20 lg:py-24"
    >
      <div className="grid grid-cols-[6%_1fr_6%] lg:grid-cols-[15%_1fr_15%] grid-rows-[auto_1fr_auto]">
        {/* Row 1 - top corners */}
        <div className="h-6 sm:h-10 lg:h-35 border-r border-b border-white/10" />
        <div className="border-b border-white/10" />
        <div className="h-6 sm:h-10 lg:h-35 border-l border-b border-white/10" />

        {/* Row 2 - content */}
        <div className="border-r border-white/10" />
        <div className="  lg:p-10">
          {/* Heading */}
          <div className="text-white text-3xl md:text-5xl lg:text-4xl pl-2 pt-2 font-normal mb-12">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          {/* Agenda Items */}
          <div>
            {slice.primary.blocks.map((item, index) => (
              <AgendaItem key={index} item={item} defaultOpen={index === 1} />
            ))}
          </div>
        </div>
        <div className="border-l border-white/10" />

        {/* Row 3 - bottom corners */}
        <div className="h-6 sm:h-10 lg:h-35 border-t border-r border-white/10" />
        <div className="border-t border-white/10" />
        <div className="h-6 sm:h-10 lg:h-35 border-t border-l border-white/10" />
      </div>
    </section>
  );
};

export default Agenda;
