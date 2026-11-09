export default function StatsBand({
    items,
}: {
    items: { value: number; label: string }[];
}) {
    return (
        <section className="relative bg-lagoon-900 pb-24 pt-6 text-white">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 border-t border-white/15 px-4 pt-10 text-center sm:px-6 md:grid-cols-4">
                {items.map((s) => (
                    <div key={s.label}>
                        <p className="font-display text-4xl font-extrabold text-lime sm:text-5xl">
                            {s.value.toLocaleString("en-US")}
                        </p>
                        <p className="mt-1 text-base sm:text-lg">{s.label}</p>
                    </div>
                ))}
            </div>
            <svg
                aria-hidden
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-14 w-full fill-surface sm:h-20"
            >
                <path d="M0 120V60L260 20L520 66L800 8L1100 62L1340 24L1440 48V120Z" />
            </svg>
        </section>
    );
}