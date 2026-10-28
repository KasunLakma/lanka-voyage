import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import VideoForm from "@/components/videos/VideoForm";
import { createClient } from "@/lib/supabase/server";
import { VIDEO_TEXT } from "@/data/videoText";
import type { Locale3 } from "@/data/destinations";

export default async function NewVideoPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const t = VIDEO_TEXT[raw as Locale3];

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

    return (
        <Container className="py-12">
            <VideoForm />
        </Container>
    );
}