"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { buttonStyles } from "@/components/ui/Button";
import { AUTH_TEXT } from "@/data/authText";
import type { Locale3 } from "@/data/destinations";

// Shows "Log in" when signed out, or the user's name and "Log out" when signed in
export default function AuthButton() {
    const t = useTranslations("nav");
    const text = AUTH_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);

    async function logout() {
        await createClient().auth.signOut();
        setUser(null);
        router.push("/");
        router.refresh();
    }

    if (!user) {
        return (
            <Link
                href="/login"
                className={`${buttonStyles("primary")} hidden sm:inline-flex`}
            >
                {t("login")}
            </Link>
        );
    }

    const name = user.user_metadata?.full_name || user.email;

    return (
        <div className="hidden items-center gap-2 sm:flex">
            <Link
                href="/provider"
                className="max-w-32 truncate text-sm font-semibold hover:text-ocean-600"
            >
                {name}
            </Link>
            <button onClick={logout} className={buttonStyles("outline")}>
                {text.logout}
            </button>
        </div>
    );
}