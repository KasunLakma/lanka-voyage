import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import EditArticleForm from "@/components/account/EditArticleForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditArticlePage({
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

    const { data: a } = await supabase
        .from("articles")
        .select("id,title,summary,body,language,category,district")
        .eq("id", id)
        .eq("author_id", user.id)
        .maybeSingle();
    if (!a) notFound();

    return (
        <Container className="py-12">
            <EditArticleForm initial={a} />
        </Container>
    );
}