"use client";

import { useEffect, useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.TextBlocksSlice} TextBlocksSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextBlocksSlice>} TextBlocksProps
 * @type {import("react").FC<TextBlocksProps>}
 */
const TextBlocks = ({ slice }) => {
  const containerRef = useRef(null);
  const animatedElementsRef = useRef([]);

  // Reset the ref array on every render cycle to prevent memory leaks or dead elements
  animatedElementsRef.current = [];

  const addToRefs = (el) => {
    if (el && !animatedElementsRef.current.includes(el)) {
      animatedElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    // If no elements exist for this variation, skip GSAP initialization
    if (animatedElementsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      animatedElementsRef.current.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 80,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    }, containerRef); // Scopes GSAP selectors/actions to this component container

    return () => ctx.revert();
  }, [slice.variation]); // Re-run effect if variation changes to attach to new elements

  const showSlice = slice.primary.showslice;
  if (!showSlice) return null;

  return (
    <div ref={containerRef}>
      {slice.variation === "default" && (
        <section
          ref={addToRefs}
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="font-sans flex items-center justify-center text-white mx-auto w-full max-w-[1000px] xl:max-w-[1280px] 2xl:max-w-[1440px] px-6 md:px-14 pb-20 md:pb-27 lg:pb-43"
        >
          <div className="flex  items-center w-full mx-auto">
            <div className="text-[28px] flex self-center mx-auto max-w-90 md:max-w-140 md:text-[32px] lg:text-[40px] leading-tight lg:max-w-210 text-balance">
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-left inline">{children}</p>
                  ),
                }}
              />
            </div>
          </div>
        </section>
      )}

      {slice.variation === "textOnMiddle" && (
        <section
          ref={addToRefs}
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="font-sans text-white mx-auto w-full max-w-[1000px] xl:max-w-[1280px] 2xl:max-w-[1440px] px-6 md:px-14 pb-20 md:pb-27 lg:pb-43"
        >
          <div className="flex gap-1 md:gap-3 items-center justify-center w-full ">
            <div className="flex md:gap-3 text-center text-[28px] md:text-[32px] lg:text-[40px] leading-tight  lg:max-w-210 text-balance">
              <PrismicRichText field={slice.primary.heading} />
            </div>
          </div>
        </section>
      )}

      {slice.variation === "headingAndDescription" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="font-sans flex flex-col lg:flex-row lg:gap-20 lg:items-center lg:justify-between text-white mx-auto w-full max-w-[1000px] xl:max-w-[1280px] 2xl:max-w-[1440px] px-6 md:px-14 pb-20 md:pb-27 lg:pb-43"
        >
          {/* Animate Heading block separately */}
          <div
            ref={addToRefs}
            className="flex gap-4 lg:gap-3 lg:mb-0 md:gap-3 mb-17 lg:w-[50%] xl:w-[40%]  "
          >
            <img
              src="/arrow.svg"
              alt="icon"
              className="w-3 lg:self-start lg:mt-2 object-contain md:w-4 lg:w-6"
            />
            <div className="xl:text-balance w-full text-[34px] md:text-[42px] lg:text-[40px] xl:text-[60px] leading-[1.1]">
              <PrismicRichText field={slice.primary.heading} />
            </div>
          </div>

          {/* Animate Description block separately */}
          <div
            ref={addToRefs}
            className="xl:text-xl lg:w-[50%] xl:w-[38%] text-balance"
          >
            <PrismicRichText field={slice.primary.description} />
          </div>
        </section>
      )}
    </div>
  );
};

export default TextBlocks;
