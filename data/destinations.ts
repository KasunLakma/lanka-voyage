export type Locale3 = "en" | "si" | "ta";

export const DESTINATIONS = [
    {
        slug: "sigiriya",
        image: "/images/sigiriya.webp",
        category: "culture",
        name: { en: "Sigiriya", si: "සීගිරිය", ta: "சிகிரியா" },
    },
    {
        slug: "ella",
        image: "/images/ella.jpg",
        category: "hillCountry",
        name: { en: "Ella", si: "ඇල්ල", ta: "எல்ல" },
    },
    {
        slug: "mirissa",
        image: "/images/mirissa.jpg",
        category: "beaches",
        name: { en: "Mirissa", si: "මිරිස්ස", ta: "மிரிஸ்ஸ" },
    },
    {
        slug: "kandy",
        image: "/images/kandy.jpg",
        category: "culture",
        name: { en: "Kandy", si: "මහනුවර", ta: "கண்டி" },
    },
    {
        slug: "yala",
        image: "/images/yala.jpg",
        category: "wildlife",
        name: { en: "Yala", si: "යාල", ta: "யால" },
    },
] as const;

// Temporary text for the community banner (we will move it to messages/ later)
export const COMMUNITY_TEXT = {
    en: {
        title: "Join the community",
        sub: "Share the beauty of Sri Lanka with the world.",
    },
    si: {
        title: "අපිත් එක්ක එකතු වෙන්න",
        sub: "ශ්‍රී ලංකාවේ අලංකාරය ලෝකයත් සමඟ බෙදා ගන්න.",
    },
    ta: {
        title: "எங்கள் சமூகத்தில் இணையுங்கள்",
        sub: "இலங்கையின் அழகை உலகத்துடன் பகிருங்கள்.",
    },
} as const;