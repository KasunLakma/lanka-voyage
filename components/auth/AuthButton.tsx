"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { buttonStyles } from "@/components/ui/Button";
import { AUTH_TEXT } from "@/data/authText";
import type { Locale3 } from "@/data/destinations";

// Shows "Log in" when signed out, or name + Admin (for admins) + "Log out" when signed in
export default function AuthButton() {
    const t = useTranslations("nav");
    const text = AUTH_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const supabase = createClient();

        async function load(u: User | null) {
            setUser(u);
            if (!u) {
                setIsAdmin(false);
                return;
            }
            const { data } = await supabase
                .from("profiles")
                .select("is_admin")
                .eq("id", u.id)
                .maybeSingle();
            setIsAdmin(Boolean(data?.is_admin));
        }

        supabase.auth.getUser().then(({ data }) => load(data.user));

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            // setTimeout avoids a known Supabase deadlock when calling it inside this callback
            setTimeout(() => load(session?.user ?? null), 0);
        });
        return () => subscription.unsubscribe();
    }, []);

    async function logout() {
        await createClient().auth.signOut();
        setUser(null);
        setIsAdmin(false);
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
            {isAdmin && (
                <Link
                    href="/admin"
                    className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-gold-400"
                >
                    ⚙️ Admin
                </Link>
            )}
            <Link
                href="/account"
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