import HUDFrame from "@/components/HudFrame";
import VideoFrame from "@/components/VideoFrame";
import VideoPlayerFramed from "@/components/VideoPlayerFramed";

/**
 * @typedef {import("@prismicio/client").Content.VideoComponentSlice} VideoComponentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<VideoComponentSlice>} VideoComponentProps
 * @type {import("react").FC<VideoComponentProps>}
 */
const VideoComponent = ({ slice }) => {
  const useLink =
    slice.primary.link_or_default && slice.primary.video_link?.url;
  const videoSrc = useLink ? slice.primary.video_link.url : undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#04050F] mx-auto w-full overflow-hidden mx-auto w-full max-w-[1000px] xl:max-w-[1280px] 2xl:max-w-[1440px] px-6 md:px-14
        my-13
        md:my-20
        md:pb-[15px]
        xl:my-25

      "
    >
      <VideoFrame>
        <VideoPlayerFramed src={videoSrc} />
      </VideoFrame>
    </section>
  );
};

export default VideoComponent;
