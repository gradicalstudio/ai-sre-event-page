"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/prismicio";
import gsap from "gsap";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import ModalButtons from "./ModalButtons";

export default function NavModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const client = createClient();
    client.getSingle("nav_modal").then(setData).catch(console.error);
  }, []);

  // scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      const html = document.documentElement;
      const previousScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = previousScrollBehavior;

      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // GSAP animation
  useEffect(() => {
    if (!isOpen) return;
    gsap
      .timeline()
      .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power4.out" },
        "-=0.1",
      );
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full  max-w-100 md:max-w-170 rounded-2xl border border-white/10 bg-[#040516] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 bg-white rounded-2xl px-1.5 text-[#727272] hover:opacity-70 transition-opacity text-xl font-semibold cursor-pointer z-10"
        >
          ✕
        </button>

        {data && (
          <div className="relative h-fit w-full">
            <img
              className="-z-10 absolute w-30 h-30 md:w-60 md:h-60 right-0 rounded-2xl top-20 xl:top-25"
              src="/navmodalright.png"
            />
            <img
              className="absolute -z-10 h-full rounded-2xl"
              src="/navbottomgradient.png"
            />
            <div className="w-full h-auto p-8 lg:p-12">
              <div className="w-30 h-30 md:w-44 md:h-44">
                <PrismicNextImage
                  field={data.data.logo}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <div>
                  <PrismicNextImage field={data.data.item_one_icon} />
                </div>
                <div className="text-sm lg:text-lg">
                  <PrismicRichText field={data.data.icon_one_text} />
                </div>
              </div>
              <div className="flex gap-3 mt-2 ">
                <div><PrismicNextImage field={data.data.item_two_icon} /></div>
                <div><PrismicNextLink className="text-sm lg:text-lg" field={data.data.item_two_text} /></div>
              </div>
              <div className="mt-7">
                <ModalButtons
                  className={"text-sm!"}
                  field={data.data.cta_link}
                  buttonText={data.data.button_text}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
