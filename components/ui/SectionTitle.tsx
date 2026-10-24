export default function SectionTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
        </div>
    );
}