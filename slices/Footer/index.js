"use client";

import { useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import FormModal from "@/components/FormModal";
/**
 * @typedef {import("@prismicio/client").Content.FooterSlice} FooterSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FooterSlice>} FooterProps
 * @type {import("react").FC<FooterProps>}
 */
const Footer = ({ slice }) => {
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#04050F] px-6 lg:px-35 py-16 lg:py-24 w-full text-white"
    >
      <div className="flex flex-col w-full  lg:flex-row lg:justify-between gap-15 lg:gap-30 ">
        {/* LEFT — Logos + AI SRE NEXT image */}
        <div className="lg:w-[44%]">
          <img className="w-full object-cover" src="/logo.svg" />
        </div>

        {/* RIGHT — Buttons + Info + Description */}
        <div className="flex flex-col gap-10 lg:justify-between">
          {/* Buttons */}
          <div className="flex flex-col lg:flex-row gap-4">
            <PrimaryButton
              buttonText="Request invite to attend"
              onClick={() => setIsInviteOpen(true)}
            />
            <SecondaryButton
              buttonText="Apply to Speak"
              onClick={() => setIsSpeakerOpen(true)}
            />
          </div>

          {/* Date, Location, Time */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-10">
              {/* Date */}
              <div className="flex lg:text-lg items-center gap-2">
                <img src="/calender.svg" className="w-4 lg:w-5" />
                <PrismicNextLink field={slice.primary.date} />
              </div>
              {/* Location */}
              <div className="flex lg:text-lg items-center gap-2">
                <img src="/Location pin.svg" className="w-3.5 lg:w-4" />
                <PrismicNextLink field={slice.primary.location} />
              </div>
            </div>
            {/* Time */}
            <div className="flex lg:text-lg items-center gap-2">
              <img src="clock.svg" className="w-4 lg:w-5" />
              <PrismicNextLink field={slice.primary.time} />
            </div>
          </div>

          {/* Description with link */}
          <div className="text-white font-mono text-lg leading-relaxed max-w-md">
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
  );
};

export default Footer;
