import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import {
    DESTINATIONS,
    DETAILS,
    UI_TEXT,
    type Locale3,
} from "@/data/destinations";

export default async function DestinationPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: rawLocale, slug } = await params;
    const locale = rawLocale as Locale3;
    const dest = DESTINATIONS.find((d) => d.slug === slug);
    const detail = DETAILS[slug];
    if (!dest || !detail) notFound();

    const ui = UI_TEXT[locale];
    const services = [
        { icon: "🏨", label: ui.stays },
        { icon: "🧭", label: ui.guides },
        { icon: "🚐", label: ui.vehicles },
        { icon: "🍛", label: ui.food },
    ];

    return (
        <>
            {/* Hero photo */}
            <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden text-white">
                <Image
                    src={dest.image}
                    alt={dest.name.en}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />
                <Link
                    href="/destinations"
                    className="absolute left-4 top-6 rounded-full border border-white/50 bg-white/15 px-4 py-2 text-sm backdrop-blur-sm sm:left-10"
                >
                    ← {ui.back}
                </Link>
                <h1 className="absolute bottom-10 left-4 text-6xl font-extrabold drop-shadow-lg sm:left-10 sm:text-8xl">
                    {dest.name[locale]}
                </h1>
            </section>

            <Container className="py-12">
                {/* About + best time */}
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <h2 className="mb-3 text-2xl font-bold">{ui.about}</h2>
                        <p className="text-lg leading-relaxed text-muted">
                            {detail.summary[locale]}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted">📅 {ui.bestTime}</p>
                        <p className="mt-2 text-xl font-bold text-ocean-700">
                            {detail.bestTime[locale]}
                        </p>
                    </div>
                </div>

                {/* Highlights timeline */}
                <h2 className="mb-6 mt-14 text-2xl font-bold">{ui.highlights}</h2>
                <ol className="border-l-2 border-ocean-500/50 pl-8">
                    {detail.highlights.map((h, i) => (
                        <li key={i} className="relative mb-8 last:mb-0">
                            <span className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-ocean-600 text-sm font-bold text-white">
                                {i + 1}
                            </span>
                            <p className="text-lg font-semibold">{h[locale]}</p>
                        </li>
                    ))}
                </ol>

                {/* Services nearby (dark section) */}
                <div className="mt-14 rounded-3xl bg-slate-900 p-6 text-white sm:p-10">
                    <h2 className="mb-6 text-2xl font-bold">{ui.services}</h2>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {services.map((s) => (
                            <Link
                                key={s.label}
                                href="/directory"
                                className="flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/5 p-5 text-center transition hover:bg-white/15"
                            >
                                <span className="text-3xl">{s.icon}</span>
                                <span className="font-semibold">{s.label}</span>
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/map"
                        className={`${buttonStyles("primary")} mt-8 bg-gold-500! text-slate-900!`}
                    >
                        {ui.plan}
                    </Link>
                </div>

                {/* Enquiry form (sending will be enabled later) */}
                <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-bold">{ui.enquiryTitle}</h2>
                    <p className="mt-1 text-muted">{ui.enquirySub}</p>
                    <div className="mt-5 flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder={ui.name}
                            className="rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500"
                        />
                        <input
                            type="text"
                            placeholder={ui.phone}
                            className="rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500"
                        />
                        <textarea
                            placeholder={ui.message}
                            rows={3}
                            className="rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500"
                        />
                        <button
                            type="button"
                            disabled
                            className={`${buttonStyles("primary")} opacity-60`}
                        >
                            {ui.send}
                        </button>
                        <p className="text-center text-xs text-muted">
                            {ui.comingSoonNote}
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
}