import Image from "next/image";
import { useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import {
    UPCOMING,
    UI_TEXT,
    SAMPLE_NOTE,
    type Locale3,
} from "@/data/destinations";

export default function UpcomingPage() {
    const locale = useLocale() as Locale3;
    const ui = UI_TEXT[locale];

    return (
        <Container className="py-12">
            <SectionTitle title={ui.upcoming} subtitle={ui.upcomingSub} />

            <p className="mb-10 rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                ⚠️ {ui.sample}: {SAMPLE_NOTE[locale]}
            </p>

            <div className="space-y-16">
                {UPCOMING.map((u, i) => (
                    <div
                        key={u.slug}
                        className="grid items-center gap-8 md:grid-cols-2"
                    >
                        {/* Photo with a hand-cut look */}
                        <div
                            className={`relative aspect-4/3 overflow-hidden rounded-[2.5rem_0.75rem_2.5rem_0.75rem] shadow-lg ${i % 2 ? "md:order-2" : ""
                                }`}
                        >
                            <Image
                                src={u.image}
                                alt={u.name.en}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Card with passport stamp */}
                        <div className="relative rounded-2xl border border-line bg-card p-6 pt-10 shadow-md">
                            <div className="absolute -top-8 right-4 flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-4 border-double border-ocean-700/70 bg-card p-2 text-center text-[11px] font-extrabold uppercase leading-tight text-ocean-700/80">
                                {ui[u.status]}
                            </div>
                            <h3 className="text-2xl font-bold">{u.name[locale]}</h3>
                            <p className="mt-2 text-sm text-muted">
                                {ui.expected}: {u.expected}
                            </p>
                            <button
                                type="button"
                                disabled
                                className="mt-5 rounded-full bg-ocean-600 px-5 py-2.5 text-sm font-semibold text-white opacity-60"
                            >
                                🔔 {ui.follow}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}