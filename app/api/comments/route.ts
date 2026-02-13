import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug")?.trim();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { slug },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const text = typeof data?.text === "string" ? data.text : "";
    const image = typeof data?.image === "string" ? data.image : null;
    const slugFromBody = typeof data?.slug === "string" ? data.slug : "";
    const slugFromQuery = request.nextUrl.searchParams.get("slug") ?? "";
    const slug = slugFromBody.trim() || slugFromQuery.trim();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    if (!text.trim() && !image) {
      return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
    }

    let finalImageUrl: string | null = null;

    if (image && image.startsWith("data:image")) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const filename = `upload-${Date.now()}.png`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      finalImageUrl = `/uploads/${filename}`;
    }

    const comment = await prisma.comment.create({
      data: {
        text: text.trim(),
        image: finalImageUrl,
        slug,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id")?.trim();
    const slug = request.nextUrl.searchParams.get("slug")?.trim();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const existing = await prisma.comment.findFirst({
      where: { id, slug },
      select: { id: true, image: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    await prisma.comment.delete({
      where: { id: existing.id },
    });

    if (existing.image?.startsWith("/uploads/")) {
      const localImagePath = path.join(process.cwd(), "public", existing.image.replace(/^\/+/, ""));
      if (fs.existsSync(localImagePath)) {
        fs.unlinkSync(localImagePath);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
