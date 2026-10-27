import { NextResponse } from "next/server";
import {
    createApplicationUser,
    getApplicationUsers,
} from "../../lib/application-users";

type RegistrationBody = {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
};

function normalizePhone(phone: string) {
    return phone.replace(/\D/g, "");
}

export async function POST(request: Request) {
    let body: RegistrationBody;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid registration request." },
            { status: 400 }
        );
    }

    if (!body || typeof body !== "object") {
        return NextResponse.json(
            { message: "Invalid registration request." },
            { status: 400 }
        );
    }

    if (
        typeof body.name !== "string" ||
        typeof body.email !== "string" ||
        typeof body.phone !== "string" ||
        typeof body.password !== "string"
    ) {
        return NextResponse.json(
            { message: "Name, email, phone number, and password are required." },
            { status: 400 }
        );
    }

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const password = body.password;

    if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        normalizePhone(phone).length < 7 ||
        normalizePhone(phone).length > 15 ||
        password.length < 8
    ) {
        return NextResponse.json(
            { message: "Enter a valid name, email, phone number, and password with at least 8 characters." },
            { status: 400 }
        );
    }

    try {
        const users = await getApplicationUsers();
        const emailExists = users.some(
            (user) => user.email.trim().toLowerCase() === email
        );
        if (emailExists) {
            return NextResponse.json(
                { message: "This email address is already registered. Please log in instead." },
                { status: 409 }
            );
        }

        const phoneNumber = normalizePhone(phone);
        const phoneExists = users.some(
            (user) => user.phone && normalizePhone(user.phone) === phoneNumber
        );
        if (phoneExists) {
            return NextResponse.json(
                { message: "This phone number is already registered. Use a different number." },
                { status: 409 }
            );
        }

        await createApplicationUser({ name, email, phone, password });

        return NextResponse.json(
            { message: "Registration successful. You can now log in." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration failed:", error);
        return NextResponse.json(
            { message: "Unable to register right now. Please try again." },
            { status: 502 }
        );
    }
}