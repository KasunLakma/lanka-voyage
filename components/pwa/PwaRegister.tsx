"use client";

import { useEffect } from "react";

// Registers the service worker (production only, so development stays simple)
export default function PwaRegister() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;
        if (!("serviceWorker" in navigator)) return;
        navigator.serviceWorker.register("/sw.js").catch(() => { });
    }, []);
    return null;
}