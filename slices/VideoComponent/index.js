
import VideoFrame from "@/components/VideoFrame";
import VideoPlayerFramed from "@/components/VideoPlayerFramed";

/**
 * @typedef {import("@prismicio/client").Content.VideoComponentSlice} VideoComponentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<VideoComponentSlice>} VideoComponentProps
 * @type {import("react").FC<VideoComponentProps>}
 */
const VideoComponent = ({ slice }) => {


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#04050F]  overflow-hidden mx-auto w-full max-w-250 xl:max-w-7xl 2xl:max-w-360 px-6 md:px-14
        my-13
        md:my-20
        md:pb-3.75
        xl:my-25

      "
    >
      <VideoFrame>
        <VideoPlayerFramed
          usePrismicLink={slice.primary.link_or_default}
          prismicVideoUrl={slice.primary.video_link?.url ?? null}
        />
      </VideoFrame>
    </section>
  );
};

export default VideoComponent;
