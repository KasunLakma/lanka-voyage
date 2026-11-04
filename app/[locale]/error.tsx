"use client";

// Shown instead of a broken page if something unexpected goes wrong
export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
            <p className="text-6xl">⚠️</p>
            <h1 className="mt-4 text-3xl font-bold">Something went wrong</h1>
            <p className="mt-3 text-muted">
                යමක් වැරදුණා · ஏதோ தவறு நடந்தது
            </p>
            <button
                onClick={reset}
                className="mt-8 rounded-full bg-ocean-600 px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-700"
            >
                Try again · නැවත · மீண்டும்
            </button>
        </div>
    );
}