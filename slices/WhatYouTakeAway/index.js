/**
 * @typedef {import("@prismicio/client").Content.WhatYouTakeAwaySlice} WhatYouTakeAwaySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WhatYouTakeAwaySlice>} WhatYouTakeAwayProps
 * @type {import("react").FC<WhatYouTakeAwayProps>}
 */
const WhatYouTakeAway = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for what_you_take_away (variation: {slice.variation}
      ) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use your own AI agent with the Prismic CLI
       * 📚 Docs: https://prismic.io/docs/ai#create-slices
       */}
    </section>
  );
};

export default WhatYouTakeAway;
