"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButton from "@/components/auth/AuthButton";

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
        <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
            <Container className="flex h-16 items-center justify-between gap-3">
                <Link href="/" className="text-xl font-bold text-ocean-700">
                    🌴 Lanka Voyage
                </Link>

                <nav className="hidden items-center gap-5 lg:flex">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item}
                            href={`/${item}`}
                            className="text-sm font-medium text-ink hover:text-ocean-600"
                        >
                            {t(item)}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <AuthButton />
                    <button
                        className="rounded-lg border border-line bg-card px-3 py-2 lg:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        {open ? "✕" : "☰"}
                    </button>
                </div>
            </Container>

            {open && (
                <nav className="border-t border-line bg-surface lg:hidden">
                    <Container className="flex flex-col py-2">
                        {[...NAV_ITEMS, "login", "register"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item}`}
                                onClick={() => setOpen(false)}
                                className="py-3 text-base font-medium text-ink"
                            >
                                {t(item)}
                            </Link>
                        ))}
                    </Container>
                </nav>
            )}
        </header>
    );
}