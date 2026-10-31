import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import EditVideoForm from "@/components/account/EditVideoForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditVideoPage({
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

    const { data: v } = await supabase
        .from("videos")
        .select("id,title,description,category,district")
        .eq("id", id)
        .eq("owner_id", user.id)
        .maybeSingle();
    if (!v) notFound();

    return (
        <Container className="py-12">
            <EditVideoForm initial={v} />
        </Container>
    );
}
