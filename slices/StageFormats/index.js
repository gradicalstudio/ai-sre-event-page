/**
 * @typedef {import("@prismicio/client").Content.StageFormatsSlice} StageFormatsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StageFormatsSlice>} StageFormatsProps
 * @type {import("react").FC<StageFormatsProps>}
 */
const StageFormats = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for stage_formats (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use your own AI agent with the Prismic CLI
       * 📚 Docs: https://prismic.io/docs/ai#create-slices
       */}
    </section>
  );
};

export default StageFormats;
