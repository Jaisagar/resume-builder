import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const extensionPattern = /\.(pdf|doc|docx)$/i;

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || !extensionPattern.test(file.name)) {
        return NextResponse.json({ error: "Upload a PDF, DOC, or DOCX resume." }, { status: 415 });
    }

    if (file.size === 0 || file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Resume file must be smaller than 10 MB." }, { status: 413 });
    }

    const extension = path.extname(file.name).toLowerCase();
    const filename = `${randomUUID()}${extension}`;
    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ resumeFile: `/uploads/${filename}` });
}