// app/api/links/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createLinkSchema } from "@/lib/validators";

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { created_at: "desc" },
  });
  return NextResponse.json(links);
}

export async function POST(req: Request) {
  console.log("🔵 [POST /api/links] Incoming request");

  try {
    const body = await req.json();
    console.log("📝 Request Body:", body);

    const parsed = createLinkSchema.safeParse(body);

    if (!parsed.success) {
      console.log("❌ Validation Error:", parsed.error.issues);
      return NextResponse.json(
        {
          error: parsed.error.issues
            .map((issue) => issue.message)
            .join(", "),
        },
        { status: 400 }
      );
    }

const { url, code } = parsed.data;

console.log("➡️ Validated URL:", url);
console.log("➡️ Provided Code:", code);

// ⭐ Validate code format if provided
if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
  return NextResponse.json(
    { error: "Invalid code format" },
    { status: 400 }
  );
}

// ⭐ Auto-generate
const shortCode =
  code || Math.random().toString(36).substring(2, 10).slice(0, 6);

console.log("🔧 Final Short Code:", shortCode);

// ⭐ Check duplicate URL
const existingUrl = await prisma.link.findFirst({
  where: { url },
});



if (existingUrl) {
  console.log("❌ Duplicate URL detected:", url);
  return NextResponse.json(
    { error: "This URL is already shortened" },
    { status: 409 }
  );
}

// ⭐ Check duplicate code
const exists = await prisma.link.findUnique({
  where: { code: shortCode },
});

if (exists) {
  console.log("❌ Duplicate code detected:", shortCode);
  return NextResponse.json(
    { error: "Short code already exists" },
    { status: 409 }
  );
}


    // ⭐ Create new entry
    const link = await prisma.link.create({
      data: { url, code: shortCode },
    });

    console.log("✅ Link Created:", link);

    return NextResponse.json(link);
  } catch (e) {
    console.error("🔥 Server Error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

