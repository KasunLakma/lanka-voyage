import { Link } from "@/i18n/navigation";

export type MapPin = { slug: string; name: string; lat: number; lng: number };

// Simplified outline of Sri Lanka [lat, lng]: for decoration only, not for navigation
const COAST: [number, number][] = [
    [9.83, 80.23], [9.65, 80.4], [9.27, 80.82], [8.93, 81.02], [8.57, 81.24],
    [8.1, 81.55], [7.72, 81.7], [7.42, 81.83], [6.87, 81.84], [6.6, 81.75],
    [6.23, 81.31], [6.12, 81.12], [6.02, 80.8], [5.92, 80.58], [6.03, 80.22],
    [6.42, 79.99], [6.93, 79.85], [7.58, 79.8], [8.23, 79.72], [8.6, 79.9],
    [9.0, 79.8], [9.3, 79.95], [9.55, 80.15], [9.75, 79.95],
];

const W = 352;
const H = 540;
const px = (lng: number) => (lng - 79.4) * 120 + 20;
const py = (lat: number) => (9.95 - lat) * 120 + 20;

export default function IslandMap({
    pins,
    title,
    note,
}: {
    pins: MapPin[];
    title: string;
    note: string;
}) {
    const outline =
        "M" +
        COAST.map(([lat, lng]) => `${px(lng).toFixed(1)} ${py(lat).toFixed(1)}`).join("L") +
        "Z";

    return (
        <section className="bg-lagoon-900 pb-10 pt-14 text-white sm:pt-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
                <div className="mx-auto w-full max-w-sm">
                    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} className="w-full">
                        <circle
                            cx={W / 2}
                            cy={H / 2}
                            r={H * 0.47}
                            fill="none"
                            stroke="#a4e891"
                            strokeOpacity="0.35"
                            strokeDasharray="4 6"
                        />
                        <path d={outline} fill="#ffffff" stroke="#a4e891" strokeWidth="1.5" strokeLinejoin="round" />
                        {pins.map((p, i) => (
                            <Link key={p.slug} href={`/destinations/${p.slug}`}>
                                <g transform={`translate(${px(p.lng).toFixed(1)} ${py(p.lat).toFixed(1)})`} className="cursor-pointer">
                                    <title>{p.name}</title>
                                    <path
                                        d="M0 0C-5 -9 -11 -14 -11 -21a11 11 0 1 1 22 0C11 -14 5 -9 0 0Z"
                                        fill="#fde910"
                                        stroke="#001f26"
                                        strokeWidth="1.5"
                                    />
                                    <text y="-17" textAnchor="middle" fontSize="11" fontWeight="700" fill="#001f26">
                                        {i + 1}
                                    </text>
                                </g>
                            </Link>
                        ))}
                    </svg>
                    <p className="mt-2 text-center text-xs text-white/50">{note}</p>
                </div>

                <div>
                    <h2 className="font-display text-5xl font-extrabold leading-tight text-lime sm:text-6xl">
                        {title}
                    </h2>
                    <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                        {pins.map((p, i) => (
                            <li key={p.slug}>
                                <Link
                                    href={`/destinations/${p.slug}`}
                                    className="flex items-center gap-3 rounded-2xl border border-white/15 px-4 py-3 transition hover:bg-white/10"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun text-sm font-bold text-lagoon-900">
                                        {i + 1}
                                    </span>
                                    <span className="font-semibold">{p.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}