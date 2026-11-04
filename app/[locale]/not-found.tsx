import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <Container className="py-24 text-center">
            <p className="text-6xl">🧭</p>
            <h1 className="mt-4 text-3xl font-bold">404</h1>
            <p className="mt-3 text-muted">
                Page not found · පිටුව හමු නොවීය · பக்கம் கிடைக்கவில்லை
            </p>
            <Link href="/" className={`${buttonStyles("primary")} mt-8`}>
                Home · මුල් පිටුව · முகப்பு
            </Link>
        </Container>
    );
}