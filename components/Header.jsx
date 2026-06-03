"use client";

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import FormModal from "@/components/FormModal";

const navLinks = [
  { label: "Key Takeaways", href: "#for-speakers" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Stage Formats", href: "#stage-formats" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-[#04050F]/80 backdrop-blur-md">
        <div className="mx-auto w-full overflow-hidden mx-auto w-full max-w-[1000px] xl:max-w-[1280px] 2xl:max-w-[1440px] px-6 md:px-14">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="#" className="shrink-0">
              <img
                src="/airsrelogo.svg"
                alt="Logo"
                className="h-auto w-18 lg:w-20 xl:w-18 object-contain"
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
              <PrimaryButton
                className="px-3! py-2! text-xs!"
                buttonText="Get your invite"
                onClick={() => setIsInviteOpen(true)}
              />
            </div>

            {/* Mobile Hamburger */}
            <button
              className="p-1 text-white lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
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
            className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
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
              <div className="mt-2">
                <div className="block w-full lg:hidden">
                  <PrimaryButton
                    className="w-full!  text-sm!"
                    buttonText="Get your invite"
                    onClick={() => setIsInviteOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <FormModal
        type="invite"
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </>
  );
}
