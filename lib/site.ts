// Change this when you get your own domain (also set NEXT_PUBLIC_SITE_URL in Vercel)
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://lanka-voyage-tau.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Lanka Voyage";
export const LOCALES = ["en", "si", "ta"] as const;
export const OG_LOCALE = { en: "en_US", si: "si_LK", ta: "ta_LK" } as const;