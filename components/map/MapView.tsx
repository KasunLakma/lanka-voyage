"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_STYLE } from "@/lib/mapStyle";

export type Pin = {
    id: string;
    kind: "destination" | "listing";
    category: string;
    lng: number;
    lat: number;
    title: string;
    subtitle: string;
    icon: string;
    href?: string;
    phone?: string;
};

type Chip = { key: string; label: string };

// Popup is built with textContent (never HTML) so user-written names are safe
function buildPopup(
    p: Pin,
    locale: string,
    labels: { call: string; open: string },
) {
    const box = document.createElement("div");
    box.style.cssText = "color:#10302f;min-width:160px";

    const title = document.createElement("strong");
    title.textContent = p.title;
    title.style.display = "block";

    const sub = document.createElement("div");
    sub.textContent = p.subtitle;
    sub.style.cssText = "font-size:12px;color:#5b7371;margin:2px 0 8px";

    box.append(title, sub);

    const makeLink = (text: string, href: string) => {
        const a = document.createElement("a");
        a.textContent = text;
        a.href = href;
        a.style.cssText =
            "display:inline-block;margin-right:6px;padding:6px 12px;border-radius:999px;background:#0d9488;color:#fff;font-size:12px;font-weight:600;text-decoration:none";
        return a;
    };

    if (p.href) box.append(makeLink(labels.open, `/${locale}${p.href}`));
    if (p.phone)
        box.append(makeLink(labels.call, `tel:${p.phone.replace(/[^0-9+]/g, "")}`));
    return box;
}

export default function MapView({
    pins,
    chips,
    locale,
    labels,
}: {
    pins: Pin[];
    chips: Chip[];
    locale: string;
    labels: { call: string; open: string; nearMe: string; noLocation: string };
}) {
    const container = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);
    const [filter, setFilter] = useState("all");
    const [msg, setMsg] = useState("");

    // Create the map once
    useEffect(() => {
        if (!container.current) return;
        const map = new maplibregl.Map({
            container: container.current,
            style: MAP_STYLE,
            bounds: [
                [79.5, 5.8],
                [82.1, 9.95],
            ],
            fitBoundsOptions: { padding: 30 },
            maxBounds: [
                [73.0, 1.0],
                [89.0, 15.0],
            ],
            center: [80.75, 7.85],
            zoom: 6.1,
        });
        map.addControl(
            new maplibregl.NavigationControl({ showCompass: false }),
            "top-right",
        );
        mapRef.current = map;
        map.fitBounds(
            [
                [79.5, 5.8],
                [82.1, 9.95],
            ],
            { padding: 30, duration: 0 },
        );
        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Draw the markers (again) whenever the filter changes
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        pins
            .filter((p) => {
                if (filter === "all") return true;
                if (filter === "destinations") return p.kind === "destination";
                return p.kind === "listing" && p.category === filter;
            })
            .forEach((p) => {
                const el = document.createElement("div");
                el.textContent = p.icon;
                el.style.cssText =
                    "width:38px;height:38px;border-radius:50%;background:#fff;border:2px solid #0d9488;display:flex;align-items:center;justify-content:center;font-size:19px;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3)";

                const popup = new maplibregl.Popup({
                    offset: 22,
                    maxWidth: "260px",
                }).setDOMContent(buildPopup(p, locale, labels));

                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat([p.lng, p.lat])
                    .setPopup(popup)
                    .addTo(map);
                markersRef.current.push(marker);
            });
    }, [filter, pins, locale, labels]);

    function nearMe() {
        setMsg("");
        if (!navigator.geolocation) {
            setMsg(labels.noLocation);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                mapRef.current?.flyTo({
                    center: [pos.coords.longitude, pos.coords.latitude],
                    zoom: 11,
                });
            },
            () => setMsg(labels.noLocation),
        );
    }

    const chip = (active: boolean) =>
        `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "bg-card text-muted border border-line hover:bg-ocean-50"
        }`;

    return (
        <div>
            <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
                {chips.map((c) => (
                    <button
                        key={c.key}
                        onClick={() => setFilter(c.key)}
                        className={chip(filter === c.key)}
                    >
                        {c.label}
                    </button>
                ))}
                <button
                    onClick={nearMe}
                    className="shrink-0 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-slate-900"
                >
                    {labels.nearMe}
                </button>
            </div>
            {msg && <p className="mb-2 text-sm text-red-600">{msg}</p>}
            <div
                ref={container}
                className="h-[65vh] min-h-110 w-full overflow-hidden rounded-3xl border border-line"
            />
        </div>
    );
}