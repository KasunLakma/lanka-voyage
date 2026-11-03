"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

// Home page search box: searches the business directory by name
export default function HeroSearch() {
    const t = useTranslations("hero");
    const router = useRouter();
    const [q, setQ] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const text = q.trim().slice(0, 60);
        router.push(text ? `/directory?q=${encodeURIComponent(text)}` : "/directory");
    }

    return (
        <form
            onSubmit={submit}
            className="absolute inset-x-4 bottom-8 mx-auto flex max-w-3xl items-center gap-2 rounded-full border border-white/40 bg-white/15 p-2 backdrop-blur-md"
        >
            <span className="pl-3 text-lg" aria-hidden>
                🔍
            </span>
            <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-white outline-none placeholder:text-white/70"
            />
            <button
                type="submit"
                className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-gold-400"
            >
                {t("searchButton")}
            </button>
        </form>
    );
}