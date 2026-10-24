type Variant = "primary" | "outline" | "ghost";

export function buttonStyles(variant: Variant = "primary") {
    const base =
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500";
    const variants: Record<Variant, string> = {
        primary: "bg-ocean-600 text-white hover:bg-ocean-700",
        outline: "border border-line bg-card text-ink hover:bg-ocean-50",
        ghost: "text-ink hover:bg-ocean-50",
    };
    return `${base} ${variants[variant]}`;
}

export function Button({
    variant = "primary",
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
    return (
        <button className={`${buttonStyles(variant)} ${className}`} {...props} />
    );
}