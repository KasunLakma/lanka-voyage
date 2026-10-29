// Shows 1-5 stars (works in server and client components)
export default function Stars({
    value,
    size = "text-lg",
}: {
    value: number;
    size?: string;
}) {
    const rounded = Math.round(value);
    return (
        <span className={`${size} text-gold-500`} aria-label={`${value} / 5`}>
            {"★".repeat(rounded)}
            <span className="text-line">{"★".repeat(5 - rounded)}</span>
        </span>
    );
}