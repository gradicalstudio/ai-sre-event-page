"use client";

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import ModalForm from "@/components/ModalForm";
import ContactForm from "@/components/Form";
import InviteForm from "@/components/InviteForm";
import { PrismicRichText } from "@prismicio/react";
const Form = ({ slice }) => {
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-200"
    >
      <div>
        <PrismicRichText field={slice.primary.heading} />
      </div>

      <div>
        <PrimaryButton
          buttonText="Interested to Speak"
          onClick={() => setIsSpeakerOpen(true)}
        />
        <PrimaryButton
          buttonText="Interested to Join"
          onClick={() => setIsInviteOpen(true)}
        />
      </div>

      {/* Modals sit outside the buttons, at section level */}
      <ModalForm isOpen={isSpeakerOpen} onClose={() => setIsSpeakerOpen(false)}>
        <ContactForm />
      </ModalForm>

      <ModalForm isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)}>
        <InviteForm />
      </ModalForm>
    </section>
  );
};

export default Form;