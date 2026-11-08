// null = unlimited
export const SAVED_LIMIT = { free: 50, plus: null, pro: null } as const;

export const SAVED_TEXT = {
    en: {
        title: "Saved places",
        save: "Save",
        saved: "Saved",
        limit:
            "You reached the saved limit of the free plan (50). Upgrade for unlimited saves.",
        failed: "Could not save. Please try again.",
        empty: "You have not saved anything yet. Tap ♡ on places you like.",
        count: "{n} of {max} saved",
        unlimited: "{n} saved · unlimited",
        loginFirst: "Please log in to see your saved places.",
        goLogin: "Log in",
        seePlans: "See plans",
        types: {
            listing: "Business",
            destination: "Destination",
            video: "Video",
            article: "Article",
        },
    },
    si: {
        title: "සුරැකි ස්ථාන",
        save: "සුරකින්න",
        saved: "සුරැකුණා",
        limit:
            "ඔබ නොමිලේ පැකේජයේ සුරැකීමේ සීමාවට (50) ළඟා වී ඇත. අසීමිත සුරැකීමට ඉහළ දමන්න.",
        failed: "සුරැකීමට නොහැකි විය. නැවත උත්සාහ කරන්න.",
        empty: "ඔබ තවම කිසිවක් සුරැකී නැත. ඔබ කැමති ස්ථානවල ♡ ඔබන්න.",
        count: "{max}න් {n}ක් සුරැකුණා",
        unlimited: "{n}ක් සුරැකුණා · අසීමිතයි",
        loginFirst: "ඔබේ සුරැකි ස්ථාන බැලීමට කරුණාකර ඇතුල් වන්න.",
        goLogin: "ඇතුල් වන්න",
        seePlans: "පැකේජ් බලන්න",
        types: {
            listing: "ව්‍යාපාරය",
            destination: "ගමනාන්තය",
            video: "වීඩියෝව",
            article: "ලිපිය",
        },
    },
    ta: {
        title: "சேமித்த இடங்கள்",
        save: "சேமி",
        saved: "சேமிக்கப்பட்டது",
        limit:
            "இலவசத் திட்டத்தின் சேமிப்பு வரம்பை (50) எட்டிவிட்டீர்கள். வரம்பற்ற சேமிப்புக்கு மேம்படுத்துங்கள்.",
        failed: "சேமிக்க முடியவில்லை. மீண்டும் முயலவும்.",
        empty: "நீங்கள் இன்னும் எதையும் சேமிக்கவில்லை. பிடித்த இடங்களில் ♡ ஐத் தட்டுங்கள்.",
        count: "{max} இல் {n} சேமிக்கப்பட்டது",
        unlimited: "{n} சேமிக்கப்பட்டது · வரம்பற்றது",
        loginFirst: "சேமித்த இடங்களைப் பார்க்க உள்நுழையவும்.",
        goLogin: "உள்நுழை",
        seePlans: "திட்டங்களைப் பார்",
        types: {
            listing: "வணிகம்",
            destination: "சேருமிடம்",
            video: "காணொளி",
            article: "கட்டுரை",
        },
    },
} as const;