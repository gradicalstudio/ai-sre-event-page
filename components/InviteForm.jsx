"use client";

import { useState } from "react";

export default function InviteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("full_name");
    setSubmittedName(name.split(" ")[0]);

    const payload = {
      fields: [
        { name: "full_name", value: formData.get("full_name") },
        { name: "email", value: formData.get("email") },
        { name: "jobtitle", value: formData.get("jobtitle") },
        { name: "hs_linkedin_url", value: formData.get("hs_linkedin_url") },
        {
          name: "company_size_demo_form",
          value: formData.get("company_size_demo_form"),
        },
      ],
      context: { pageUri: window.location.href, pageName: document.title },
    };

    try {
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/44645340/2fb70a38-3eb0-4688-ab17-b1625e5675f7",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setSubmitted(true); // 👈 swap to success screen
      } else {
        const err = await res.json();
        console.error("HubSpot error:", err);
        alert("Submission failed: " + (err.message || "Unknown error"));
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div>
        <h2>Got it, {submittedName} 🎉</h2>
        <p>
          The AI SRE Next event is invite-only, so our team will reach out to
          you if your registration is approved.
        </p>
        {/* drop your logo image here */}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="full_name" placeholder="Full Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="text" name="jobtitle" placeholder="Job Title" required />
      <input
        type="url"
        name="hs_linkedin_url"
        placeholder="LinkedIn URL"
        required
      />
      <select name="company_size_demo_form" required defaultValue="">
        <option value="" disabled>
          Company Size
        </option>
        <option value="1-10">1–10 employees</option>
        <option value="11-50">11–50 employees</option>
        <option value="51-200">51–200 employees</option>
        <option value="201-500">201–500 employees</option>
        <option value="501+">501+ employees</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
