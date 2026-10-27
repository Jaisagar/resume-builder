import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { extractResumeFields, extractResumeText } from "../../../lib/resume-parser";

export const runtime = "nodejs";

const extensionPattern = /\.(pdf|doc|docx)$/i;

export async function POST(request: Request) {
    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return NextResponse.json({ error: "Select a resume file to upload." }, { status: 400 });
    }
    const file = formData.get("file");

    if (!(file instanceof File) || !extensionPattern.test(file.name)) {
        return NextResponse.json({ error: "Upload a PDF, DOC, or DOCX resume." }, { status: 415 });
    }

    if (file.size === 0 || file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Resume file must be smaller than 10 MB." }, { status: 413 });
    }

    const extension = path.extname(file.name).toLowerCase();
    let text: string;
    try {
        text = await extractResumeText(file, extension);
    } catch (error) {
        console.error("Resume extraction failed:", error);
        return NextResponse.json(
            { error: "Could not read this resume. Check that the document is not damaged or password-protected." },
            { status: 422 }
        );
    }

    if (!text.trim()) {
        return NextResponse.json(
            { error: "No readable text was found. Scanned resumes need OCR before they can be autofilled." },
            { status: 422 }
        );
    }

    const resumeData = extractResumeFields(text);
    try {
        const filename = `${randomUUID()}${extension}`;
        const uploadDirectory = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDirectory, { recursive: true });
        await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));

        return NextResponse.json({
            resumeFile: `/uploads/${filename}`,
            resumeData,
        });
    } catch (error) {
        console.error("Resume upload failed:", error);
        return NextResponse.json(
            { error: "The resume was read but could not be saved. Please try again." },
            { status: 500 }
        );
    }
}