"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { INSTALL_TEXT } from "@/data/installText";
import type { Locale3 } from "@/data/destinations";

type InstallEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const KEY = "lv-install-dismissed";

export default function InstallPrompt() {
    const t = INSTALL_TEXT[useLocale() as Locale3];
    const [deferred, setDeferred] = useState<InstallEvent | null>(null);
    const [ios, setIos] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (navigator as unknown as { standalone?: boolean }).standalone === true;

        let dismissed = false;
        try {
            dismissed = localStorage.getItem(KEY) === "1";
        } catch { }
        if (standalone || dismissed) return;

        if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
            setIos(true);
            setVisible(true);
        }

        const onPrompt = (e: Event) => {
            e.preventDefault();
            setDeferred(e as InstallEvent);
            setVisible(true);
        };
        const onInstalled = () => setVisible(false);

        window.addEventListener("beforeinstallprompt", onPrompt);
        window.addEventListener("appinstalled", onInstalled);
        return () => {
            window.removeEventListener("beforeinstallprompt", onPrompt);
            window.removeEventListener("appinstalled", onInstalled);
        };
    }, []);

    function close() {
        setVisible(false);
        try {
            localStorage.setItem(KEY, "1");
        } catch { }
    }

    async function install() {
        if (!deferred) return;
        await deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed inset-x-4 bottom-24 z-40 flex items-center gap-3 rounded-2xl border border-line bg-card p-3 shadow-xl lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/icons/icon-192.png"
                alt=""
                className="h-11 w-11 shrink-0 rounded-xl"
            />
            <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.title}</p>
                <p className="text-xs text-muted">{ios && !deferred ? t.ios : t.android}</p>
            </div>
            {deferred && (
                <button
                    onClick={install}
                    className="shrink-0 rounded-full bg-ocean-600 px-4 py-2 text-xs font-semibold text-white hover:bg-ocean-700"
                >
                    {t.install}
                </button>
            )}
            <button
                onClick={close}
                aria-label={t.close}
                className="shrink-0 px-1 text-lg text-muted"
            >
                ✕
            </button>
        </div>
    );
}