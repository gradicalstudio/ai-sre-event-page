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
      className="bg-[#040516] lg:p-20 relative"
    >
      <div className="lg:p-15 absolute left-0 top-0 bg-green-400 w-fit"></div>
      <div className="lg:p-15 absolute right-0 top-0 bg-green-400 w-fit"></div>
      <div className="lg:p-15 absolute right-0 bottom-0 bg-green-400 w-fit"></div>
      <div className="lg:p-15 absolute left-0 bottom-0 bg-green-400 w-fit"></div>
   
      
      <div className=" lg:px-20">
        <div className="border-2 lg:p-15 border-red-500">
          {/* Heading */}
          <div className="text-white text-sm lg:text-4xl font-normal mb-12">
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
    </section>
  );
};

export default Agenda;
