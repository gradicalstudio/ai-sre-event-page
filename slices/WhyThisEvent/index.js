/**
 * @typedef {import("@prismicio/client").Content.WhyThisEventSlice} WhyThisEventSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhyThisEventSlice>} WhyThisEventProps
 * @type {import("react").FC<WhyThisEventProps>}
 */
const WhyThisEvent = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for why_this_event (variation: {slice.variation})
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

export default WhyThisEvent;
