import LoginForm from "../../components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main>
            <h1>User Login</h1>

            <LoginForm />
            <p>
                <Link href="/auth/forgot-password">Forgot password?</Link>
                {" · "}
                <Link href="/auth/change-password">Change password</Link>
            </p>
        </main>
    );
}