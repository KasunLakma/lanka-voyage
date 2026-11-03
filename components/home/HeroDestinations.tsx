"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale3 } from "@/data/destinations";
import { type Dest, destImage, destName } from "@/lib/destinations";
import DestImage from "./DestImage";
import HeroSearch from "./HeroSearch";

export default function HeroDestinations({ items }: { items: Dest[] }) {
    const t = useTranslations("hero");
    const locale = useLocale() as Locale3;
    const [active, setActive] = useState(0);

    if (items.length === 0) {
        return (
            <section className="relative bg-linear-to-br from-ocean-800 via-ocean-600 to-tea-500 px-4 pb-32 pt-28 text-center text-white">
                <h1 className="text-4xl font-extrabold sm:text-6xl">{t("title")}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                    {t("subtitle")}
                </p>
                <HeroSearch />
            </section>
        );
    }

    const current = items[Math.min(active, items.length - 1)];

    return (
        <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden text-white">
            {items.map((d, i) => (
                <div
                    key={d.slug}
                    className={`absolute inset-0 transition-opacity duration-700 ${d.slug === current.slug ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <DestImage
                        src={destImage(d.image)}
                        alt={d.name_en}
                        priority={i === 0}
                        className="object-cover"
                    />
                </div>
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />

            <div className="absolute left-4 right-4 top-6 flex gap-2 overflow-x-auto sm:right-auto sm:top-1/2 sm:-translate-y-1/2 sm:flex-col sm:overflow-visible">
                {items.map((d, i) => (
                    <button
                        key={d.slug}
                        onClick={() => setActive(i)}
                        className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm transition ${d.slug === current.slug
                                ? "border-white bg-white text-slate-900"
                                : "border-white/50 bg-white/10 text-white hover:bg-white/25"
                            }`}
                    >
                        {destName(d, locale)}
                    </button>
                ))}
            </div>

            <h1 className="absolute bottom-40 right-4 text-6xl font-extrabold leading-none tracking-tight drop-shadow-lg sm:right-10 sm:text-9xl">
                {destName(current, locale)}
            </h1>

            <p className="absolute bottom-40 left-4 hidden max-w-sm text-lg text-white/90 sm:left-24 sm:block">
                {t("subtitle")}
            </p>

            <HeroSearch />
        </section>
    );
}