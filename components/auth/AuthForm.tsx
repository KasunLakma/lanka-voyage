"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { AUTH_TEXT } from "@/data/authText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
    const t = AUTH_TEXT[useLocale() as Locale3];
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState<"traveller" | "provider">(
        "traveller",
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setInfo("");

        if (password.length < 8) {
            setError(t.shortPassword);
            return;
        }

        setLoading(true);
        const supabase = createClient();

        if (mode === "login") {
            const { error: err } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (err) {
                setError(err.message);
            } else {
                router.push("/");
                router.refresh();
            }
        } else {
            const { data, error: err } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName, account_type: accountType },
                },
            });
            if (err) {
                setError(err.message);
            } else if (data.session) {
                router.push("/");
                router.refresh();
            } else {
                setInfo(t.checkEmail);
            }
        }
        setLoading(false);
    }

    const isRegister = mode === "register";

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-4 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
        >
            <h1 className="text-3xl font-bold">
                {isRegister ? t.registerTitle : t.loginTitle}
            </h1>

            {isRegister && (
                <>
                    <input
                        type="text"
                        required
                        placeholder={t.fullName}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={inputClass}
                    />

                    <div>
                        <p className="mb-2 text-sm font-medium text-muted">
                            {t.accountType}
                        </p>
                        <div className="grid gap-2">
                            {(["traveller", "provider"] as const).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setAccountType(type)}
                                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${accountType === type
                                            ? "border-ocean-600 bg-ocean-50 text-ocean-800"
                                            : "border-line bg-surface"
                                        }`}
                                >
                                    {type === "traveller" ? "🧳 " : "🏨 "}
                                    {t[type]}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <input
                type="email"
                required
                placeholder={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
            />
            <div>
                <input
                    type="password"
                    required
                    placeholder={t.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                />
                {isRegister && (
                    <p className="mt-1 text-xs text-muted">{t.passwordHint}</p>
                )}
            </div>

            {error && (
                <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                    {error}
                </p>
            )}
            {info && (
                <p className="rounded-xl bg-ocean-50 px-4 py-3 text-sm text-ocean-800">
                    {info}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`${buttonStyles("primary")} disabled:opacity-60`}
            >
                {loading
                    ? t.working
                    : isRegister
                        ? t.submitRegister
                        : t.submitLogin}
            </button>

            <p className="text-center text-sm text-muted">
                {isRegister ? t.haveAccount : t.noAccount}{" "}
                <Link
                    href={isRegister ? "/login" : "/register"}
                    className="font-semibold text-ocean-700 underline"
                >
                    {isRegister ? t.submitLogin : t.submitRegister}
                </Link>
            </p>
        </form>
    );
}