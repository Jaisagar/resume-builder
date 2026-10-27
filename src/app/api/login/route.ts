import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const response = await fetch(
        `http://localhost:8000/application?email=${body.email}`
    );

    const users = await response.json();

    if (!users.length) {
        return NextResponse.json({
            success: false,
            message: "User not found",
        });
    }

    const user = users[0];

    if (user.password !== body.password) {
        return NextResponse.json({
            success: false,
            message: "Invalid Password",
        });
    }

    return NextResponse.json({
        success: true,
        user,
    });
}