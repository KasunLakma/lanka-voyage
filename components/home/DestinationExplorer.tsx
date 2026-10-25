"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DESTINATIONS, type Locale3 } from "@/data/destinations";

const TABS = [
    { key: "beaches", icon: "🏖️" },
    { key: "hillCountry", icon: "⛰️" },
    { key: "culture", icon: "🛕" },
    { key: "wildlife", icon: "🐘" },
] as const;

export default function DestinationExplorer() {
    const tc = useTranslations("categories");
    const locale = useLocale() as Locale3;
    const [tab, setTab] = useState<string | null>(null);

    // Click a tab to filter, click it again to show everything
    const list = tab
        ? DESTINATIONS.filter((d) => d.category === tab)
        : DESTINATIONS;

    return (
        <div>
            {/* Category tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto border-b border-line pb-3">
                {TABS.map((c) => (
                    <button
                        key={c.key}
                        onClick={() => setTab(tab === c.key ? null : c.key)}
                        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${tab === c.key
                            ? "bg-ocean-600 text-white"
                            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
                            }`}
                    >
                        <span>{c.icon}</span>
                        {tc(c.key)}
                    </button>
                ))}
            </div>

            {/* Photo cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {list.map((d) => (
                    <Link
                        key={d.slug}
                        href={`/destinations/${d.slug}`}
                        className="group relative block aspect-4/5 overflow-hidden rounded-3xl"
                    >
                        <Image
                            src={d.image}
                            alt={d.name.en}
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                                {tc(d.category)}
                            </span>
                            <h3 className="mt-2 text-xl font-bold">{d.name[locale]}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}