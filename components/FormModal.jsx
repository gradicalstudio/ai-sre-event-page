"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import gsap from "gsap";

const FORM_CONFIG = {
  speaker: {
    title: "Apply to Speak",
    formId: "f2a5d2b4-d35c-4658-b6cd-2f61aa0843a3",
    cta: "Send my Pitch",
  },

  invite: {
    title: "Request Invite to Attend (Delegate)",
    formId: "2fb70a38-3eb0-4688-ab17-b1625e5675f7",
    cta: "Request my seat",
  },
};

export default function FormModal({ isOpen, onClose, type }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [pitchWordCount, setPitchWordCount] = useState(0);
  const [problemCharCount, setProblemCharCount] = useState(0);

  const currentForm = FORM_CONFIG[type];

  const handleClose = () => {
    setSubmitted(false);
    setLoading(false);
    setPitchWordCount(0);
    setProblemCharCount(0);
    setEmailError("");

    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      const html = document.documentElement;

      const previousScrollBehavior = html.style.scrollBehavior;

      html.style.scrollBehavior = "auto";

      window.scrollTo(0, scrollY);

      html.style.scrollBehavior = previousScrollBehavior;

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      },
    ).fromTo(
      modalRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.94,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power4.out",
      },
      "-=0.1",
    );
  }, [isOpen]);

  if (!isOpen) return null;

  const inputStyles = `
    w-full
    rounded-md
    border
    border-white/15
    bg-transparent

    px-4
    py-[14px]

    text-sm
    sm:text-[15px]

    !text-white
    outline-none
    transition-all
    duration-150

    placeholder:text-white/30

    focus:border-white
    focus:ring-1
    focus:ring-[#45C7F0]
  `;

  const labelStyles = `
    mb-1
    block
    text-sm
    text-white/80
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setEmailError("");

    const formData = new FormData(e.target);

    const email = formData.get("email");

    const freeDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "proton.me",
      "aol.com",
    ];

    const domain = email?.split("@")[1]?.toLowerCase();

    if (freeDomains.includes(domain)) {
      setEmailError("Please use your work email address.");
      setLoading(false);
      return;
    }

    const fullName = formData.get("full_name") || "";

    setFirstName(fullName.split(" ")[0]);

    const fields = [
      {
        name: "full_name",
        value: formData.get("full_name"),
      },

      {
        name: "email",
        value: formData.get("email"),
      },

      {
        name: "jobtitle",
        value: formData.get("jobtitle"),
      },

      {
        name: "company",
        value: formData.get("company"),
      },

      {
        name: "hs_linkedin_url",
        value: formData.get("hs_linkedin_url"),
      },
    ];

    if (type === "invite") {
      fields.push(
        {
          name: "company_size_demo_form",
          value: formData.get("company_size_demo_form"),
        },

        {
          name: "what_s_the_ai_sre_problem_you_re_trying_to_solve_right_now_",

          value: formData.get("ai_sre_problem") || "",
        },

        {
          name: "how_did_you_hear_about_ai_sre_next_l",

          value: formData.get("hear_about_event") || "",
        },

        {
          name: "i_d_like_stackgen_to_email_me_about_future_ai_sre_next_editions__india___us_",

          value: formData.get("future_updates") ? "true" : "false",
        },
      );
    }

    if (type === "speaker") {
      fields.push(
        {
          name: "bangalore_attendance",

          value: formData.get("can_you_be_in_bangalore"),
        },

        {
          name: "session_format",

          value: formData.get("format_proposing"),
        },

        {
          name: "talk_title",

          value: formData.get("talk_title"),
        },

        {
          name: "yourpitch",

          value: formData.get("your_pitch"),
        },
      );
    }

    const payload = {
      fields,

      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/44645340/${currentForm.formId}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        setSubmitted(true);
      } else {
        const error = await response.json();

        console.error("HubSpot error details:", JSON.stringify(error, null, 2));

        alert(`Submission failed: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Network error:", err);

      alert("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
           overflow-y-auto
    overscroll-none
   
        bg-black/80
        p-4
        backdrop-blur-sm
      "
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="
          relative
          w-full
          max-w-[600px]
          max-h-[92vh]

          overflow-y-auto
          scrollbar-none

          rounded-[24px]
          md:rounded-2xl

          border
          border-white/10

          bg-[#040516]

          px-5
          py-6

          sm:px-8
          sm:py-8

          md:p-10

          text-left
          text-white

          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="
            absolute

            right-4
            top-4
            text-2xl

            sm:right-5
            sm:top-5
            sm:text-3xl

            md:right-6
            md:top-6

            text-white/80
            transition-opacity
            hover:opacity-70
            font-semibold
            hover:cursor-pointer
          "
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <img
              src="/AI SRE Latest.svg"
              alt="AI SRE Next"
              className="
                mt-6
                mb-6
                w-[110px]

                sm:mb-7
                sm:w-[120px]

                md:mt-8
                md:mb-8
                md:w-[130px]
              "
            />

            <h2
              className="
                w-full
                text-3xl
                font-semibold
                leading-tight
                text-[#45C7F0]

                sm:w-[90%]
                sm:text-[40px]

                md:text-4xl
              "
            >
              {currentForm.title}
            </h2>

            <form
              className="
                mt-8
                flex
                flex-col
                gap-4

                sm:mt-10
                sm:gap-5
              "
              onSubmit={handleSubmit}
            >
              <div>
                <label className={labelStyles}>Full Name *</label>

                <input
                  type="text"
                  name="full_name"
                  placeholder="Asha Iyer"
                  required
                  className={inputStyles}
                />
              </div>

              <div>
                <label className={labelStyles}>Work Email *</label>

                <input
                  type="email"
                  name="email"
                  placeholder="asha@company.com — please use work email, not Gmail"
                  required
                  className={inputStyles}
                />

                {emailError && (
                  <p className="mt-2 text-sm text-red-400">{emailError}</p>
                )}
              </div>

              <div>
                <label className={labelStyles}>Job Title *</label>

                <input
                  type="text"
                  name="jobtitle"
                  placeholder="Director, SRE"
                  required
                  className={inputStyles}
                  spellCheck={false}
                />
              </div>

              <div>
                <label className={labelStyles}>Company *</label>

                <input
                  type="text"
                  name="company"
                  placeholder="InMobi"
                  required
                  className={inputStyles}
                  spellCheck={false}
                />
              </div>

              {type === "invite" && (
                <div>
                  <label className={labelStyles}>Company Size *</label>

                  <select
                    name="company_size_demo_form"
                    required
                    defaultValue=""
                    className={`
                      ${inputStyles}
                      bg-[#040516]
                      appearance-none
                    `}
                  >
                    <option value="" hidden>
                      Select company size
                    </option>

                    <option value="1-20">1-20</option>

                    <option value="21-100">21-100</option>

                    <option value="101-500">101-500</option>

                    <option value="501-1000">501-1000</option>

                    <option value="1001-2500">1001-2500</option>

                    <option value="2501-5000">2501-5000</option>

                    <option value="5000+">5000+</option>
                  </select>
                </div>
              )}

              <div>
                <label className={labelStyles}>LinkedIn URL *</label>

                <input
                  type="url"
                  name="hs_linkedin_url"
                  placeholder="linkedin.com/in/..."
                  required
                  className={inputStyles}
                />
              </div>

              {type === "invite" && (
                <>
                  <div>
                    <label className={labelStyles}>
                      What's the AI SRE problem you're trying to solve right
                      now?
                    </label>

                    <textarea
                      name="ai_sre_problem"
                      rows={4}
                      maxLength={300}
                      placeholder="Alert fatigue, MTTR, on-call load, agent trust..."
                      className={inputStyles}
                      spellCheck={false}
                      onChange={(e) =>
                        setProblemCharCount(e.target.value.length)
                      }
                    />

                    <p className="mt-1 text-right text-xs text-white/40">
                      {problemCharCount}/300
                    </p>
                  </div>

                  <div>
                    <label className={labelStyles}>
                      How did you hear about AI SRE Next?
                    </label>

                    <select
                      name="hear_about_event"
                      defaultValue=""
                      className={`
                        ${inputStyles}
                        bg-[#040516]
                        appearance-none
                      `}
                    >
                      <option value="" hidden>
                        Select option
                      </option>

                      <option value="LinkedIn">LinkedIn</option>

                      <option value="Direct invite">Direct invite</option>

                      <option value="Speaker">Speaker</option>

                      <option value="Press">Press</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {type === "speaker" && (
                <>
                  <div>
                    <label className={labelStyles}>
                      Can you be in Bangalore on Friday, 12 June 2026? *
                    </label>

                    <select
                      name="can_you_be_in_bangalore"
                      required
                      defaultValue=""
                      className={`
                        ${inputStyles}
                        bg-[#040516]
                        appearance-none
                      `}
                    >
                      <option value="" hidden>
                        Select option
                      </option>

                      <option value="Yes">Yes</option>

                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelStyles}>
                      Format you're proposing *
                    </label>

                    <select
                      name="format_proposing"
                      required
                      defaultValue=""
                      className={`
                        ${inputStyles}
                        bg-[#040516]
                        appearance-none
                      `}
                    >
                      <option value="" hidden>
                        Select format
                      </option>

                      <option value="Keynote (25 min)">Keynote (25 min)</option>

                      <option value="Deep-dive Session (20 min + Q&A)">
                        Deep-dive Session (20 min + Q&A)
                      </option>

                      <option value="Panel Discussion">Panel Discussion</option>

                      <option value="Fireside Conversation (30–45 min)">
                        Fireside Conversation (30-45 min)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className={labelStyles}>
                      Working title of your talk *
                    </label>

                    <input
                      type="text"
                      name="talk_title"
                      maxLength={80}
                      placeholder='Be specific. "AI SRE in the Enterprise" is not a title.'
                      required
                      className={inputStyles}
                      spellCheck={false}
                    />
                  </div>

                  <div>
                    <label className={labelStyles}>Your pitch *</label>

                    <textarea
                      name="your_pitch"
                      rows={5}
                      required
                      maxLength={1500}
                      placeholder="Tell us, in one paragraph: what you'll say, the three things the audience will leave with, and why this room is the right room for this talk."
                      className={inputStyles}
                      spellCheck={false}
                      onChange={(e) => {
                        const words = e.target.value
                          .trim()
                          .split(/\s+/)
                          .filter(Boolean);

                        if (words.length <= 200) {
                          setPitchWordCount(words.length);
                        }
                      }}
                    />

                    <p className="mt-1 text-right text-xs text-white/40">
                      {pitchWordCount}/200 words
                    </p>
                  </div>
                </>
              )}

              {type === "invite" && (
                <label className="flex items-start gap-3 text-sm text-white/70">
                  <input
                    type="checkbox"
                    name="future_updates"
                    className="mt-1"
                  />

                  <span>
                    I'd like StackGen to email me about future AI SRE Next
                    editions (India + US).
                  </span>
                </label>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-3
                  rounded-full
                  bg-white
                  px-6
                  py-4
                  font-bold
                  text-black

                  transition-all
                  duration-300

                  hover:bg-[#45C7F0]
                  hover:cursor-pointer

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? "Submitting..." : currentForm.cta}
              </button>

              {type === "invite" && (
                <p className="text-center text-sm text-[#45C7F0]">
                  Seats are confirmed within 48 hours.
                  <br />
                  50 seats total — invite-only.
                </p>
              )}
            </form>
          </>
        ) : (
          <div
            className="
              flex
              min-h-[320px]
              flex-col
              justify-between

              bg-[#040516]

              px-2
              py-4

              sm:px-6
              sm:py-6

              md:px-8
            "
          >
            <div>
              <h2
                className="
                  text-3xl
                  font-semibold
                  leading-tight
                  text-[#45C7F0]

                  sm:text-4xl
                "
              >
                {type === "invite"
                  ? `Got it, ${firstName}. 🎉`
                  : `Thanks, ${firstName}.`}
              </h2>

              <p
                className="
                  mt-5
                  max-w-[520px]

                  text-lg
                  leading-relaxed
                  text-white/90

                  sm:mt-6
                  sm:text-xl
                "
              >
                {type === "invite"
                  ? `The AI SRE Next event is invite-only, so our team will reach out to you if your registration is approved.`
                  : `Sanjeev from the StackGen team will reach out within 2 business days to confirm your slot. The Bangalore edition has 8 speaking slots.`}
              </p>
            </div>

            <img
              src="/AI SRE Latest.svg"
              alt="AI SRE Next"
              className="
                mt-10
                w-[120px]

                sm:mt-12
                sm:w-[140px]
              "
            />
          </div>
        )}
      </div>
    </div>
  );
}
