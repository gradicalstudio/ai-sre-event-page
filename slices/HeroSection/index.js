"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import FormModal from "@/components/FormModal";

/**
 * @typedef {import("@prismicio/client").Content.HeroSectionSlice} HeroSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSectionSlice>} HeroSectionProps
 * @type {import("react").FC<HeroSectionProps>}
 */

const HeroSection = ({ slice }) => {
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" min-h-screen
  bg-[#040516]
  flex
  flex-col
  items-center
  justify-center
  gap-6
  px-6
  text-center
  text-white"
    >
      <div className="max-w-4xl">
        <PrismicRichText field={slice.primary.heading} />
      </div>

      <div className="max-w-2xl">
        <PrismicRichText field={slice.primary.description} />
      </div>

      <div className="flex gap-4 text-sm">
        <p>{slice.primary.time}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        <PrimaryButton
          buttonText="Request invite to attend"
          onClick={() => setIsInviteOpen(true)}
        />

        <SecondaryButton
          buttonText="Speak at AI SRE Next"
          onClick={() => setIsSpeakerOpen(true)}
        />
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
  );
};

export default HeroSection;
