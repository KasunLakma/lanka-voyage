"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale3 } from "@/data/destinations";

const LABELS = {
    en: ["Listings", "Videos", "Articles", "Payments", "Upcoming"],
    si: ["ලැයිස්තු", "වීඩියෝ", "ලිපි", "ගෙවීම්", "ඉදිරි ගමනාන්ත"],
    ta: ["பட்டியல்கள்", "காணொளிகள்", "கட்டுரைகள்", "கட்டணங்கள்", "வரவிருப்பவை"],
} as const;

const LINKS = [
    { href: "/admin", icon: "🏨" },
    { href: "/admin/videos", icon: "🎬" },
    { href: "/admin/articles", icon: "📝" },
    { href: "/admin/payments", icon: "💳" },
    { href: "/admin/upcoming", icon: "🗓️" },
];

export default function AdminNav() {
    const locale = useLocale() as Locale3;
    const pathname = usePathname();

    return (
        <nav className="mb-6 flex gap-2 overflow-x-auto rounded-2xl bg-slate-900 p-2">
            {LINKS.map((l, i) => (
                <Link
                    key={l.href}
                    href={l.href}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${pathname === l.href
                            ? "bg-gold-400 text-slate-900"
                            : "text-white hover:bg-white/10"
                        }`}
                >
                    {l.icon} {LABELS[locale][i]}
                </Link>
            ))}
        </nav>
    );
}