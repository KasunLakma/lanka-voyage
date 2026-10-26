import Container from "@/components/ui/Container";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
    return (
        <Container className="py-12">
            <AuthForm mode="login" />
        </Container>
    );
}