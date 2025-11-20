// app/api/links/[code]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ code: string }> }
) {
  console.log("🗑️ DELETE /api/links/[code] called");

  const { code } = await context.params;
  console.log("➡️ Delete request for code:", code);

  try {
    await prisma.link.delete({
      where: { code },
    });

    console.log("✅ Successfully deleted:", code);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.log("❌ Delete failed for:", code, "Error:", e);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ code: string }> }
) {
  console.log("📥 GET /api/links/[code] called");

  const { code } = await context.params;
  console.log("➡️ Fetching link for code:", code);

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    console.log("❌ Not found:", code);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  console.log("📤 Link found:", link);
  return NextResponse.json(link);
}
