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
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#04050F]/80 backdrop-blur-md border-b border-white/10">
      <div className="px-6 lg:px-15 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <img src="/logo.svg" className="h-10 w-auto object-contain" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <button className="bg-white text-black font-medium text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors duration-200">
            CTA
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-1"
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-6 gap-6 border-t border-white/10 pt-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white text-sm transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile CTA */}
          <button className="bg-white text-black font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors duration-200 w-full mt-2">
            CTA
          </button>
        </div>
      </div>
    </nav>
  );
}
