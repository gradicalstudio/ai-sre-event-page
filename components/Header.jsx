"use client";

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";

import NavModal from "./NavModal";

const navLinks = [
  { label: "Key Takeaways", href: "#for-speakers" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Stage Formats", href: "#stage-formats" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-[#04050F]/80 backdrop-blur-md">
        <div className=" w-full overflow-hidden mx-auto  max-w-250 xl:max-w-7xl 2xl:max-w-360 px-6 md:px-14">
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
            {/* <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div> */}

            {/* Desktop CTA */}
            {/* <div className="hidden lg:block">
              <PrimaryButton
                className="px-3! py-2! text-xs!"
                buttonText="Register for Upcoming AI SRE Event"
                onClick={() => setIsInviteOpen(true)}
              />
            </div> */}

            {/* Mobile CTA (replaces hamburger) */}
            {/* <div className="lg:hidden">
              <PrimaryButton
                className="px-3! py-2! text-xs!"
                buttonText="Register For Upcoming AI SRE Event Meet Up"
                onClick={() => setIsInviteOpen(true)}
              />
            </div> */}
          </div>

          {/* Mobile Menu */}
        </div>
      </nav>

      <NavModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
      {/* <FormModal
        type="invite"
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      /> */}
    </>
  );
}
