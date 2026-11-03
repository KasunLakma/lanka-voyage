import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import AdminNav from "@/components/admin/AdminNav";
import DestinationAdminForm from "@/components/admin/DestinationAdminForm";
import DestinationAdminActions from "@/components/admin/DestinationAdminActions";
import { createClient } from "@/lib/supabase/server";
import { destImage } from "@/lib/destinations";
import { ADMIN_TEXT } from "@/data/adminText";
import { DEST_ADMIN_TEXT } from "@/data/destAdminText";
import type { Locale3 } from "@/data/destinations";

export default async function AdminDestinationsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = DEST_ADMIN_TEXT[locale];
    const at = ADMIN_TEXT[locale];
    const tc = await getTranslations("categories");

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <Link href="/login" className={buttonStyles("primary")}>
                    Log in
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
                <p className="text-lg">{at.notAdmin}</p>
            </Container>
        );
    }

    const { data: items } = await supabase
        .from("destinations")
        .select("id,slug,name_en,category,image,published,created_at")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

    return (
        <Container className="py-12">
            <AdminNav />
            <h1 className="mb-2 text-3xl font-bold">🌴 {t.title}</h1>
            <p className="mb-6 text-sm text-muted">{t.editHint}</p>

            <div className="grid gap-8 lg:grid-cols-2">
                <DestinationAdminForm />

                <div className="grid content-start gap-3">
                    {items && items.length > 0 ? (
                        items.map((d) => (
                            <div
                                key={d.id}
                                className="rounded-2xl border border-line bg-card p-4 shadow-sm"
                            >
                                <div className="flex gap-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={destImage(d.image)}
                                        alt=""
                                        className="h-20 w-28 shrink-0 rounded-xl object-cover"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-bold">{d.name_en}</p>
                                        <p className="text-sm text-muted">{tc(d.category)}</p>
                                        <p className="text-sm">
                                            {d.published ? `🟢 ${t.live}` : `⚪ ${t.draft}`}
                                        </p>
                                        <Link
                                            href={`/destinations/${d.slug}`}
                                            className="text-sm text-ocean-700 underline"
                                        >
                                            {t.view} →
                                        </Link>
                                    </div>
                                </div>
                                <DestinationAdminActions
                                    id={d.id}
                                    published={d.published}
                                    image={d.image}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="py-10 text-center text-muted">{t.empty}</p>
                    )}
                </div>
            </div>
        </Container>
    );
}