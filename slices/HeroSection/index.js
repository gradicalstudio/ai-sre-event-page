"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import FormModal from "@/components/FormModal";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import VideoPlayer from "@/components/VideoPlayer";
import Bounded from "@/components/Bounded";

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
      <Bounded innerClassName="pt-10 md:pt-10 lg:pt-30 pb-10  ">
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="min-h-screen w-full bg-[#04050F] flex flex-col justify-center gap-6 text-white"
        >
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Side */}
            <div className="lg:w-[50%] flex flex-col justify-between">
              <div className="block pb-5 lg:hidden">
                <img className="w-14 self-start lg:w-80" src="/X logo.svg" />
              </div>
              <div className="flex flex-col gap-4">
                {/* Heading */}
                <div className="max-w-4xl text-4xl md:text-6xl lg:text-[65px] font-medium lg:leading-[1.1]">
                  <PrismicRichText
                    field={slice.primary.heading}
                    components={{
                      strong: ({ children }) => (
                        <span className="text-[#3FD9FB]">{children}</span>
                      ),
                    }}
                  />
                </div>

                {/* Description */}
                <div className="max-w-2xl text-sm md:text-lg text-balance lg:text-lg">
                  <PrismicRichText field={slice.primary.description} />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <PrimaryButton
                  className=" py-2! w-full! md:w-fit!  md:px-8! md:py-2! lg:px-10!  lg:py-3!  "
                  buttonText="Request invite to attend"
                  onClick={() => setIsInviteOpen(true)}
                />

                <SecondaryButton
                  className=" py-2! w-full! md:w-fit!  md:px-8! md:py-2! lg:px-10!  lg:py-3!  "
                  buttonText="Speak at AI SRE Next"
                  onClick={() => setIsSpeakerOpen(true)}
                />
              </div>

              {/* Meta Info */}
              <div className="flex mt-10 flex-col w-full">
                <div className="flex flex-wrap items-center gap-5 lg:gap-8 w-full lg:w-[95%]">
                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-4 h-4 lg:w-5 lg:h-5 object-contain shrink-0"
                      src="/calender.svg"
                    />

                    <PrismicNextLink
                      className="text-xs md:text-base lg:text-[14px] leading-none flex items-center"
                      field={slice.primary.date}
                    />
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-4 h-4 lg:w-5 lg:h-5 object-contain shrink-0"
                      src="/clock.svg"
                    />

                    <p className="text-xs md:text-base lg:text-[14px] leading-none flex items-center">
                      {slice.primary.time}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-4.5 h-4.5 lg:w-5 lg:h-5 object-contain shrink-0"
                      src="/Location pin.svg"
                    />

                    <PrismicNextLink
                      className="text-xs md:text-base lg:text-[14px] leading-none flex items-center"
                      field={slice.primary.location}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Video */}
            <div className="hidden lg:flex flex-1  items-center rounded-2xl lg:justify-center">
              <img className="w-30 self-start lg:w-80" src="/X logo.svg" />
              {/* <div className="w-full rounded-2xl">
                {showVideo ? (
                  <VideoPlayer />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.image_or_video}
                    className="w-full aspect-video rounded-2xl object-cover"
                  />
                )}
              </div> */}
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
      </Bounded>
      <div className="inset-x-0 xl:-mt-60 h-30 xl:h-70 overflow-hidden blur-2xl">
        <div className="absolute h-65 top-0 w-full">
          <img className="w-full h-full object-cover" src="/bg-gradient.svg" />
        </div>

        {/* <div className="absolute h-137.5 -top-35 w-full">
          <img className="w-full h-full object-cover" src="/toplayer.svg" />
        </div> */}
      </div>

      {/* Bottom Gradient */}
    </>
  );
};

export default HeroSection;
