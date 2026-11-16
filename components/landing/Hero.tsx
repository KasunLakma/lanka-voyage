"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import DestImage from "@/components/home/DestImage";
import { LANDING_TEXT } from "@/data/landingText";
import type { Locale3 } from "@/data/destinations";

export default function Hero({
    image,
    front,
    tone,
    destinations,
    businesses,
}: {
    image: { src: string; alt: string };
    front?: string | null; // optional cut-out of the foreground (gives the "letters behind the mountain" depth)
    tone: "dark" | "white"; // colour of the giant letters
    destinations: number;
    businesses: number;
}) {
    const t = LANDING_TEXT[useLocale() as Locale3];
    const dark = tone === "dark";
    const chip = t.chip
        .replace("{d}", String(destinations))
        .replace("{b}", String(businesses));

    return (
        <section className="relative -mt-[76px] min-h-svh overflow-hidden bg-lagoon-900 text-white">
            {/* 1) background photo */}
            <DestImage
                src={image.src}
                alt={image.alt}
                priority
                className="object-cover"
            />
            <div
                className={`absolute inset-0 ${dark
                        ? "bg-linear-to-b from-white/20 via-transparent to-black/45"
                        : "bg-linear-to-b from-black/45 via-black/5 to-black/70"
                    }`}
            />

            {/* 2) giant title (edge to edge) */}
            <h1
                className={`absolute inset-x-0 top-[20vh] z-10 px-3 text-center font-display text-[24vw] font-bold leading-[0.9] tracking-tight sm:top-[17vh] sm:text-[13vw] ${dark ? "text-lagoon-900" : "text-white drop-shadow-2xl"
                    }`}
            >
                {t.bigLines.map((line, i) => (
                    <span key={i} className="block sm:mr-[0.22em] sm:inline">
                        {line}
                    </span>
                ))}
            </h1>

            {/* 3) foreground cut-out ABOVE the title: the letters look like they are behind it */}
            {front && (
                <div className="pointer-events-none absolute inset-0 z-20">
                    <DestImage src={front} alt="" className="object-cover" />
                </div>
            )}

            {/* 4) text and buttons, bottom-left */}
            <div className="absolute inset-x-0 bottom-0 z-30 mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28">
                <p className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm">
                    {chip}
                </p>
                <p className="max-w-xl text-2xl font-semibold sm:text-3xl">{t.tag1}</p>
                <p className="mt-2 max-w-xl text-base text-white/90 sm:text-lg">
                    {t.tag2}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
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
            </div>

            {/* jagged edge into the dark section */}
            <svg
                aria-hidden
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 z-40 h-16 w-full fill-lagoon-900 sm:h-24"
            >
                <path d="M0 120V70L200 36L470 76L770 14L1070 70L1310 34L1440 58V120Z" />
            </svg>
        </section>
    );
}