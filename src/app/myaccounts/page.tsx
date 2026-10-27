"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AccountUser = {
  id?: number | string;
  name?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
};

type ResumeRecord = {
  id: number | string;
  firstname?: string;
  lastname?: string;
  email?: string;
  summary?: string;
  jobtitle?: string;
  organizationname?: string;
  experiences?: unknown[];
};

export default function MyAccountsPage() {
  const router = useRouter();
  const [user, setUser] = useState<AccountUser | null>(null);
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [error, setError] = useState("");

  const loadResumes = async (email: string, signal?: AbortSignal) => {
    setIsLoadingResumes(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8000/users?email=${encodeURIComponent(email)}`,
        { signal }
      );
      if (!response.ok) throw new Error("Could not load your resumes.");

      const data = await response.json() as ResumeRecord[];
      setResumes(Array.isArray(data) ? data.filter((record) => (
        Boolean(record.firstname || record.lastname || record.summary || record.jobtitle || record.experiences?.length)
      )) : []);
    } catch (loadError) {
      if (loadError instanceof Error && loadError.name === "AbortError") return;
      setError(loadError instanceof Error ? loadError.message : "Could not load your resumes.");
      setResumes([]);
    } finally {
      if (!signal?.aborted) setIsLoadingResumes(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      setIsLoadingUser(false);
      return;
    }

    try {
      const account = JSON.parse(savedUser) as AccountUser;
      setUser(account);
      if (account.email) {
        const controller = new AbortController();
        void loadResumes(account.email, controller.signal);
        setIsLoadingUser(false);
        return () => controller.abort();
      }
      setIsLoadingUser(false);
    } catch {
      localStorage.removeItem("user");
      setIsLoadingUser(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const displayName = user?.name || [user?.firstname, user?.lastname].filter(Boolean).join(" ");

  if (isLoadingUser) {
    return <main className="container py-5"><p role="status">Loading account...</p></main>;
  }

  if (!user) {
    return (
      <section className="space">
        <div className="container">
          <h1>My Account</h1>
          <p>Sign in to view your account and saved resumes.</p>
          <Link className="btn" href="/login">Sign in</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h1>My Account</h1>
            <p className="mb-0">{displayName || user.email}</p>
          </div>
          <div className="d-flex gap-2">
            <Link className="btn" href="/resume">Create Resume</Link>
            <button type="button" className="btn btn-secondary" onClick={handleSignOut}>Sign out</button>
          </div>
        </div>

        <section className="mb-5" aria-labelledby="account-details-heading">
          <h2 id="account-details-heading">Account Details</h2>
          <dl className="row">
            <dt className="col-sm-3">Name</dt>
            <dd className="col-sm-9">{displayName || "Not provided"}</dd>
            <dt className="col-sm-3">Email</dt>
            <dd className="col-sm-9">{user.email || "Not provided"}</dd>
            <dt className="col-sm-3">Phone</dt>
            <dd className="col-sm-9">{user.phone || "Not provided"}</dd>
          </dl>
        </section>

        <section aria-labelledby="saved-resumes-heading">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 id="saved-resumes-heading" className="mb-0">Saved Resumes</h2>
            <span>{resumes.length} {resumes.length === 1 ? "resume" : "resumes"}</span>
          </div>

          {isLoadingResumes && <p role="status">Loading your resumes...</p>}
          {error && (
            <div role="alert">
              <p>{error}</p>
              <button type="button" className="btn btn-secondary" onClick={() => user.email && void loadResumes(user.email)}>
                Retry
              </button>
            </div>
          )}
          {!isLoadingResumes && !error && resumes.length === 0 && (
            <p>You have no saved resumes yet.</p>
          )}

          <div className="row">
            {resumes.map((resume) => {
              const resumeName = [resume.firstname, resume.lastname].filter(Boolean).join(" ");
              return (
                <div className="col-md-6 col-lg-4 mb-3" key={resume.id}>
                  <article className="border p-3 h-100">
                    <h3>{resumeName || "Resume"}</h3>
                    {resume.jobtitle && <p className="mb-1">{resume.jobtitle}</p>}
                    {resume.organizationname && <p className="mb-1">{resume.organizationname}</p>}
                    {resume.summary && <p>{resume.summary}</p>}
                    <Link className="btn" href={`/viewresume/${resume.id}`}>View Resume</Link>
                    <Link className="btn btn-secondary ms-2" href={`/editresume/${resume.id}`}>Edit Resume</Link>
                  </article>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}