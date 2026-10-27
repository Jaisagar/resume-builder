import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
    findApplicationUser,
    updateApplicationUser,
} from "../../../lib/application-users";

export async function POST(request: Request) {
    let body: { email?: string };

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Enter a valid email address." },
            { status: 400 }
        );
    }

    const email = body.email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
            { message: "Enter a valid email address." },
            { status: 400 }
        );
    }

    try {
        const user = await findApplicationUser({ email });
        if (!user) {
            return NextResponse.json({
                message: "If an account exists for that email, a reset link will be sent.",
            });
        }

        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        if (!emailUser || !emailPass) {
            console.error("Password reset email is not configured.");
            return NextResponse.json(
                { message: "Password reset email is temporarily unavailable." },
                { status: 503 }
            );
        }

        const token = randomBytes(32).toString("hex");
        const tokenHash = createHash("sha256").update(token).digest("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        await updateApplicationUser(user, {
            resetTokenHash: tokenHash,
            resetTokenExpiresAt: expiresAt,
        });

        const resetUrl = new URL(
            `/auth/change-password?token=${encodeURIComponent(token)}`,
            request.url
        ).toString();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: emailUser, pass: emailPass },
        });

        await transporter.sendMail({
            from: emailUser,
            to: user.email,
            subject: "Reset your password",
            text: `Use this link to reset your password within one hour: ${resetUrl}`,
            html: `<p>Use this link to reset your password within one hour:</p><p><a href="${resetUrl}">Reset password</a></p>`,
        });

        return NextResponse.json({
            message: "If an account exists for that email, a reset link will be sent.",
        });
    } catch (error) {
        console.error("Password reset request failed:", error);
        return NextResponse.json(
            { message: "Unable to send a password reset link right now." },
            { status: 502 }
        );
    }
}
