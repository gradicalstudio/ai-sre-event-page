"use client";

import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between

          rounded-md
          border
          border-white/15
          bg-transparent

          px-4
          py-[14px]

          text-left
          text-sm
          text-white

          transition-all
          duration-200

          hover:border-white/30

          focus:border-white
          focus:ring-1
          focus:ring-[#45C7F0]
        "
      >
        <span className={value ? "text-white" : "text-white/30"}>
          {value || placeholder}
        </span>

        <svg
          className={`
            h-4
            w-4
            text-white/60
            transition-transform
            duration-200

            ${open ? "rotate-180" : ""}
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`
          absolute
          left-0
          right-0
          z-50
          mt-2

          overflow-hidden
          rounded-md
          border
          border-white/10

          bg-[#0B1020]
          shadow-2xl

          transition-all
          duration-200

          ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }
        `}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
            className="
              w-full
              px-4
              py-3
              text-left
              text-sm
              text-white/80

              transition-colors
              duration-150

              hover:bg-white/5
              hover:text-white
            "
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
