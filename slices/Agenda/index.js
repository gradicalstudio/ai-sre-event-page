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
    >
      Placeholder component for agenda (variation: {slice.variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use your own AI agent with the Prismic CLI
       * 📚 Docs: https://prismic.io/docs/ai#create-slices
       */}
    </section>
  );
};

export default Agenda;
