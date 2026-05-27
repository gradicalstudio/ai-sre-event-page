import { NextResponse } from "next/server";

const FORM_IDS = {
  invite: "2fb70a38-3eb0-4688-ab17-b1625e5675f7",
  speaker: "f2a5d2b4-d35c-4658-b6cd-2f61aa0843a3",
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type") || "invite";

    const formId = FORM_IDS[type];

    if (!formId) {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.hubapi.com/marketing/v3/forms/${formId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("HubSpot fetch error:", error);

    return NextResponse.json(
      { error: "Failed to fetch form schema" },
      { status: 500 },
    );
  }
}
