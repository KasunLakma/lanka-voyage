"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import DestImage from "@/components/home/DestImage";
import { LANDING_TEXT } from "@/data/landingText";
import type { Locale3 } from "@/data/destinations";

export default function Hero({
    images,
    destinations,
    businesses,
}: {
    images: { src: string; alt: string }[];
    destinations: number;
    businesses: number;
}) {
    const t = LANDING_TEXT[useLocale() as Locale3];
    const [active, setActive] = useState(0);

    // Slowly change the background photo (not for people who prefer less motion)
    useEffect(() => {
        if (images.length < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setActive((x) => (x + 1) % images.length), 6000);
        return () => clearInterval(id);
    }, [images.length]);

    const chip = t.chip
        .replace("{d}", String(destinations))
        .replace("{b}", String(businesses));

    return (
        <section className="relative -mt-[76px] flex min-h-[92vh] items-center overflow-hidden bg-lagoon-900 text-white">
            {images.map((img, i) => (
                <div
                    key={img.src}
                    className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <DestImage
                        src={img.src}
                        alt={img.alt}
                        priority={i === 0}
                        className="object-cover"
                    />
                </div>
            ))}
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/70" />

            <div className="relative mx-auto w-full max-w-7xl px-4 pb-44 pt-32 sm:px-6">
                <h1 className="font-display text-[19vw] font-extrabold leading-[0.95] tracking-tight drop-shadow-2xl sm:text-[10vw]">
                    {t.bigLines.map((line, i) => (
                        <span key={i} className="block sm:mr-[0.25em] sm:inline">
                            {line}
                        </span>
                    ))}
                </h1>

                <p className="mt-6 max-w-xl text-2xl font-semibold sm:text-3xl">{t.tag1}</p>
                <p className="mt-2 max-w-xl text-base text-white/85 sm:text-lg">{t.tag2}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                        href="/destinations"
                        className="rounded-full bg-sun px-7 py-3.5 text-sm font-bold text-lagoon-900 transition hover:brightness-95"
                    >
                        {t.cta1}
                    </Link>
                    <Link
                        href="/map"
                        className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15"
                    >
                        {t.cta2}
                    </Link>
                </div>
                <p className="mt-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                    {chip}
                </p>
            </div>

            {/* Jagged "mountain" edge into the dark section */}
            <svg
                aria-hidden
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-16 w-full fill-lagoon-900 sm:h-24"
            >
                <path d="M0 120V70L200 36L470 76L770 14L1070 70L1310 34L1440 58V120Z" />
            </svg>
        </section>
    );
}