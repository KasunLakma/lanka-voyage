"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LANGS = [
    { code: "en", label: "EN" },
    { code: "si", label: "සිං" },
    { code: "ta", label: "தமி" },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div
            className="flex rounded-full border border-line bg-card p-0.5 text-sm"
            role="group"
            aria-label="Language"
        >
            {LANGS.map((l) => (
                <button
                    key={l.code}
                    onClick={() => router.replace(pathname, { locale: l.code })}
                    className={`rounded-full px-3 py-1 font-medium transition ${locale === l.code
                            ? "bg-ocean-600 text-white"
                            : "text-ink hover:bg-ocean-50"
                        }`}
                >
                    {l.label}
                </button>
            ))}
        </div>
    );
}