/**
 * @typedef {import("@prismicio/client").Content.SpeakerTakeawaySlice} SpeakerTakeawaySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SpeakerTakeawaySlice>} SpeakerTakeawayProps
 * @type {import("react").FC<SpeakerTakeawayProps>}
 */
const SpeakerTakeaway = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for speaker_takeaway (variation: {slice.variation})
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

export default SpeakerTakeaway;
