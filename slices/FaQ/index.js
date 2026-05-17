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
    >
      Placeholder component for fa_q (variation: {slice.variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use your own AI agent with the Prismic CLI
       * 📚 Docs: https://prismic.io/docs/ai#create-slices
       */}
    </section>
  );
};

export default FaQ;
