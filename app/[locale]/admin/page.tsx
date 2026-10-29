import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import AdminActions from "@/components/admin/AdminActions";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_TEXT } from "@/data/adminText";
import { CATEGORIES, LIST_TEXT } from "@/data/listingText";
import type { Locale3 } from "@/data/destinations";
import { listingImageUrl } from "@/lib/images";
import AdminNav from "@/components/admin/AdminNav";

const STATUSES = ["pending", "published", "rejected"] as const;

export default async function AdminPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ status?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = ADMIN_TEXT[locale];
    const lt = LIST_TEXT[locale];
    const { status: statusParam } = await searchParams;
    const status = STATUSES.find((s) => s === statusParam) ?? "pending";

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <p className="text-lg">{lt.loginFirst}</p>
                <Link href="/login" className={`${buttonStyles("primary")} mt-6`}>
                    {lt.goLogin}
                </Link>
            </Container>
        );
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

    if (!profile?.is_admin) {
        return (
            <Container className="py-20 text-center">
                <p className="text-lg">{t.notAdmin}</p>
            </Container>
        );
    }

    const { data: items } = await supabase
        .from("listings")
        .select(
            "id,name,category,district,description,phone,whatsapp,sltda_number,status,verified,review_note,created_at,image_path",
        )
        .eq("status", status)
        .order("created_at", { ascending: false });

    const tab = (active: boolean) =>
        `rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
        }`;

    return (
        <Container className="py-12">
            <AdminNav />
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="mt-1 text-muted">{t.subtitle}</p>
            <p className="mt-3 rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                🔎 {t.checklist}
            </p>

            <div className="mb-6 mt-6 flex gap-2 border-b border-line pb-3">
                {STATUSES.map((s) => (
                    <Link
                        key={s}
                        href={`/admin?status=${s}`}
                        className={tab(status === s)}
                    >
                        {t[s]}
                    </Link>
                ))}
            </div>

            {items && items.length > 0 ? (
                <div className="grid gap-4">
                    {items.map((l) => {
                        const cat = CATEGORIES.find((c) => c.key === l.category);
                        return (
                            <div
                                key={l.id}
                                className="rounded-2xl border border-line bg-card p-5 shadow-sm"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div>
                                        <h2 className="text-lg font-bold">
                                            {l.name}{" "}
                                            {l.verified && (
                                                <span className="text-sm text-ocean-700">✔</span>
                                            )}
                                        </h2>
                                        <p className="text-sm text-muted">
                                            {cat?.icon} {cat?.label[locale]} · {l.district}
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted">
                                        {new Date(l.created_at).toLocaleDateString()}
                                    </p>
                                </div>

                                {l.image_path && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={listingImageUrl(l.image_path)}
                                        alt={l.name}
                                        className="mt-3 h-56 w-full rounded-2xl object-cover"
                                    />
                                )}
                                <p className="mt-2 text-sm">
                                    📞 {l.phone}
                                    {l.whatsapp ? " · WhatsApp" : ""}
                                    {l.sltda_number ? ` · ${t.sltda}: ${l.sltda_number}` : ""}
                                </p>
                                {l.review_note && (
                                    <p className="mt-2 text-sm text-red-700">
                                        📝 {l.review_note}
                                    </p>
                                )}

                                <AdminActions
                                    id={l.id}
                                    status={l.status}
                                    verified={l.verified}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="py-16 text-center text-muted">{t.empty}</p>
            )}
        </Container>
    );
}