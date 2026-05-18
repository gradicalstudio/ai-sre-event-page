"use client";

import { useState } from "react";

const navLinks = [
  { label: "Agenda", href: "#agenda" },
  { label: "For Attendees", href: "#for-attendees" },
  { label: "Stage Formats", href: "#stage-formats" },
  { label: "For Speakers", href: "#for-speakers" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#04050F]/80 backdrop-blur-md">
      {/* Inner Container */}
      <div className="mx-auto w-full max-w-[1000px] 2xl:max-w-[1320px]   px-4 md:px-6 lg:px-8">
        {/* Navbar Row */}
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <a href="#" className="shrink-0">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors duration-200 hover:bg-white/90">
              CTA
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="p-1 text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // X icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6 border-t border-white/10 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <button className="mt-2 w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-white/90">
              CTA
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
