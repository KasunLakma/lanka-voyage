"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const TABS = [
    { href: "/", icon: "🏠", label: null, aria: "Home" },
    { href: "/destinations", icon: "🧭", label: "destinations", aria: "" },
    { href: "/map", icon: "🗺️", label: "map", aria: "" },
    { href: "/videos", icon: "🎬", label: "videos", aria: "" },
    { href: "/account", icon: "👤", label: null, aria: "Account" },
] as const;

const ACCOUNT_PAGES = ["/account", "/saved", "/login", "/register"];

// Floating bottom menu, visible only on phones and tablets
export default function MobileTabBar() {
    const t = useTranslations("nav");
    const pathname = usePathname();

    return (
        <nav className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex items-center justify-between rounded-full bg-slate-900/90 p-1.5 shadow-xl backdrop-blur-md lg:hidden">
            {TABS.map((tab) => {
                const active =
                    tab.href === "/account"
                        ? ACCOUNT_PAGES.includes(pathname)
                        : pathname === tab.href;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        aria-label={tab.label ? t(tab.label) : tab.aria}
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