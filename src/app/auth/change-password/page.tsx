import { Suspense } from "react";
import { ChangePasswordForm } from "../../../components/auth/PasswordForms";

export default function ChangePasswordPage() {
    return (
        <Suspense fallback={<p className="container py-5">Loading password form...</p>}>
            <ChangePasswordForm />
        </Suspense>
    );
}
