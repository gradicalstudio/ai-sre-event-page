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
      className="bg-[#04050F] lg:p-20 relative"
    >
      <div>
        {/* First row */}
        <div className="flex w-full">
          <div className="w-[15%] h-10 lg:h-35 border-r border-b border-white/10 "></div>
          <div className="w-full"></div>
          <div className="w-[15%] h-10 lg:h-35 border-l border-b border-white/10 "></div>
        </div>
        <div className="flex w-full">
          {/* second row */}
          <div className="w-[15%]"></div>
          <div className="w-full ">
            <div className="border border-white/10 -mt-px -mx-px xl:mx-[-0.5] mb-[-0.5px] lg:p-10">
              {/* Heading */}
              <div className="text-white text-3xl lg:text-4xl pl-2 pt-2 font-normal mb-12">
                <PrismicRichText field={slice.primary.heading} />
              </div>

              {/* Agenda Items */}
              <div>
                {slice.primary.blocks.map((item, index) => (
                  <AgendaItem key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[15%]"></div>
        </div>
        <div className="flex w-full">
          <div className="w-[15%] h-10 lg:h-35 border-t border-r border-white/10  "></div>
          <div className="w-full"></div>
          <div className="w-[15%] h-10 lg:h-35 border-t border-l border-white/10"></div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
