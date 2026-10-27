import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const extensionByType: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
};

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
        return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }

    const extension = extensionByType[file.type];
    if (!extension) {
        return NextResponse.json({ error: "Upload a JPG, PNG, or WebP image." }, { status: 415 });
    }

    if (file.size === 0 || file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image must be smaller than 5 MB." }, { status: 413 });
    }

    const filename = `${randomUUID()}${extension}`;
    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ profilePic: `/uploads/${filename}` });
}