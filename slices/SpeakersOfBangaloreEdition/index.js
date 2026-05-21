"use client";

import { useEffect, useRef } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.SpeakersOfBangaloreEditionSlice} SpeakersOfBangaloreEditionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SpeakersOfBangaloreEditionSlice>} SpeakersOfBangaloreEditionProps
 * @type {import("react").FC<SpeakersOfBangaloreEditionProps>}
 */

const SpeakersOfBangaloreEdition = ({ slice }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Animation
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 80,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      // LEFT SVG REVEAL
      gsap.fromTo(
        ".left-pattern",
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          opacity: 0.6,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // RIGHT SVG REVEAL
      gsap.fromTo(
        ".right-pattern",
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "right center",
        },
        {
          scaleX: 1,
          opacity: 0.6,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // Individual Cards Animation (Triggers when each card enters the viewport)
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 120,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers individually when the top of each card hits 85% viewport height
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {slice.variation === "default" && (
        <section
          ref={sectionRef}
          id="speakers"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="relative   mx-auto w-full
          max-w-[1000px]
          2xl:max-w-[1320px]
          px-6 md:px-6 lg:px-8
          py-10 md:py-14 lg:py-30 mt-0 lg:-mt-40 xl:mb-15  overflow-hidden  text-white"
        >
          {/* LEFT SVG */}

          <img
            src="/Mask group.svg"
            alt=""
            className=" 
    hidden lg:block
    left-pattern
    pointer-events-none absolute opacity-60
    left-[0px] top-[0px] w-[260px]
    md:left-[-90px] md:top-[-10px] md:w-[420px]
    lg:left-[60px] lg:top-[75px] lg:w-[620px]
    xl:left-[0px] xl:top-[100px] xl:w-[620px]
  "
          />

          {/* RIGHT SVG */}

          <img
            src="/Mask group (1).svg"
            alt=""
            className="
    right-pattern
    hidden lg:block
    pointer-events-none absolute opacity-60
    right-[60px] top-[10px] w-[260px]
    md:right-[-220px] md:top-[-20px] md:w-[420px]
    lg:right-[-190px] lg:top-[80px] lg:w-[620px]
    xl:right-[0px] xl:top-[100px] xl:w-[520px]
  "
          />

          <div className="relative z-10 ">
            {/* HEADING */}

            <div
              ref={headingRef}
              className="
            mb-14 flex items-center justify-center gap-4
            md:mb-20 md:gap-6
            lg:mb-24 lg:gap-8
          "
            >
              {/* LEFT ICON */}

              <img
                src="/speakers.svg"
                alt=""
                className="
              w-[45px]
              shrink-0

              md:w-[70px]

              lg:w-[90px]
            "
              />

              {/* HEADING TEXT */}

              <div
                className="
              max-w-[320px]
              text-left text-3xl leading-[1]

              md:max-w-[500px]
              md:text-[34px]
              lg:text-[40px]
            "
              >
                <PrismicRichText field={slice.primary.heading} />
              </div>
            </div>

            {/* SPEAKERS */}

            <div
              className=" 
            flex flex-wrap items-start justify-center
            gap-x-8 gap-y-14
            md:gap-x-10 md:gap-y-16
          
          "
            >
              {slice.primary.speaker.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="
                group relative
              w-[160px]
md:w-[220px]
lg:w-[200px]
              "
                >
                  {/* IMAGE */}

                  <div
                    className="
                  relative overflow-hidden rounded-full
                  mt-0 h-[160px] w-[160px]
md:mt-8 md:h-[186px] md:w-[186px]
lg:mt-20 
                "
                  >
                    <PrismicNextImage
                      field={item.speaker_image}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="mt-4 md:mt-6 lg:mt-8">
                    {/* NAME */}

                    <h3
                      className="
                    text-base font-medium leading-none text-white
                    md:text-[15px]
                    lg:text-[18px]
                  "
                    >
                      {item.name}
                    </h3>

                    {/* ROLE */}
                    {item.role && (
                      <p
                        className="
    mt-2 text-sm leading-none text-[#8B90A7]
    md:text-base
    lg:mt-3 lg:text-[16px]
  "
                      >
                        {item.role}
                      </p>
                    )}

                    {/* LINKEDIN */}
                    {item.linkedin?.url && (
                      <PrismicNextLink
                        field={item.linkedin}
                        className="
      mt-4 inline-flex
      transition-all duration-300
      hover:scale-110 hover:opacity-80
      lg:mt-6
    "
                      >
                        <img
                          src="/Linkden.svg"
                          alt="LinkedIn"
                          className="
        h-5 w-5
        md:h-6 md:w-6
        lg:h-7 lg:w-7
      "
                        />
                      </PrismicNextLink>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {slice.variation === "secondaryVar" && (
        <section id="speakers" ref={sectionRef} className="px-4 ">
          <div className="flex items-center 2xl:max-w-[1440px] mx-auto  w-full select-none px-2">
            <div className="w-full flex items-center gap-2 md:gap-6 2xl:gap-15 xl:mb-17">
              <div className="flex-1 hidden md:block">
                <img className=" h-full object-cover" src="/left new.svg" />
              </div>
              <div className="text-white text-pretty">
                <div ref={headingRef} className="flex flex-2 gap-3">
                  <img className="w-7 md:w-9 xl:w-11" src="speakers.svg" />
                  <div className="leading-[1.1] text-3xl  md:text-[34px] lg:text-[36px] xl:text-[40px] font-medium">
                    <PrismicRichText field={slice.primary.heading} />
                  </div>
                </div>
              </div>
              <div className="flex-2  hidden md:block">
                <img
                  className="w-full h-full md:object-contain"
                  src="/right new.svg"
                />
              </div>
            </div>
          </div>
          <Bounded className=" text-white mt-17">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit mx-auto gap-20">
              {slice.primary.speaker.map((item, index) => (
                <div
                  ref={(el) => (cardsRef.current[index] = el)}
                  key={index}
                  className="flex  flex-col items-center gap-3"
                >
                  <div className=" overflow-hidden h-40 w-40  rounded-full">
                    <PrismicNextImage
                      field={item.speaker_image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="self-start">
                    <div>
                      <p className="font-medium text-base md:text-sm lg:text-base xl:text-lg">
                        {item.name}
                      </p>
                      <p className=" text-sm md:text-[15px] xl:text-base text-gray-400">
                        {item.role}
                      </p>
                    </div>

                    {item.linkedin?.url && (
                      <div className="flex mt-2 items-center gap-2">
                        <PrismicNextLink field={item.linkedin}>
                          <img src="Linkden.svg" className="w-5 h-5" />
                        </PrismicNextLink>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default SpeakersOfBangaloreEdition;
