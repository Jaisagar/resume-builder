"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const submitHandler = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const response = await fetch(
            "/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        if (data.success) {
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            router.push("/dashboard");
        } else {
            alert(data.message);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        email: e.target.value,
                    })
                }
            />

            <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        password: e.target.value,
                    })
                }
            />

            <button type="submit">
                Login
            </button>
        </form>
    );
}