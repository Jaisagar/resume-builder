"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password }),
            });
            const result = await response.json();
            if (!response.ok) {
                setIsError(true);
                setMessage(result.message ?? "Unable to register.");
                return;
            }

            setIsError(false);
            setMessage(result.message);
            router.push("/login");
        } catch {
            setIsError(true);
            setMessage("Unable to register. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="container py-5" style={{ maxWidth: 520 }}>
            <h1>Create an account</h1>
            <p>Register with a unique email address and phone number.</p>
            <form onSubmit={submit}>
                <label className="form-label" htmlFor="register-name">Full name</label>
                <input
                    className="form-control mb-3"
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                <label className="form-label" htmlFor="register-email">Email address</label>
                <input
                    className="form-control mb-3"
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label className="form-label" htmlFor="register-phone">Phone number</label>
                <input
                    className="form-control mb-3"
                    id="register-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
                <label className="form-label" htmlFor="register-password">Password</label>
                <input
                    className="form-control mb-3"
                    id="register-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                {message && (
                    <p className={isError ? "text-danger" : "text-success"} role="status">
                        {message}
                    </p>
                )}
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
            <p className="mt-3">
                Already registered? <Link href="/login">Log in</Link>
            </p>
        </section>
    );
}
