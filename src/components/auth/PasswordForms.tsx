"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

function AuthMessage({
    message,
    isError,
}: {
    message: string;
    isError: boolean;
}) {
    if (!message) return null;

    return (
        <p className={isError ? "text-danger" : "text-success"} role="status">
            {message}
        </p>
    );
}

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            setIsError(!response.ok);
            setMessage(result.message ?? "Unable to request a reset link.");
        } catch {
            setIsError(true);
            setMessage("Unable to request a reset link. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="container py-5" style={{ maxWidth: 520 }}>
            <h1>Forgot your password?</h1>
            <p>Enter your account email and we&apos;ll send you a password reset link.</p>
            <form onSubmit={submit}>
                <label className="form-label" htmlFor="forgot-email">Email address</label>
                <input
                    className="form-control mb-3"
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <AuthMessage message={message} isError={isError} />
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send reset link"}
                </button>
            </form>
            <p className="mt-3"><Link href="/login">Back to login</Link></p>
        </section>
    );
}

export function ChangePasswordForm() {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get("token");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        if (newPassword !== confirmPassword) {
            setIsError(true);
            setMessage("The new passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(
                resetToken ? "/api/auth/reset-password" : "/api/auth/change-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        resetToken
                            ? { token: resetToken, newPassword }
                            : { email, currentPassword, newPassword }
                    ),
                }
            );
            const result = await response.json();
            setIsError(!response.ok);
            setMessage(result.message ?? "Unable to update your password.");
            if (response.ok) {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch {
            setIsError(true);
            setMessage("Unable to update your password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="container py-5" style={{ maxWidth: 520 }}>
            <h1>{resetToken ? "Reset your password" : "Change your password"}</h1>
            <form onSubmit={submit}>
                {!resetToken && (
                    <>
                        <label className="form-label" htmlFor="change-email">Email address</label>
                        <input
                            className="form-control mb-3"
                            id="change-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label className="form-label" htmlFor="current-password">Current password</label>
                        <input
                            className="form-control mb-3"
                            id="current-password"
                            type="password"
                            autoComplete="current-password"
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.target.value)}
                            required
                        />
                    </>
                )}
                <label className="form-label" htmlFor="new-password">New password</label>
                <input
                    className="form-control mb-3"
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    required
                />
                <label className="form-label" htmlFor="confirm-password">Confirm new password</label>
                <input
                    className="form-control mb-3"
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
                <AuthMessage message={message} isError={isError} />
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : resetToken ? "Reset password" : "Change password"}
                </button>
            </form>
            <p className="mt-3"><Link href="/login">Back to login</Link></p>
        </section>
    );
}
