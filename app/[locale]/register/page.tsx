import Container from "@/components/ui/Container";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
    return (
        <Container className="py-12">
            <AuthForm mode="register" />
        </Container>
    );
}