import { useState } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";

// TODO: Replace this with your real Formspree form endpoint.
// Sign up free at https://formspree.io, create a form, and paste its
// endpoint URL here — it looks like "https://formspree.io/f/xxxxxxxx"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykrlnnj";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target as HTMLFormElement),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        trackNewsletterSignup();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-brand-black text-brand-white py-16">
      <div className="container-abfk text-center max-w-lg">
        <h2 className="text-2xl mb-3">Stay in the Loop</h2>
        <p className="text-brand-white/70 text-sm mb-6">
          Get notified about new drops and restocks before anyone else.
        </p>

        {status === "success" ? (
          <p className="text-brand-gold font-semibold">Thanks — you're on the list!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-brand-black text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-brand-gold text-brand-black px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-brand-white transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-xs mt-3">
            Something went wrong — please check your email and try again.
          </p>
        )}
      </div>
    </section>
  );
}