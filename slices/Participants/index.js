"use client";

import { useEffect, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Marquee from "react-fast-marquee";

/**
 * @typedef {import("@prismicio/client").Content.PartnersSlice} PartnersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PartnersSlice>} PartnersProps
 */

const Partners = ({ slice }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    setIsMobile(media.matches);

    const listener = (e) => setIsMobile(e.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  if (!slice.primary.show_slice) return null;

  const companies = slice.primary.companies || [];

  const useMobileMarquee = isMobile && companies.length > 3;

  const Logo = ({ item }) =>
    item.link?.url ? (
      <PrismicNextLink
        field={item.link}
        className="
          flex
          items-center
          justify-center
          w-full
          h-full
        "
      >
        <PrismicNextImage
          field={item.logo}
          className="
            max-h-[40px]
            max-w-[180px]

            w-auto
            h-auto

            object-contain
          "
        />
      </PrismicNextLink>
    ) : (
      <PrismicNextImage
        field={item.logo}
        className="
          max-h-[40px]
          max-w-[180px]

          w-auto
          h-auto

          object-contain
        "
      />
    );

  return (
    <section
      className="
        bg-[#04050F]
        mx-auto
        w-full
        max-w-[1000px]
        2xl:max-w-[1320px]
        px-3
        md:px-6
        lg:px-8
        pb-20
        md:pb-27
        lg:pb-43
      "
    >
      <section
        className="bg-[#04050F] overflow-hidden"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="relative">
          <div className="border border-white/20">
            <div className="flex flex-wrap">
              {/* TITLE */}
              <div
                className="
                  font-mono
                  flex
                  flex-[1_1_25%]

                  min-w-[220px]

                  min-h-[90px]
                  md:min-h-[110px]

                  items-center
                  justify-center

                  border-b
                  border-r
                  border-white/20

                  px-4
                "
              >
                <h2 className="md:hidden text-left uppercase text-[#ff5c35] text-[16px] leading-[1.3] tracking-[0.22em] md:text-[16px]">
                  Companies Participating
                </h2>

                <h2 className="hidden md:block text-left uppercase text-[#ff5c35] text-[15px] leading-[1.3] tracking-[0.22em] md:text-[16px]">
                  Companies
                  <br />
                  Participating
                </h2>
              </div>

              {/* MOBILE MARQUEE */}
              {useMobileMarquee ? (
                <div
                  className="
                    w-full
                    overflow-hidden
                    py-4
                  "
                >
                  <Marquee speed={55} gradient={false}>
                    {companies.map((item, index) => (
                      <div
                        key={index}
                        className="
                          flex
                          items-center
                          justify-center

                          w-[180px]
                          h-[40px]

                          px-8
                          shrink-0
                        "
                      >
                        <Logo item={item} />
                      </div>
                    ))}
                  </Marquee>
                </div>
              ) : (
                <>
                  {companies.map((item, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        flex-[1_1_25%]

                        min-w-[220px]

                        min-h-[90px]
                        md:min-h-[110px]

                        items-center
                        justify-center

                        border-r
                        border-b
                        border-white/20

                        px-6
                      "
                    >
                      <Logo item={item} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* CORNERS */}

          <img
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute top-0 left-0 -rotate-90"
          />

          <img
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute top-0 right-0"
          />

          <img
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute bottom-0 right-0 rotate-90"
          />

          <img
            src="/Rectangle 574056928.svg"
            alt=""
            className="absolute bottom-0 left-0 rotate-180"
          />
        </div>
      </section>
    </section>
  );
};

export default Partners;
