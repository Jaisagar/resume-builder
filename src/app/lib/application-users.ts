const applicationApiUrl =
    process.env.JSON_SERVER_URL ?? "http://localhost:8000";

export interface ApplicationUser {
    id: string | number;
    email: string;
    password: string;
    phone?: string;
    name?: string;
    resetTokenHash?: string | null;
    resetTokenExpiresAt?: string | null;
}

export async function getApplicationUsers(): Promise<ApplicationUser[]> {
    const response = await fetch(`${applicationApiUrl}/application`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to look up accounts.");
    }

    return response.json();
}

export async function createApplicationUser(
    user: Omit<ApplicationUser, "id">
): Promise<void> {
    const response = await fetch(`${applicationApiUrl}/application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Unable to create the account.");
    }
}

export async function findApplicationUser(
    params: Record<string, string>
): Promise<ApplicationUser | null> {
    const query = new URLSearchParams(params);
    const response = await fetch(`${applicationApiUrl}/application?${query.toString()}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to look up the account.");
    }

    const users: ApplicationUser[] = await response.json();
    return users[0] ?? null;
}

export async function updateApplicationUser(
    user: ApplicationUser,
    updates: Partial<ApplicationUser>
): Promise<void> {
    const response = await fetch(
        `${applicationApiUrl}/application/${encodeURIComponent(user.id)}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        }
    );

    if (!response.ok) {
        throw new Error("Unable to update the account.");
    }
}
