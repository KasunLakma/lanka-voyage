import Container from "@/components/ui/Container";
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "@/i18n/navigation";
import { LEGAL_UI } from "@/data/legalText";
import type { Locale3 } from "@/data/destinations";

export default async function RegisterPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const c = LEGAL_UI[locale as Locale3].consent;

    return (
        <Container className="py-12">
            <AuthForm mode="register" />
            <p className="mx-auto mt-4 max-w-md text-center text-xs text-muted">
                {c[0]}
                <Link href="/terms" className="underline">
                    {c[1]}
                </Link>
                {c[2]}
                <Link href="/privacy" className="underline">
                    {c[3]}
                </Link>
                {c[4]}
            </p>
        </Container>
    );
}