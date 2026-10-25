"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const TABS = [
    { href: "/", icon: "🏠", label: null },
    { href: "/destinations", icon: "🧭", label: "destinations" },
    { href: "/map", icon: "🗺️", label: "map" },
    { href: "/videos", icon: "🎬", label: "videos" },
    { href: "/login", icon: "👤", label: "login" },
] as const;

// Floating bottom menu, visible only on phones and tablets
export default function MobileTabBar() {
    const t = useTranslations("nav");
    const pathname = usePathname();

    return (
        <nav className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between rounded-full bg-slate-900/90 p-1.5 shadow-xl backdrop-blur-md lg:hidden">
            {TABS.map((tab) => {
                const active = pathname === tab.href;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        aria-label={tab.label ? t(tab.label) : "Home"}
                        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-semibold transition ${active ? "bg-gold-400 text-slate-900" : "text-white"
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {active && tab.label && <span>{t(tab.label)}</span>}
                    </Link>
                );
            })}
        </nav>
    );
}