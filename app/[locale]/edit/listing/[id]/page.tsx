import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import EditListingForm from "@/components/account/EditListingForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditListingPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale, id } = await params;
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return redirect({ href: "/login", locale });

    const { data: l } = await supabase
        .from("listings")
        .select("id,name,category,description,district,phone,whatsapp,sltda_number")
        .eq("id", id)
        .eq("owner_id", user.id)
        .maybeSingle();
    if (!l) notFound();

    return (
        <Container className="py-12">
            <EditListingForm initial={l} />
        </Container>
    );
}
