"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale3 } from "@/data/destinations";
import { type Dest, destImage, destName } from "@/lib/destinations";
import DestImage from "./DestImage";

const ICONS: Record<string, string> = {
    beaches: "🏖️",
    hillCountry: "⛰️",
    culture: "🛕",
    wildlife: "🐘",
    waterfalls: "💧",
    food: "🍛",
    nightlife: "🌙",
    wellness: "🧘",
    adventure: "🏄",
    festivals: "🎉",
};

export default function DestinationExplorer({ items }: { items: Dest[] }) {
    const tc = useTranslations("categories");
    const locale = useLocale() as Locale3;
    const [tab, setTab] = useState<string | null>(null);

    // Only show tabs for categories that have a destination
    const tabs = Object.keys(ICONS).filter((k) =>
        items.some((d) => d.category === k),
    );
    const list = tab ? items.filter((d) => d.category === tab) : items;

    return (
        <div>
            <div className="mb-6 flex gap-2 overflow-x-auto border-b border-line pb-3">
                {tabs.map((key) => (
                    <button
                        key={key}
                        onClick={() => setTab(tab === key ? null : key)}
                        className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${tab === key
                                ? "bg-ocean-600 text-white"
                                : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
                            }`}
                    >
                        <span>{ICONS[key]}</span>
                        {tc(key)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {list.map((d) => (
                    <Link
                        key={d.slug}
                        href={`/destinations/${d.slug}`}
                        className="group relative block aspect-4/5 overflow-hidden rounded-3xl"
                    >
                        <DestImage
                            src={destImage(d.image)}
                            alt={d.name_en}
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                                {tc(d.category)}
                            </span>
                            <h3 className="mt-2 text-xl font-bold">{destName(d, locale)}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}