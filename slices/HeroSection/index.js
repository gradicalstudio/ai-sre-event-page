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
  const handleCalendar = () => {
    window.open(
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI+SRE+Next&dates=20260612T100000/20260612T153000&details=Join+AI+SRE+Next&location=Conrad+Bengaluru,+25/3,+Kensington+Rd,+Halasuru,+Someshwarpura,+Bengaluru,+Karnataka+560008,+India",
      "_blank",
    );
  };

  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="w-full bg-[#04050F]  px-6 md:px-6 lg:px-0
          py-10 md:py-14 lg:pb-0  flex pt-25 md:pt-30 lg:pt-40 xl:pt-40 max-w-175 lg:max-w-225 xl:max-w-280 2xl:max-w-330  mx-auto flex-col gap-6 text-white"
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-15">
          {/* Left Side */}
          <div className="lg:w-[45%] xl:w-[50%] flex flex-col justify-between">
            <div className="block pb-5 lg:hidden">
              <div className="w-full rounded-2xl">
                {showVideo ? (
                  <VideoPlayer />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.image_or_video}
                    className="w-31 self-start lg:w-80"
                    loading="eager"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* Heading */}
              <div className="max-w-4xl text-4xl md:text-5xl lg:text-[50px] xl:text-5xl 2xl:text-[65px] font-medium lg:leading-[1.1] xl:leading-[1]">
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
              <div className="max-w-2xl  font-medium text-base lg:text-lg xl:text-lg 2xl:text-lg text-balance ">
                <PrismicRichText field={slice.primary.description} />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-3 xl:gap-6">
              <PrimaryButton
                className=" text-[14px]! xl:text-[16px]!  w-full! md:w-fit!  md:px-8! md:py-3! lg:px-5! text-nowrap  lg:py-3! xl:py-3! xl:px-9!  "
                buttonText="Request invite to attend"
                onClick={() => setIsInviteOpen(true)}
              />

              <SecondaryButton
                className=" text-[14px]! xl:text-[16px]! w-full! md:w-fit!  md:px-8! md:py-3! lg:px-5! text-nowrap  lg:py-3! xl:py-3! xl:px-7! "
                buttonText="Speak at AI SRE Next"
                onClick={() => setIsSpeakerOpen(true)}
              />
            </div>

            {/* Meta Info */}
            <div className="flex mt-10 flex-col w-full">
              <div className="flex flex-wrap items-center gap-5 lg:gap-3   xl:gap-5 w-full lg:w-[95%] xl:w-full">
                {/* Date */}
                <div className="flex text-center items-center gap-2 group">
                  <img
                    className="w-4 h-4 lg:w-5 lg:h-5 object-contain shrink-0 "
                    src="/calender.svg"
                  />

                  <p className="text-xs md:text-base lg:text-[13px] leading-none">
                    {slice.primary.date_text}
                  </p>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2">
                  <img
                    className="w-4 h-4 lg:w-5 lg:h-5 object-contain shrink-0"
                    src="/clock.svg"
                  />

                  <p className="text-xs md:text-base lg:text-[13px] leading-none flex items-center">
                    {slice.primary.time}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center z-10 gap-2">
                  <img
                    className="w-4.5 h-4.5 lg:w-5 lg:h-5 object-contain shrink-0"
                    src="/Location pin.svg"
                  />

                  <PrismicNextLink
                    className="text-xs md:text-base lg:text-[13px] leading-none flex hover:text-[#3FD9FB] transition-colors items-center"
                    field={slice.primary.location}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Video */}
          <div className="hidden lg:flex flex-1 items-center rounded-2xl lg:justify-center">
            <div className="w-full z-40 rounded-2xl">
              {showVideo ? (
                <VideoPlayer />
              ) : (
                <PrismicNextImage
                  field={slice.primary.image_or_video}
                  className="w-full aspect-video rounded-2xl object-contain"
                  loading="eager"
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
      {/* <div className="relative  inset-x-0  lg:mt-5 xl:mt-0 h-8 lg:h-30 xl:h-70  ">
       
        <div className="absolute inset-0 blur-2xl overflow-hidden scale-110">
          <img className="w-full h-full object-cover" src="/bg-gradient.svg" />
        </div>

       
        <div className=" hidden lg:block absolute  -top-10 md:-top-3 lg:-top-64 xl:-top-35 inset-x-0 bottom-0 z-10 opacity-65 pointer-events-none">
          <img
            className="scale-[1.15] h-[130%]  md:w-[105%]  md:h-[130%] xl:h-full object-cover mask-image:linear-gradient(to_bottom,transparent_0%,transparent_60%,black_45%,black_100%)] md:[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_0%,black_45%,black_100%)] lg:[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_45%,black_55%,black_100%)] xl:[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_30%,black_55%,black_100%)]"
            src="/toplayer.svg"
            alt="texture"
          />
        </div>
      </div> */}
    </>
  );
};

export default HeroSection;
