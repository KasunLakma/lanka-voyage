import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Private pages: not for search engines
                disallow: [
                    "/*/admin",
                    "/*/account",
                    "/*/provider",
                    "/*/login",
                    "/*/register",
                    "/*/edit/",
                    "/offline.html",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}