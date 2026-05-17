"use client";

import { useEffect } from "react"; 

export default function ModalForm({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}


// // Speaker slice
// <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)}>
//   <SpeakerForm />
// </ModalForm>

// // Participant slice
// <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)}>
//   <ParticipantForm />
// </ModalForm>