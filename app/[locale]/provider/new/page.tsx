import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import ListingForm from "@/components/provider/ListingForm";
import { createClient } from "@/lib/supabase/server";
import { LIST_TEXT } from "@/data/listingText";
import type { Locale3 } from "@/data/destinations";

export default async function NewListingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const t = LIST_TEXT[raw as Locale3];

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
            </Container>
        );
    }

    return (
        <Container className="py-12">
            <ListingForm />
        </Container>
    );
}