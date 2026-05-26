"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export default function AgendaItem({ item, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const chevronRef = useRef(null);
  useEffect(() => {
    if (defaultOpen && contentRef.current) {
      gsap.set(contentRef.current, {
        display: "block",
        height: "auto",
        opacity: 1,
      });
      gsap.set(chevronRef.current, { rotation: 0 });
    } else {
      if (chevronRef.current) {
        gsap.set(chevronRef.current, { rotation: 180 });
      }
    }
  }, []);

  const hasDescription =
    item.short_description?.length > 0 &&
    item.short_description[0]?.text !== "";
  const hasSpeakers = item.speaker?.url;
  const hasSpeakerTwo = item.speaker_two?.url;
  const isExpandable = hasDescription || hasSpeakers;

  const handleToggle = () => {
    if (!isExpandable) return;
    const content = contentRef.current;

    if (!isOpen) {
      gsap.set(content, { display: "block", height: 0, opacity: 0 });
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(chevronRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(content, { display: "none" }),
      });
      gsap.to(chevronRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    setIsOpen(!isOpen);
  };

  return (
    <div
      className="border-t font-sans border-white/10 mx-4 py-6 cursor-pointer"
      onClick={handleToggle}
    >
      <div
        className="
          grid gap-x-4
          grid-cols-[auto_1fr_auto]
          lg:grid-cols-[5rem_1fr_auto_auto]
        "
      >
        {/* TIME + ICON (mobile: stacked in col 1) */}
        <div className="flex flex-col items-start gap-2 row-start-1">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-[13px] lg:text-base pt-1">
              {item.time}
            </span>
            {item.icon?.url && (
              <div className="lg:hidden">
                <PrismicNextImage field={item.icon} className="h-6 w-auto" />
              </div>
            )}
          </div>
        </div>

        {/* TITLE — col 2, row 1 always */}
        <div className="row-start-1 col-start-2">
          <PrismicRichText
            field={item.title}
            components={{
              heading2: ({ children }) => (
                <span className="text-white text-sm lg:text-lg font-medium">
                  {children}
                </span>
              ),
              paragraph: ({ children }) => (
                <p className="text-white/60 text-xs lg:text-sm leading-relaxed mt-1">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        {/* CHEVRON — visual only, col 3, row 1 */}
        {isExpandable && (
          <div className="row-start-1 col-start-3 lg:col-start-3 lg:pt-1 flex items-center">
            <svg
              ref={chevronRef}
              width="14"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.349979 9.65005C-0.116798 9.18328 -0.116521 8.42634 0.349979 7.95939L7.95915 0.350187C8.42607 -0.11673 9.1829 -0.11673 9.64981 0.350187L17.2589 7.95939C17.7254 8.42633 17.7258 9.18327 17.2589 9.65005C16.7922 10.1168 16.0352 10.1165 15.5683 9.65005L8.80448 2.88622L2.04065 9.65005C1.57371 10.1165 0.816759 10.1168 0.349979 9.65005Z"
                fill="#3FD9FB"
              />
            </svg>
          </div>
        )}

        {/* ICON desktop — col 4, row 1 */}
        {item.icon?.url && (
          <div className="hidden lg:block row-start-1 col-start-4 pt-1 shrink-0">
            <PrismicNextImage field={item.icon} className="h-8 w-auto" />
          </div>
        )}

        {/* EXPANDABLE CONTENT */}
        {isExpandable && (
          <div
            ref={contentRef}
            className="
              hidden overflow-hidden
              row-start-2 col-start-1 col-end-4
              lg:col-start-2 lg:col-end-3
            "
          >
            <div className="pt-3 flex flex-col gap-4">
              {hasDescription && (
                <div className="text-white/60 text-xs md:text-sm leading-relaxed">
                  <PrismicRichText
                    field={item.short_description}
                    components={{
                      list: ({ children }) => (
                        <ul className="list-disc pl-5">{children}</ul>
                      ),
                      listItem: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      ),
                      oList: ({ children }) => (
                        <ol className="list-decimal pl-5">{children}</ol>
                      ),
                      oListItem: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      ),
                    }}
                  />
                </div>
              )}
              {hasSpeakers && (
                <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
                  <div className="flex items-center gap-2">
                    <PrismicNextImage
                      field={item.speaker}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-white/70 text-sm">
                      {item.speaker_name}
                    </span>
                  </div>
                  {hasSpeakerTwo && (
                    <div className="flex items-center gap-2">
                      <PrismicNextImage
                        field={item.speaker_two}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-white/70 text-sm">
                        {item.speaker_two_name}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
