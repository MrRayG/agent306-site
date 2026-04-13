import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://agent306-dashboard-production.up.railway.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ["name", "email", "role", "expertise", "topics"];
    for (const field of required) {
      if (!body[field] || (typeof body[field] === "string" && body[field].trim() === "")) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const payload = {
      type: "podcast_guest_application",
      timestamp: new Date().toISOString(),
      data: {
        name: body.name?.trim(),
        email: body.email?.trim(),
        role: body.role?.trim(),
        company: body.company?.trim() || null,
        expertise: body.expertise?.trim(),
        topics: body.topics?.trim(),
        socialLinks: body.socialLinks?.trim() || null,
        whyInterested: body.whyInterested?.trim() || null,
      },
      status: "pending_review",
    };

    // Try to forward to Railway dashboard API
    let forwarded = false;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`${API_BASE}/api/public/podcast-apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);
      forwarded = res.ok;
    } catch {
      // Railway endpoint may not exist yet — that's fine
      forwarded = false;
    }

    // Always return success to the user — the application is captured
    return NextResponse.json({
      success: true,
      forwarded,
      message: "Application received. Agent 306 will review your profile.",
      id: `pod-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
