import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, LIST_TEXT } from "@/data/listingText";
import type { Locale3 } from "@/data/destinations";

export default async function ProviderPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = LIST_TEXT[locale];

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <p className="text-lg">{t.loginFirst}</p>
                <Link href="/login" className={`${buttonStyles("primary")} mt-6`}>
                    {t.goLogin}
                </Link>
            </Container>
        );
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("account_type")
        .eq("id", user.id)
        .single();

    if (profile?.account_type !== "provider") {
        return (
            <Container className="py-20 text-center">
                <p className="mx-auto max-w-md text-lg">{t.providerOnly}</p>
                <Link href="/register" className={`${buttonStyles("primary")} mt-6`}>
                    {t.goRegister}
                </Link>
            </Container>
        );
    }

    const { data: mine } = await supabase
        .from("listings")
        .select("id,name,category,district,status,review_note")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

    const statusLabel = {
        pending: t.statusPending,
        published: t.statusPublished,
        rejected: t.statusRejected,
    } as const;
    const statusStyle = {
        pending: "bg-gold-400/30 text-amber-800",
        published: "bg-ocean-50 text-ocean-700",
        rejected: "bg-red-100 text-red-700",
    } as const;

    return (
        <Container className="py-12">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-3xl font-bold">{t.myListings}</h1>
                <Link href="/provider/new" className={buttonStyles("primary")}>
                    + {t.addListing}
                </Link>
            </div>

            {mine && mine.length > 0 ? (
                <div className="grid gap-3">
                    {mine.map((l) => {
                        const cat = CATEGORIES.find((c) => c.key === l.category);
                        const status = l.status as keyof typeof statusLabel;
                        return (
                            <div
                                key={l.id}
                                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4"
                            >
                                <div>
                                    <p className="font-bold">{l.name}</p>
                                    <p className="text-sm text-muted">
                                        {cat?.icon} {cat?.label[locale]} · {l.district}
                                    </p>
                                    {l.status === "rejected" && l.review_note && (
                                        <p className="mt-1 text-sm text-red-700">
                                            📝 {l.review_note}
                                        </p>
                                    )}
                                </div>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
                                >
                                    {statusLabel[status]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="py-12 text-center text-muted">{t.noMine}</p>
            )}
        </Container>
    );
}