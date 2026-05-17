"use client";

export default function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      fields: [
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
          name: "hs_linkedin_url",
          value: formData.get("hs_linkedin_url"),
        },
        {
          name: "company_size_demo_form",
          value: formData.get("company_size_demo_form"),
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const response = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/44645340/2fb70a38-3eb0-4688-ab17-b1625e5675f7",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        alert("Form submitted successfully!");
        e.target.reset();
      } else {
        const error = await response.json();
        console.error("HubSpot error details:", JSON.stringify(error, null, 2));
        alert(`Submission failed: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("A network error occurred. Please try again.");
    }
  };

  return (
    <form className="flex w-fit flex-col" onSubmit={handleSubmit}>
      <input type="text" name="full_name" placeholder="Full Name" required />

      <input type="email" name="email" placeholder="Email" required />

      <input type="text" name="jobtitle" placeholder="Job Title" required />

      <input
        type="url"
        name="hs_linkedin_url"
        placeholder="LinkedIn URL (https://linkedin.com/in/...)"
        required
      />

      <select name="company_size_demo_form" required defaultValue="">
        <option value="" disabled>
          Company Size
        </option>
        <option value="1-10">1-10 employees</option>
        <option value="11-50">11-50 employees</option>
        <option value="51-200">51-200 employees</option>
        <option value="201-500">201-500 employees</option>
        <option value="501+">501+ employees</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
