import Image from "next/image";

// Fills its (relative) parent. Project files use next/image; Storage photos use <img>.
export default function DestImage({
    src,
    alt,
    className = "",
    priority,
    sizes = "100vw",
}: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    sizes?: string;
}) {
    if (src.startsWith("/")) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes}
                className={className}
            />
        );
    }
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full ${className}`}
        />
    );
}