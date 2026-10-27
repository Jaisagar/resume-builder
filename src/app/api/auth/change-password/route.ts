import { NextResponse } from "next/server";
import {
    findApplicationUser,
    updateApplicationUser,
} from "../../../lib/application-users";

type ChangePasswordBody = {
    email?: string;
    currentPassword?: string;
    newPassword?: string;
};

export async function POST(request: Request) {
    let body: ChangePasswordBody;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid request." },
            { status: 400 }
        );
    }

    const email = body.email?.trim().toLowerCase();
    const { currentPassword, newPassword } = body;

    if (!email || !currentPassword || !newPassword || newPassword.length < 8) {
        return NextResponse.json(
            { message: "Enter your email, current password, and a new password of at least 8 characters." },
            { status: 400 }
        );
    }

    try {
        const user = await findApplicationUser({ email });
        if (!user || user.password !== currentPassword) {
            return NextResponse.json(
                { message: "The email or current password is incorrect." },
                { status: 400 }
            );
        }

        await updateApplicationUser(user, { password: newPassword });
        return NextResponse.json({ message: "Your password has been changed." });
    } catch (error) {
        console.error("Password change failed:", error);
        return NextResponse.json(
            { message: "Unable to change your password right now." },
            { status: 502 }
        );
    }
}
