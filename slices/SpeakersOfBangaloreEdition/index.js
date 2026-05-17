/**
 * @typedef {import("@prismicio/client").Content.SpeakersOfBangaloreEditionSlice} SpeakersOfBangaloreEditionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SpeakersOfBangaloreEditionSlice>} SpeakersOfBangaloreEditionProps
 * @type {import("react").FC<SpeakersOfBangaloreEditionProps>}
 */
const SpeakersOfBangaloreEdition = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for speakers_of_bangalore_edition (variation:{" "}
      {slice.variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use your own AI agent with the Prismic CLI
       * 📚 Docs: https://prismic.io/docs/ai#create-slices
       */}
    </section>
  );
};

export default SpeakersOfBangaloreEdition;
