"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_STYLE } from "@/lib/mapStyle";

export type LatLng = { lat: number; lng: number };

const inSriLanka = (lat: number, lng: number) =>
    lat >= 5.5 && lat <= 10.0 && lng >= 79.3 && lng <= 82.2;

export default function LocationPicker({
    value,
    onChange,
    labels,
}: {
    value: LatLng | null;
    onChange: (v: LatLng | null) => void;
    labels: {
        pickHint: string;
        useMyLocation: string;
        clear: string;
        locationSet: string;
        outside: string;
        noLocation: string;
    };
}) {
    const container = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<maplibregl.Marker | null>(null);
    const onChangeRef = useRef(onChange);
    const labelsRef = useRef(labels);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        onChangeRef.current = onChange;
        labelsRef.current = labels;
    });

    function place(lat: number, lng: number) {
        const map = mapRef.current;
        if (!map) return;
        if (!inSriLanka(lat, lng)) {
            setMsg(labelsRef.current.outside);
            return;
        }
        setMsg("");
        if (!markerRef.current) {
            const marker = new maplibregl.Marker({ draggable: true, color: "#0d9488" })
                .setLngLat([lng, lat])
                .addTo(map);
            marker.on("dragend", () => {
                const ll = marker.getLngLat();
                if (inSriLanka(ll.lat, ll.lng)) {
                    onChangeRef.current({ lat: ll.lat, lng: ll.lng });
                } else {
                    marker.setLngLat([lng, lat]);
                    setMsg(labelsRef.current.outside);
                }
            });
            markerRef.current = marker;
        } else {
            markerRef.current.setLngLat([lng, lat]);
        }
        onChangeRef.current({ lat, lng });
    }

    useEffect(() => {
        if (!container.current) return;
        const map = new maplibregl.Map({
            container: container.current,
            style: MAP_STYLE,
            center: [80.7, 7.8],
            zoom: 6.3,
            maxBounds: [
                [73.0, 1.0],
                [89.0, 15.0],
            ],
        });
        map.addControl(
            new maplibregl.NavigationControl({ showCompass: false }),
            "top-right",
        );
        map.on("click", (e) => place(e.lngLat.lat, e.lngLat.lng));
        mapRef.current = map;
        return () => {
            markerRef.current = null;
            map.remove();
            mapRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function useMyLocation() {
        if (!navigator.geolocation) {
            setMsg(labels.noLocation);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                place(pos.coords.latitude, pos.coords.longitude);
                mapRef.current?.flyTo({
                    center: [pos.coords.longitude, pos.coords.latitude],
                    zoom: 13,
                });
            },
            () => setMsg(labels.noLocation),
        );
    }

    function clear() {
        markerRef.current?.remove();
        markerRef.current = null;
        setMsg("");
        onChange(null);
    }

    return (
        <div>
            <p className="mb-2 text-xs text-muted">{labels.pickHint}</p>
            <div
                ref={container}
                className="h-64 w-full overflow-hidden rounded-2xl border border-line"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={useMyLocation}
                    className="rounded-full border border-line px-4 py-2 text-sm font-medium hover:bg-ocean-50"
                >
                    {labels.useMyLocation}
                </button>
                {value && (
                    <>
                        <span className="text-sm text-ocean-700">
                            ✔ {labels.locationSet}
                        </span>
                        <button
                            type="button"
                            onClick={clear}
                            className="text-sm text-red-600 underline"
                        >
                            {labels.clear}
                        </button>
                    </>
                )}
            </div>
            {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
        </div>
    );
}