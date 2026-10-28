import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { PLAN_TEXT, PRICES, LIMITS, type PlanKey } from "@/data/planText";
import type { Locale3 } from "@/data/destinations";

export default async function PricingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const t = PLAN_TEXT[raw as Locale3];

    const plans: PlanKey[] = ["free", "plus", "pro"];
    const forWho = { free: t.forFree, plus: t.forPlus, pro: t.forPro };
    const soonItems = { free: [], plus: t.soonPlus, pro: t.soonPro };

    return (
        <Container className="py-12">
            <SectionTitle title={t.title} subtitle={t.subtitle} />

            <div className="grid gap-5 lg:grid-cols-3">
                {plans.map((p) => (
                    <div
                        key={p}
                        className={`flex flex-col rounded-3xl border p-6 shadow-sm ${p === "plus"
                                ? "border-ocean-600 bg-card ring-2 ring-ocean-600/30"
                                : "border-line bg-card"
                            }`}
                    >
                        <h3 className="text-2xl font-bold">{t[p]}</h3>
                        <p className="mt-1 text-sm text-muted">{forWho[p]}</p>

                        <div className="mt-5">
                            {p === "free" ? (
                                <p className="text-3xl font-extrabold">{t.freeWord}</p>
                            ) : (
                                <>
                                    <p className="text-3xl font-extrabold">
                                        LKR {PRICES[p].LKR.toLocaleString("en-US")}{" "}
                                        <span className="text-sm font-medium text-muted">
                                            {t.perMonth}
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted">{t.residents}</p>
                                    <p className="mt-2 text-xl font-bold">
                                        USD {PRICES[p].USD}{" "}
                                        <span className="text-sm font-medium text-muted">
                                            {t.perMonth}
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted">{t.visitors}</p>
                                </>
                            )}
                        </div>

                        <ul className="mt-6 flex-1 space-y-2 text-sm">
                            <li>✅ {t.browse}</li>
                            <li>
                                ✅ {t.videosN.replace("{n}", String(LIMITS[p].videos))}
                            </li>
                            <li>
                                ✅ {t.listingsN.replace("{n}", String(LIMITS[p].listings))}
                            </li>
                            {soonItems[p].map((s) => (
                                <li key={s} className="text-muted">
                                    ⏳ {s}{" "}
                                    <span className="rounded-full bg-gold-400/30 px-2 py-0.5 text-xs">
                                        {t.soon}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {p !== "free" && (
                            <Link
                                href="/account"
                                className={`${buttonStyles(p === "plus" ? "primary" : "outline")} mt-6`}
                            >
                                {t.choose}
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted">{t.payNote}</p>
        </Container>
    );
}