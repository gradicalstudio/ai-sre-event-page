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

      // Cards Animation

      gsap.fromTo(
        cardsRef.current,
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
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      // Floating Background Motion

      gsap.to(".left-pattern", {
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".right-pattern", {
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded className="bg-[#04050F] overflow-hidden text-white">
      <section
        ref={sectionRef}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative mt-20 overflow-hidden bg-[#04050F]  text-white"
      >
        {/* LEFT SVG */}

        <img
          src="/Mask group.svg"
          alt=""
          className="
          left-pattern
          pointer-events-none absolute opacity-60
          left-[-120px] top-[0px] w-[260px]
          md:left-[-90px] md:top-[-10px] md:w-[420px]
          lg:left-[20px] lg:top-[-10px] lg:w-[820px]
        "
        />

        {/* RIGHT SVG */}

        <img
          src="/Mask group (1).svg"
          alt=""
          className="
          right-pattern
          pointer-events-none absolute opacity-60
          right-[-10px] top-[-10px] w-[260px]
          md:right-[-220px] md:top-[-20px] md:w-[420px]
          lg:right-[-200px] lg:top-[10px] lg:w-[620px]
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
              md:text-5xl
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
            lg:gap-x-16 lg:gap-y-22
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
lg:w-[300px]
              "
              >
                {/* IMAGE */}

                <div
                  className="
                  relative overflow-hidden rounded-full
                  mt-0 h-[160px] w-[160px]
md:mt-8 md:h-[220px] md:w-[220px]
lg:mt-20 lg:h-[290px] lg:w-[290px]
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
                    md:text-xl
                    lg:text-[28px]
                  "
                  >
                    {item.name}
                  </h3>

                  {/* ROLE */}

                  <p
                    className="
                    mt-2 text-sm leading-none text-[#8B90A7]
                    md:text-base
                    lg:mt-3 lg:text-[20px]
                  "
                  >
                    {item.role}
                  </p>

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
    </Bounded>
  );
};

export default SpeakersOfBangaloreEdition;
