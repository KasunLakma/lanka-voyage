import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import AdminNav from "@/components/admin/AdminNav";
import UpcomingAdminForm from "@/components/admin/UpcomingAdminForm";
import UpcomingAdminActions from "@/components/admin/UpcomingAdminActions";
import { createClient } from "@/lib/supabase/server";
import { listingImageUrl } from "@/lib/images";
import { ADMIN_TEXT } from "@/data/adminText";
import { UPCOMING_TEXT } from "@/data/upcomingText";
import { UI_TEXT, type Locale3 } from "@/data/destinations";

export default async function AdminUpcomingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = UPCOMING_TEXT[locale];
    const at = ADMIN_TEXT[locale];
    const ui = UI_TEXT[locale];

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
        .from("upcoming_destinations")
        .select("id,name_en,status,expected_year,source_url,image_path,published,created_at")
        .order("created_at", { ascending: false });

    const statusLabel = {
        planned: ui.planned,
        under_construction: ui.underConstruction,
        opening_soon: ui.opensSoon,
    } as const;

    return (
        <Container className="py-12">
            <AdminNav />
            <h1 className="mb-6 text-3xl font-bold">🗓️ {t.adminTitle}</h1>

            <div className="grid gap-8 lg:grid-cols-2">
                <UpcomingAdminForm />

                <div className="grid content-start gap-3">
                    {items && items.length > 0 ? (
                        items.map((i) => (
                            <div
                                key={i.id}
                                className="rounded-2xl border border-line bg-card p-4 shadow-sm"
                            >
                                <div className="flex gap-3">
                                    {i.image_path && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={listingImageUrl(i.image_path)}
                                            alt=""
                                            className="h-20 w-28 shrink-0 rounded-xl object-cover"
                                        />
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-bold">{i.name_en}</p>
                                        <p className="text-sm text-muted">
                                            {statusLabel[i.status as keyof typeof statusLabel]}
                                            {i.expected_year ? ` · ${i.expected_year}` : ""}
                                        </p>
                                        <p className="text-sm">
                                            {i.published ? `🟢 ${t.live}` : `⚪ ${t.draft}`}
                                        </p>
                                        <a
                                            href={i.source_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block truncate text-sm text-ocean-700 underline"
                                        >
                                            {i.source_url}
                                        </a>
                                    </div>
                                </div>
                                <UpcomingAdminActions id={i.id} published={i.published} />
                            </div>
                        ))
                    ) : (
                        <p className="py-10 text-center text-muted">{at.empty}</p>
                    )}
                </div>
            </div>
        </Container>
    );
}