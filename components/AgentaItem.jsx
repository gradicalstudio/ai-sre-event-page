"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export default function AgendaItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const chevronRef = useRef(null);

  const hasDescription =
    item.short_description?.length > 0 &&
    item.short_description[0]?.text !== "";
  const hasSpeakers = item.speaker?.url;
  const hasSpeakerTwo = item.speaker_two?.url;
  const isExpandable = hasDescription || hasSpeakers;

  const handleToggle = () => {
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
        rotation: 180,
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
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t font-sans border-white/10 px-4 py-6">
      {/* Main Row - always visible */}
      <div className="flex items-center lg:justify-between w-full   gap-8">
        {/* Time - plain string */}
        <div>
          <span className="text-white text-xs lg:text-base w-16 shrink-0">{item.time}</span>
        </div>

        {/* Title + Chevron */}
        <div className=" w-full lg:w-[50%] flex items-center gap-3">
          <div className="text-white font-medium">
            <PrismicRichText
              field={item.title}
              components={{
                heading2: ({ children }) => (
                  <span className="text-white text-sm lg:text-lg font-medium">
                    {children}
                  </span>
                ),
                paragraph: ({ children }) => (
                  <p className="text-white/60 lg:text-sm leading-relaxed mt-1">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
          {isExpandable && (
            <button
              onClick={handleToggle}
              className="text-cyan-400 shrink-0 rotate-180 "
              aria-label="Toggle details"
            >
              <svg
                ref={chevronRef}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          )}
        </div>

        {/* Icon */}
        {item.icon?.url && (
          <div className="shrink-0 self-end ">
            <PrismicNextImage field={item.icon} className="h-7 lg:h-8 w-auto" />
          </div>
        )}
      </div>

      {/* Expandable Section */}
      {isExpandable && (
        <div
          ref={contentRef}
          className="hidden overflow-hidden mx-auto  lg:w-[72%]  lg:pl-24"
        >
          <div className="pt-3 flex flex-col gap-4">
            {/* Description */}
            {hasDescription && (
              <div className="text-white/60 text-xs  leading-relaxed">
                <PrismicRichText field={item.short_description} />
              </div>
            )}

            {/* Speakers Row */}
            {hasSpeakers && (
              <div className="flex items-center gap-6">
                {/* Speaker 1 */}
                <div className="flex items-center gap-2">
                  <PrismicNextImage
                    field={item.speaker}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-white/70 text-sm">
                    {item.speaker_name}
                  </span>
                </div>

                {/* Speaker 2 */}
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
  );
}
