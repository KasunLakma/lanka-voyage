"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { DESTINATIONS, type Locale3 } from "@/data/destinations";

export default function HeroDestinations() {
    const t = useTranslations("hero");
    const locale = useLocale() as Locale3;
    const [active, setActive] = useState(0);
    const current = DESTINATIONS[active];

    return (
        <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden text-white">
            {/* Background photos (the active one is visible) */}
            {DESTINATIONS.map((d, i) => (
                <Image
                    key={d.slug}
                    src={d.image}
                    alt={d.name.en}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />

            {/* Destination list: horizontal on phone, vertical on desktop */}
            <div className="absolute left-4 right-4 top-6 flex gap-2 overflow-x-auto sm:right-auto sm:top-1/2 sm:-translate-y-1/2 sm:flex-col sm:overflow-visible">
                {DESTINATIONS.map((d, i) => (
                    <button
                        key={d.slug}
                        onClick={() => setActive(i)}
                        className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm transition ${i === active
                                ? "border-white bg-white text-slate-900"
                                : "border-white/50 bg-white/10 text-white hover:bg-white/25"
                            }`}
                    >
                        {d.name[locale]}
                    </button>
                ))}
            </div>

            {/* Big destination name */}
            <h1 className="absolute bottom-40 right-4 text-6xl font-extrabold leading-none tracking-tight drop-shadow-lg sm:right-10 sm:text-9xl">
                {current.name[locale]}
            </h1>

            <p className="absolute bottom-40 left-4 hidden max-w-sm text-lg text-white/90 sm:left-24 sm:block">
                {t("subtitle")}
            </p>

            {/* Glass search bar */}
            <div className="absolute inset-x-4 bottom-8 mx-auto flex max-w-3xl items-center gap-2 rounded-full border border-white/40 bg-white/15 p-2 backdrop-blur-md">
                <span className="pl-3 text-lg">🔍</span>
                <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    className="min-w-0 flex-1 bg-transparent px-2 py-2 text-white outline-none placeholder:text-white/70"
                />
                <button className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-gold-400">
                    {t("searchButton")}
                </button>
            </div>
        </section>
    );
}