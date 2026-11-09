"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AuthButton from "@/components/auth/AuthButton";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = [
    "destinations",
    "upcoming",
    "articles",
    "directory",
    "map",
    "videos",
    "pricing",
] as const;

export default function Header() {
    const t = useTranslations("nav");
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 px-3 pt-3">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 rounded-full border border-white/40 bg-card/80 px-4 shadow-lg backdrop-blur-xl sm:px-6">
                <Link
                    href="/"
                    className="whitespace-nowrap font-display text-sm font-extrabold tracking-wide text-ink"
                >
                    🌴 LANKA VOYAGE
                </Link>

                <nav className="hidden items-center gap-5 xl:flex">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item}
                            href={`/${item}`}
                            className="whitespace-nowrap text-sm font-medium text-ink hover:text-ocean-600"
                        >
                            {t(item)}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <AuthButton />
                    <button
                        className="rounded-full border border-line bg-card px-3 py-2 xl:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        {open ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="absolute left-3 right-3 top-[4.9rem] mx-auto flex max-w-7xl flex-col rounded-3xl border border-line bg-card/95 p-3 shadow-xl backdrop-blur-xl xl:hidden">
                    {[...NAV_ITEMS, "login", "register"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item}`}
                            onClick={() => setOpen(false)}
                            className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-ocean-50"
                        >
                            {t(item)}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}