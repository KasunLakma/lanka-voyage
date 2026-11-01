import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Lanka Voyage – Discover Sri Lanka",
        short_name: "Lanka Voyage",
        description:
            "Destinations, stays, vehicles, guides, maps and videos for your Sri Lanka trip.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#faf6ee",
        theme_color: "#0f766e",
        categories: ["travel"],
        icons: [
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
            {
                src: "/icons/icon-maskable-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
        shortcuts: [
            { name: "Map", url: "/map" },
            { name: "Directory", url: "/directory" },
            { name: "Videos", url: "/videos" },
        ],
    };
}