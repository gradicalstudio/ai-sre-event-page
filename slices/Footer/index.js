"use client";

import { useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import FormModal from "@/components/FormModal";
import Bounded from "@/components/Bounded";
/**
 * @typedef {import("@prismicio/client").Content.FooterSlice} FooterSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FooterSlice>} FooterProps
 * @type {import("react").FC<FooterProps>}
 */
const Footer = ({ slice }) => {
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  return (
    <Bounded className="bg-[#04050F] mt-10 md:mt-40 text-white">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#04050F]  text-white"
      >
        <div className="flex flex-col w-full  lg:flex-row lg:justify-between gap-15 lg:gap-30 ">
          {/* LEFT — Logos + AI SRE NEXT image */}
          <div className="lg:w-[44%]">
            <PrismicNextImage
              field={slice.primary.logos}
              className="w-full object-cover"
            />
          </div>

          {/* RIGHT — Buttons + Info + Description */}
          <div className="flex flex-col gap-10 lg:gap-6.5  lg:justify-between">
            {/* Buttons */}
            <div className="flex flex-col lg:flex-row xl:flex-row gap-4">
              <PrimaryButton
                className="text-[14px]! xl:text-[16px]! w-full!  md:px-8!  lg:px-5! lg:py-1! lg:h-10! lg:text-[14px]! lg:text-nowrap xl:px-8! xl:h-12! xl:py-3!  xl:text-base!"
                buttonText="Request invite to attend"
                onClick={() => setIsInviteOpen(true)}
              />

              <SecondaryButton
                className="py-3.5! w-full!  md:px-8! md:py-3.5! lg:px-10! lg:py-1! flex justify-center items-center leading-none text-[14px]! xl:text-[16px]! lg:text-nowrap "
                buttonText="Apply to Speak"
                onClick={() => setIsSpeakerOpen(true)}
              />
            </div>

            {/* Date, Location, Time */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-10">
                {/* Date */}
                <div className="flex text-xs md:text-base lg:text-sm xl:text-lg items-center gap-2">
                  <img src="/calender.svg" className="w-4 lg:w-5" />
                  <p>{slice.primary.date_text}</p>
                </div>
                {/* Location */}
                <div className="flex text-xs md:text-base lg:text-sm items-center xl:text-lg hover:text-[#3FD9FB] transition-colors  gap-2">
                  <img src="/Location pin.svg" className="w-3.5 lg:w-4" />
                  <PrismicNextLink field={slice.primary.location} />
                </div>
              </div>
              {/* Time */}
              <div className="flex text-xs md:text-base lg:text-sm xl:text-lg items-center gap-2">
                <img src="clock.svg" className="w-4 lg:w-5" />
                <p>{slice.primary.time_text}</p>
              </div>
            </div>

            {/* Description with link */}
            <div className="text-white font-mono text-sm md:text-lg lg:text-sm xl:text-lg leading-relaxed max-w-md">
              <PrismicRichText
                field={slice.primary.description_with_link}
                components={{
                  hyperlink: ({ children, node }) => (
                    <PrismicNextLink
                      field={node.data}
                      className="text-white underline underline-offset-2"
                    >
                      {children}
                    </PrismicNextLink>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        {/* Modals */}
        <FormModal
          type="speaker"
          isOpen={isSpeakerOpen}
          onClose={() => setIsSpeakerOpen(false)}
        />
        <FormModal
          type="invite"
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
        />
      </section>
    </Bounded>
  );
};

export default Footer;
