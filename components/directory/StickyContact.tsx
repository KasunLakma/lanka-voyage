// Fixed contact bar above the bottom menu. Phones and tablets only.
export default function StickyContact({
    phone,
    whatsapp,
    lat,
    lng,
    callLabel,
    whatsappLabel,
    mapLabel,
}: {
    phone: string;
    whatsapp: boolean;
    lat: number | null;
    lng: number | null;
    callLabel: string;
    whatsappLabel: string;
    mapLabel: string;
}) {
    const digits = phone.replace(/\D/g, "");
    const base =
        "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-3 text-sm font-semibold";

    return (
        <div className="fixed inset-x-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))_+_5rem)] z-40 flex gap-2 rounded-full border border-line bg-card/95 p-1.5 shadow-xl backdrop-blur-md lg:hidden">
            <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={`${base} bg-ocean-600 text-white`}
            >
                📞 {callLabel}
            </a>
            {whatsapp && digits && (
                <a
                    href={`https://wa.me/${digits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${base} border border-line`}
                >
                    💬 {whatsappLabel}
                </a>
            )}
            {lat != null && lng != null && (
                <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={mapLabel}
                    className={`${base} flex-none border border-line px-5`}
                >
                    🗺️
                </a>
            )}
        </div>
    );
}