"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import FormModal from "@/components/FormModal";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import VideoPlayer from "@/components/VideoPlayer";

/**
 * @typedef {import("@prismicio/client").Content.HeroSectionSlice} HeroSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSectionSlice>} HeroSectionProps
 * @type {import("react").FC<HeroSectionProps>}
 */

const HeroSection = ({ slice }) => {
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const showVideo = slice.primary.video_toggle;
  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=" min-h-screen w-full bg-[#04050F] flex flex-col  justify-center gap-6 px-6 lg:px-15 pt-20 lg:pt-24 text-white"
      >
        <div className="flex flex-col lg:flex-row gap-10 ">
          <div className="lg:w-[46%]">
            {/* Left Side */}
            <div className="flex flex-col gap-4">
              <div className="max-w-4xl text-5xl lg:text-[67px] font-medium leading-[1.1]">
                <PrismicRichText
                  field={slice.primary.heading}
                  components={{
                    strong: ({ children }) => (
                      <span className="text-[#3FD9FB]">{children}</span>
                    ),
                  }}
                />
              </div>

              <div className="max-w-2xl text-balance lg:text-lg">
                <PrismicRichText field={slice.primary.description} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center  gap-6">
              <PrimaryButton
                buttonText="Request invite to attend"
                onClick={() => setIsInviteOpen(true)}
              />

              <SecondaryButton
                buttonText="Speak at AI SRE Next"
                onClick={() => setIsSpeakerOpen(true)}
              />
            </div>
            <div className="flex mt-10 flex-col w-full gap-4">
              <div className="flex items-center lg:w-[90%]">
                <div className="flex w-full gap-2">
                  <img className="w-4 lg:w-5.5" src="/calender.svg" />
                  <PrismicNextLink
                    className="text-xs md:text-sm lg:text-[18.5px]"
                    field={slice.primary.date}
                  />
                </div>
                <div className="flex w-full gap-2 text-xs md:text-sm lg:text-[18.5px]">
                  <img className="w-4 lg:w-5.5" src="clock.svg" />
                  <p>{slice.primary.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <img className="w-3.5 lg:w-4.5" src="/Location pin.svg" />
                <PrismicNextLink
                  className="text-xs md:text-sm lg:text-[18.5px]"
                  field={slice.primary.location}
                />
              </div>
            </div>
          </div>
          {/* Video section below */}
          <div className="flex-1 flex items-center rounded-2xl justify-center">
            <div className="w-full rounded-2xl ">
              {showVideo ? (
                <VideoPlayer />
              ) : (
                <PrismicNextImage
                  field={slice.primary.image_or_video}
                  className="w-full aspect-video rounded-2xl object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Speaker Form Modal */}
        <FormModal
          type="speaker"
          isOpen={isSpeakerOpen}
          onClose={() => setIsSpeakerOpen(false)}
        />

        {/* Invite Form Modal */}
        <FormModal
          type="invite"
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
        />
      </section>
      <div className="relative w-full inset-x-0 -mt-20 -z-10  h-90 overflow-hidden">
        <div className="absolute h-65  top-0  w-full">
          <img className="w-full h-full object-cover" src="/bg-gradient.svg" />
        </div>
        <div className="absolute h-150 -top-40 w-full ">
          <img className="w-full h-full object-cover" src="/toplayer.svg" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
