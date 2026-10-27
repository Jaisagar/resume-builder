import { createHash } from "crypto";
import { NextResponse } from "next/server";
import {
    findApplicationUser,
    updateApplicationUser,
} from "../../../lib/application-users";

type ResetPasswordBody = {
    token?: string;
    newPassword?: string;
};

export async function POST(request: Request) {
    let body: ResetPasswordBody;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid request." },
            { status: 400 }
        );
    }

    const { token, newPassword } = body;
    if (!token || !newPassword || newPassword.length < 8) {
        return NextResponse.json(
            { message: "Choose a password with at least 8 characters." },
            { status: 400 }
        );
    }

    try {
        const resetTokenHash = createHash("sha256").update(token).digest("hex");
        const user = await findApplicationUser({ resetTokenHash });
        if (
            !user ||
            !user.resetTokenExpiresAt ||
            new Date(user.resetTokenExpiresAt).getTime() <= Date.now()
        ) {
            return NextResponse.json(
                { message: "This password reset link is invalid or has expired." },
                { status: 400 }
            );
        }

        await updateApplicationUser(user, {
            password: newPassword,
            resetTokenHash: null,
            resetTokenExpiresAt: null,
        });

        return NextResponse.json({
            message: "Your password has been reset. You can now sign in.",
        });
    } catch (error) {
        console.error("Password reset failed:", error);
        return NextResponse.json(
            { message: "Unable to reset your password right now." },
            { status: 502 }
        );
    }
}
