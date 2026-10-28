// Extracts the 11-character video id from a YouTube link (or returns null)
export function parseYoutubeId(input: string): string | null {
    try {
        const url = new URL(input.trim());
        const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
        let id: string | null = null;

        if (host === "youtu.be") {
            id = url.pathname.slice(1).split("/")[0];
        } else if (host === "youtube.com") {
            if (url.pathname === "/watch") {
                id = url.searchParams.get("v");
            } else {
                const match = url.pathname.match(/^\/(shorts|embed|live)\/([^/?]+)/);
                if (match) id = match[2];
            }
        }
        return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    } catch {
        return null;
    }
}

export const youtubeThumb = (id: string) =>
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// "nocookie" version: no tracking cookies until the visitor presses play
export const youtubeEmbed = (id: string) =>
    `https://www.youtube-nocookie.com/embed/${id}`;