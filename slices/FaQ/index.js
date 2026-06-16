"use client";

import FaqItem from "@/components/FaqItem";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PrismicRichText } from "@prismicio/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.FaQSlice} FaQSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FaQSlice>} FaQProps
 * @type {import("react").FC<FaQProps>}
 */

const FaQ = ({ slice }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);
  const showSlice = slice?.primary?.show_slice ?? true;
  useEffect(() => {
    if (!showSlice) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 767;

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: isMobile ? "top 90%" : "top 75%",
            once: true,
          },
        },
      );

      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 80, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: isMobile ? "top 95%" : "top 90%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [showSlice]);
  if (!showSlice) {
    return null;
  }
  return (
    <section
      ref={sectionRef}
      id="faq"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="scrollbar-none relative flex my-3 md:my-10 lg:my-12 items-center justify-center h-175 md:h-150  lg:h-300  "
    >
      {/* Left Gradient */}
      <img
        src="/LeftGPng.png"
        alt=""
        className="absolute  left-0 top-0  w-15 md:w-30 lg:w-50 xl:w-60 2xl:w-75  pointer-events-none  select-none h-full "
      />

      {/* Right Gradient */}
      <img
        src="/RightGPng.png"
        alt=""
        className="absolute right-0 top-0   w-15 md:w-30 lg:w-50 xl:w-60  2xl:w-75 pointer-events-none  select-none h-full"
      />

      {/* Content */}
      <div className=" relative z-10 px-15 2xl:max-w-360  md:px-30 lg:px-50 w-full xl:h-170  ">
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-white font-medium text-3xl lg:text-[38px] mb-10 lg:mb-16"
        >
          <PrismicRichText field={slice.primary.heading} />
        </div>

        {/* FAQ Items */}
        <div>
          {slice.primary.faq.map((item, index) => (
            <div key={index} ref={(el) => (itemsRef.current[index] = el)}>
              <FaqItem
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaQ;
