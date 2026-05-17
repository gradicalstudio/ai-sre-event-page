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
    >
      Placeholder component for whos_in_the_room (variation: {slice.variation})
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

export default WhosInTheRoom;
