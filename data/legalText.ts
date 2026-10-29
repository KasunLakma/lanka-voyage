import type { Locale3 } from "@/data/destinations";

export type Section = { h: string; p: string[] };
export type LegalDoc = { title: string; intro?: string; sections: Section[] };
export type LegalKind = "about" | "terms" | "privacy" | "content";

export const LEGAL_UI = {
    en: {
        updated: "Last updated",
        operatedBy: "Operated by",
        questions: "Questions about this page?",
        contactUs: "Contact us",
        footer: {
            about: "About",
            contact: "Contact",
            terms: "Terms of Use",
            privacy: "Privacy Policy",
            content: "Content Policy",
        },
        consent: [
            "By signing up you agree to our ",
            "Terms of Use",
            " and ",
            "Privacy Policy",
            ".",
        ],
        contact: {
            title: "Contact us",
            intro:
                "Questions, business support, content removal requests or privacy requests: write to us.",
            email: "Email",
            phone: "Phone",
            whatsapp: "WhatsApp",
            soon: "Contact details will be added here soon.",
            tipsTitle: "To help us reply faster, please include:",
            tips: [
                "Content removal or complaint: the link (URL) of the page.",
                "Privacy request (see or delete your data): the email address of your account.",
                "Business support: your business name and what you need.",
            ],
            reportHint:
                "To report something quickly, use the 🚩 Report button on the page itself.",
        },
    },
    si: {
        updated: "අවසන් වරට යාවත්කාලීන කළේ",
        operatedBy: "පවත්වාගෙන යන්නේ",
        questions: "මෙම පිටුව ගැන ප්‍රශ්නද?",
        contactUs: "අපව අමතන්න",
        footer: {
            about: "අප ගැන",
            contact: "සම්බන්ධ වන්න",
            terms: "භාවිත නියම",
            privacy: "රහස්‍යතා ප්‍රතිපත්තිය",
            content: "අන්තර්ගත ප්‍රතිපත්තිය",
        },
        consent: [
            "ලියාපදිංචි වීමෙන් ඔබ අපගේ ",
            "භාවිත නියම",
            " සහ ",
            "රහස්‍යතා ප්‍රතිපත්තිය",
            " වලට එකඟ වේ.",
        ],
        contact: {
            title: "අපව අමතන්න",
            intro:
                "ප්‍රශ්න, ව්‍යාපාර සහාය, අන්තර්ගත ඉවත් කිරීමේ ඉල්ලීම් හෝ පෞද්ගලිකත්ව ඉල්ලීම් සඳහා අපට ලියන්න.",
            email: "ඊමේල්",
            phone: "දුරකථන",
            whatsapp: "WhatsApp",
            soon: "සම්බන්ධතා විස්තර ඉක්මනින් මෙහි එකතු කෙරේ.",
            tipsTitle: "අපට ඉක්මනින් පිළිතුරු දීමට උදව් වීමට, කරුණාකර මේවා ඇතුළත් කරන්න:",
            tips: [
                "අන්තර්ගතය ඉවත් කිරීම හෝ පැමිණිල්ල: පිටුවේ සබැඳිය (URL).",
                "පෞද්ගලිකත්ව ඉල්ලීම (ඔබේ දත්ත බැලීම හෝ මකා දැමීම): ඔබේ ගිණුමේ ඊමේල් ලිපිනය.",
                "ව්‍යාපාර සහාය: ඔබේ ව්‍යාපාරයේ නම සහ ඔබට අවශ්‍ය දේ.",
            ],
            reportHint:
                "යමක් ඉක්මනින් වාර්තා කිරීමට, එම පිටුවේම ඇති 🚩 වාර්තා කරන්න බොත්තම භාවිත කරන්න.",
        },
    },
    ta: {
        updated: "கடைசியாகப் புதுப்பிக்கப்பட்டது",
        operatedBy: "நடத்துபவர்",
        questions: "இந்தப் பக்கம் பற்றிய கேள்விகள்?",
        contactUs: "எங்களைத் தொடர்புகொள்ளுங்கள்",
        footer: {
            about: "எங்களைப் பற்றி",
            contact: "தொடர்புக்கு",
            terms: "பயன்பாட்டு விதிமுறைகள்",
            privacy: "தனியுரிமைக் கொள்கை",
            content: "உள்ளடக்கக் கொள்கை",
        },
        consent: [
            "பதிவு செய்வதன் மூலம் நீங்கள் எங்கள் ",
            "பயன்பாட்டு விதிமுறைகள்",
            " மற்றும் ",
            "தனியுரிமைக் கொள்கை",
            " ஆகியவற்றை ஏற்கிறீர்கள்.",
        ],
        contact: {
            title: "எங்களைத் தொடர்புகொள்ளுங்கள்",
            intro:
                "கேள்விகள், வணிக ஆதரவு, உள்ளடக்கம் நீக்கக் கோரிக்கைகள் அல்லது தனியுரிமைக் கோரிக்கைகளுக்கு எங்களுக்கு எழுதுங்கள்.",
            email: "மின்னஞ்சல்",
            phone: "தொலைபேசி",
            whatsapp: "WhatsApp",
            soon: "தொடர்பு விவரங்கள் விரைவில் இங்கே சேர்க்கப்படும்.",
            tipsTitle: "விரைவாகப் பதிலளிக்க உதவ, தயவுசெய்து இவற்றைச் சேர்க்கவும்:",
            tips: [
                "உள்ளடக்கம் நீக்கம் அல்லது புகார்: பக்கத்தின் இணைப்பு (URL).",
                "தனியுரிமைக் கோரிக்கை (உங்கள் தரவைப் பார்க்க அல்லது நீக்க): உங்கள் கணக்கின் மின்னஞ்சல் முகவரி.",
                "வணிக ஆதரவு: உங்கள் வணிகத்தின் பெயர் மற்றும் உங்களுக்குத் தேவையானது.",
            ],
            reportHint:
                "ஏதாவது ஒன்றை விரைவாகப் புகாரளிக்க, அந்தப் பக்கத்திலேயே உள்ள 🚩 புகாரளி பொத்தானைப் பயன்படுத்துங்கள்.",
        },
    },
} as const;

export const LEGAL: Record<LegalKind, Record<Locale3, LegalDoc>> = {
    // ───────────────────────── ABOUT ─────────────────────────
    about: {
        en: {
            title: "About Lanka Voyage",
            sections: [
                {
                    h: "Our mission",
                    p: [
                        "Lanka Voyage is a travel platform for Sri Lanka. It helps visitors discover destinations, find places to stay, vehicles, guides and food, and helps Sri Lankan tourism businesses get found.",
                    ],
                },
                {
                    h: "What you can do here",
                    p: [
                        "Explore destinations and upcoming places, browse the directory and the map, read articles, watch videos and read reviews. Tourism businesses can register and manage their own listings.",
                    ],
                },
                {
                    h: "Tourism only",
                    p: [
                        "Everything published here must be about tourism in Sri Lanka. Listings, articles, videos and photos are reviewed before they go public.",
                    ],
                },
                {
                    h: "Independent platform",
                    p: [
                        "Listings are provided by the businesses themselves. Please check details (prices, opening hours, licences, safety) before you book or pay. Lanka Voyage is not a travel agent and does not take bookings or payments for tours, hotels or vehicles.",
                    ],
                },
            ],
        },
        si: {
            title: "Lanka Voyage ගැන",
            sections: [
                {
                    h: "අපගේ අරමුණ",
                    p: [
                        "Lanka Voyage යනු ශ්‍රී ලංකාව සඳහා වූ සංචාරක වේදිකාවකි. අමුත්තන්ට ගමනාන්ත සොයා ගැනීමටත්, නවාතැන්, වාහන, මගපෙන්වන්නන් සහ ආහාර සොයා ගැනීමටත්, ශ්‍රී ලංකාවේ සංචාරක ව්‍යාපාරවලට සොයා ගැනීමට පහසුකම් සැලසීමටත් මෙය උදව් වේ.",
                    ],
                },
                {
                    h: "ඔබට මෙහි කළ හැක්කේ",
                    p: [
                        "ගමනාන්ත සහ ඉදිරි ස්ථාන ගවේෂණය කිරීම, නාමාවලිය සහ සිතියම බැලීම, ලිපි කියවීම, වීඩියෝ නැරඹීම සහ සමාලෝචන කියවීම. සංචාරක ව්‍යාපාරවලට ලියාපදිංචි වී තමන්ගේම ලැයිස්තු කළමනාකරණය කළ හැක.",
                    ],
                },
                {
                    h: "සංචාරක කර්මාන්තය පමණි",
                    p: [
                        "මෙහි පළ කරන සියල්ල ශ්‍රී ලංකා සංචාරක කර්මාන්තයට අදාළ විය යුතුය. ලැයිස්තු, ලිපි, වීඩියෝ සහ ඡායාරූප පළ කිරීමට පෙර සමාලෝචනය කෙරේ.",
                    ],
                },
                {
                    h: "ස්වාධීන වේදිකාවකි",
                    p: [
                        "ලැයිස්තු සපයන්නේ ව්‍යාපාර විසින්මය. වෙන්කිරීමට හෝ ගෙවීමට පෙර විස්තර (මිල, විවෘත වේලාවන්, බලපත්‍ර, ආරක්ෂාව) පරීක්ෂා කරන්න. Lanka Voyage සංචාරක නියෝජිතයෙක් නොවන අතර සංචාර, හෝටල් හෝ වාහන සඳහා වෙන්කිරීම් හෝ ගෙවීම් භාර ගන්නේ නැත.",
                    ],
                },
            ],
        },
        ta: {
            title: "Lanka Voyage பற்றி",
            sections: [
                {
                    h: "எங்கள் நோக்கம்",
                    p: [
                        "Lanka Voyage இலங்கைக்கான ஒரு பயண தளம். பார்வையாளர்கள் சேருமிடங்கள், தங்குமிடங்கள், வாகனங்கள், வழிகாட்டிகள், உணவு ஆகியவற்றைக் கண்டறியவும், இலங்கை சுற்றுலா வணிகங்கள் கண்டறியப்படவும் இது உதவுகிறது.",
                    ],
                },
                {
                    h: "இங்கே நீங்கள் செய்யக்கூடியவை",
                    p: [
                        "சேருமிடங்கள் மற்றும் வரவிருக்கும் இடங்களை ஆராயலாம், பட்டியல் மற்றும் வரைபடத்தைப் பார்க்கலாம், கட்டுரைகளைப் படிக்கலாம், காணொளிகளைப் பார்க்கலாம், மதிப்புரைகளைப் படிக்கலாம். சுற்றுலா வணிகங்கள் பதிவுசெய்து தங்கள் பட்டியல்களை நிர்வகிக்கலாம்.",
                    ],
                },
                {
                    h: "சுற்றுலா மட்டும்",
                    p: [
                        "இங்கே வெளியிடப்படும் அனைத்தும் இலங்கை சுற்றுலா தொடர்பானதாக இருக்க வேண்டும். பட்டியல்கள், கட்டுரைகள், காணொளிகள், படங்கள் பொதுவில் வருவதற்கு முன் மதிப்பாய்வு செய்யப்படும்.",
                    ],
                },
                {
                    h: "சுயாதீன தளம்",
                    p: [
                        "பட்டியல்களை வணிகங்களே வழங்குகின்றன. முன்பதிவு செய்யும் அல்லது பணம் செலுத்தும் முன் விவரங்களை (விலை, திறக்கும் நேரம், உரிமங்கள், பாதுகாப்பு) சரிபார்க்கவும். Lanka Voyage ஒரு பயண முகவர் அல்ல; சுற்றுலா, ஹோட்டல் அல்லது வாகனங்களுக்கான முன்பதிவுகளையோ கட்டணங்களையோ ஏற்காது.",
                    ],
                },
            ],
        },
    },

    // ───────────────────────── TERMS ─────────────────────────
    terms: {
        en: {
            title: "Terms of Use",
            intro:
                "By using Lanka Voyage you agree to these terms. Please read them carefully.",
            sections: [
                {
                    h: "1. Using the platform",
                    p: [
                        "You can browse without an account. To post content you need an account. Give accurate information, keep your password secret, and remember you are responsible for what happens under your account.",
                    ],
                },
                {
                    h: "2. Your content",
                    p: [
                        "You keep the rights to what you post (listings, photos, videos, articles, reviews). You allow us to display it on the platform for as long as it is published. You confirm you wrote it or have permission to share it, and that it does not break anyone's rights.",
                    ],
                },
                {
                    h: "3. Tourism-only rule",
                    p: [
                        "Everything you post must be about tourism in Sri Lanka and follow our Content Policy. We may reject, hide or remove content, and suspend accounts that break the rules.",
                    ],
                },
                {
                    h: "4. Business listings",
                    p: [
                        "Businesses are responsible for the accuracy of their listings and for holding any licences or registrations required by law (for example SLTDA registration where applicable). The Verified badge means we checked the information shown to us. It is not a guarantee of quality or safety.",
                    ],
                },
                {
                    h: "5. Reviews",
                    p: [
                        "Reviews must be honest and based on your own experience. You may not review your own business. We may hide reviews that break the rules.",
                    ],
                },
                {
                    h: "6. Plans and payments",
                    p: [
                        "There is a free plan and paid plans, with limits shown on the Pricing page. Payment is made by bank transfer and confirmed by us manually. A paid plan starts after we confirm your payment. Prices may change for future purchases. If you think something was charged incorrectly, contact us.",
                    ],
                },
                {
                    h: "7. Information only: no bookings",
                    p: [
                        "Lanka Voyage provides information and links. We do not take bookings and we are not part of any agreement between a traveller and a business. Information may be incomplete or out of date: please verify prices, opening hours, entry rules and safety before you travel.",
                    ],
                },
                {
                    h: "8. Limits of our responsibility",
                    p: [
                        "To the extent allowed by law, we are not responsible for losses caused by third-party businesses, user content, or by relying on information on the platform.",
                    ],
                },
                {
                    h: "9. Changes and ending",
                    p: [
                        "We may update these terms; the date at the top shows the latest version. We may suspend accounts that break the rules. You can stop using the platform at any time and ask us to delete your account.",
                    ],
                },
                {
                    h: "10. Governing law",
                    p: ["These terms are governed by the laws of Sri Lanka."],
                },
            ],
        },
        si: {
            title: "භාවිත නියම",
            intro:
                "Lanka Voyage භාවිත කිරීමෙන් ඔබ මෙම නියමවලට එකඟ වේ. කරුණාකර ඒවා හොඳින් කියවන්න.",
            sections: [
                {
                    h: "1. වේදිකාව භාවිත කිරීම",
                    p: [
                        "ගිණුමක් නැතිව ඔබට බලන්න පුළුවන්. අන්තර්ගතයක් පළ කිරීමට ගිණුමක් අවශ්‍යයි. නිවැරදි තොරතුරු දෙන්න, ඔබේ මුරපදය රහසිගතව තබා ගන්න, ඔබේ ගිණුම යටතේ සිදුවන දේට ඔබ වගකිව යුතු බව මතක තබා ගන්න.",
                    ],
                },
                {
                    h: "2. ඔබේ අන්තර්ගතය",
                    p: [
                        "ඔබ පළ කරන දේ (ලැයිස්තු, ඡායාරූප, වීඩියෝ, ලිපි, සමාලෝචන) පිළිබඳ අයිතිය ඔබ සතුවම පවතී. එය පළ කර ඇති තාක් කල් වේදිකාවේ පෙන්වීමට ඔබ අපට අවසර දෙයි. ඔබ එය ලියූ බව හෝ බෙදා ගැනීමට අවසර ඇති බව සහ එය කිසිවෙකුගේ අයිතිවාසිකම් කඩ නොකරන බව ඔබ තහවුරු කරයි.",
                    ],
                },
                {
                    h: "3. සංචාරක-පමණක් රීතිය",
                    p: [
                        "ඔබ පළ කරන සියල්ල ශ්‍රී ලංකා සංචාරක කර්මාන්තයට අදාළ විය යුතු අතර අපගේ අන්තර්ගත ප්‍රතිපත්තිය පිළිපැදිය යුතුය. රීති කඩ කරන අන්තර්ගත අපට ප්‍රතික්ෂේප කිරීමට, සැඟවීමට හෝ ඉවත් කිරීමටත්, ගිණුම් අත්හිටුවීමටත් හැකිය.",
                    ],
                },
                {
                    h: "4. ව්‍යාපාර ලැයිස්තු",
                    p: [
                        "ව්‍යාපාරවලට තමන්ගේ ලැයිස්තුවල නිරවද්‍යතාවටත්, නීතියෙන් අවශ්‍ය බලපත්‍ර හෝ ලියාපදිංචි කිරීම් (උදා: අදාළ තැන SLTDA ලියාපදිංචිය) තබා ගැනීමටත් වගකීම ඇත. තහවුරු කළ (Verified) ලකුණෙන් කියවෙන්නේ අපට පෙන්වූ තොරතුරු අප පරීක්ෂා කළ බවයි. එය ගුණාත්මකභාවයේ හෝ ආරක්ෂාවේ සහතිකයක් නොවේ.",
                    ],
                },
                {
                    h: "5. සමාලෝචන",
                    p: [
                        "සමාලෝචන අවංක විය යුතු අතර ඔබේම අත්දැකීම පදනම් විය යුතුය. ඔබේම ව්‍යාපාරය සමාලෝචනය කළ නොහැක. රීති කඩ කරන සමාලෝචන අපට සැඟවිය හැක.",
                    ],
                },
                {
                    h: "6. පැකේජ් සහ ගෙවීම්",
                    p: [
                        "නොමිලේ පැකේජයක් සහ ගෙවන පැකේජ් ඇති අතර ඒවායේ සීමා මිල ගණන් පිටුවේ දක්වා ඇත. ගෙවීම් බැංකු මාරු කිරීමෙන් සිදු කෙරෙන අතර අප විසින් අතින් තහවුරු කෙරේ. ඔබේ ගෙවීම අප තහවුරු කළ පසු ගෙවන පැකේජය ආරම්භ වේ. අනාගත මිලදී ගැනීම් සඳහා මිල වෙනස් විය හැක. යමක් වැරදියට අය කළා යැයි ඔබ සිතන්නේ නම් අපව අමතන්න.",
                    ],
                },
                {
                    h: "7. තොරතුරු පමණි: වෙන්කිරීම් නැත",
                    p: [
                        "Lanka Voyage සපයන්නේ තොරතුරු සහ සබැඳි පමණි. අපි වෙන්කිරීම් භාර නොගන්නා අතර සංචාරකයෙකු සහ ව්‍යාපාරයක් අතර ඕනෑම ගිවිසුමකට අපි සම්බන්ධ නොවෙමු. තොරතුරු අසම්පූර්ණ හෝ යල්පැන ගිය ඒවා විය හැක: ගමන් කිරීමට පෙර මිල, විවෘත වේලාවන්, ප්‍රවේශ රීති සහ ආරක්ෂාව තහවුරු කරගන්න.",
                    ],
                },
                {
                    h: "8. අපගේ වගකීමේ සීමා",
                    p: [
                        "නීතියෙන් අවසර ඇති උපරිම ප්‍රමාණයට, තෙවන පාර්ශ්ව ව්‍යාපාර, පරිශීලක අන්තර්ගතය හෝ වේදිකාවේ ඇති තොරතුරු මත රඳා සිටීමෙන් වන අලාභ සඳහා අපි වගකියන්නේ නැත.",
                    ],
                },
                {
                    h: "9. වෙනස්කම් සහ අවසන් කිරීම",
                    p: [
                        "අපට මෙම නියම යාවත්කාලීන කළ හැක; උඩින් ඇති දිනයෙන් නවතම අනුවාදය පෙනේ. රීති කඩ කරන ගිණුම් අපට අත්හිටුවිය හැක. ඔබට ඕනෑම වේලාවක වේදිකාව භාවිත කිරීම නවත්වා ඔබේ ගිණුම මකන ලෙස අපෙන් ඉල්ලිය හැක.",
                    ],
                },
                {
                    h: "10. අදාළ නීතිය",
                    p: ["මෙම නියම ශ්‍රී ලංකාවේ නීතියට යටත් වේ."],
                },
            ],
        },
        ta: {
            title: "பயன்பாட்டு விதிமுறைகள்",
            intro:
                "Lanka Voyage ஐப் பயன்படுத்துவதன் மூலம் இந்த விதிமுறைகளை ஏற்கிறீர்கள். தயவுசெய்து கவனமாகப் படியுங்கள்.",
            sections: [
                {
                    h: "1. தளத்தைப் பயன்படுத்துதல்",
                    p: [
                        "கணக்கு இல்லாமல் நீங்கள் பார்வையிடலாம். உள்ளடக்கத்தை வெளியிட கணக்கு தேவை. சரியான தகவல்களை வழங்குங்கள், கடவுச்சொல்லை ரகசியமாக வையுங்கள், உங்கள் கணக்கில் நடப்பவற்றுக்கு நீங்களே பொறுப்பு.",
                    ],
                },
                {
                    h: "2. உங்கள் உள்ளடக்கம்",
                    p: [
                        "நீங்கள் வெளியிடுபவற்றின் (பட்டியல்கள், படங்கள், காணொளிகள், கட்டுரைகள், மதிப்புரைகள்) உரிமைகள் உங்களிடமே இருக்கும். அவை வெளியிடப்பட்டிருக்கும் வரை தளத்தில் காட்ட எங்களுக்கு அனுமதி அளிக்கிறீர்கள். நீங்கள் அதை எழுதினீர்கள் அல்லது பகிர அனுமதி உள்ளது, மேலும் அது யாருடைய உரிமையையும் மீறவில்லை என்பதை உறுதிப்படுத்துகிறீர்கள்.",
                    ],
                },
                {
                    h: "3. சுற்றுலா மட்டும் என்ற விதி",
                    p: [
                        "நீங்கள் வெளியிடும் அனைத்தும் இலங்கை சுற்றுலா தொடர்பானதாக இருக்க வேண்டும், எங்கள் உள்ளடக்கக் கொள்கையைப் பின்பற்ற வேண்டும். விதிகளை மீறும் உள்ளடக்கத்தை நாங்கள் நிராகரிக்கலாம், மறைக்கலாம் அல்லது நீக்கலாம்; கணக்குகளை இடைநிறுத்தலாம்.",
                    ],
                },
                {
                    h: "4. வணிகப் பட்டியல்கள்",
                    p: [
                        "வணிகங்கள் தங்கள் பட்டியல்களின் துல்லியத்துக்கும், சட்டப்படி தேவையான உரிமங்கள் அல்லது பதிவுகளை (எ.கா. பொருந்தும் இடங்களில் SLTDA பதிவு) வைத்திருப்பதற்கும் பொறுப்பு. சரிபார்க்கப்பட்டது (Verified) என்ற குறி, எங்களுக்குக் காட்டப்பட்ட தகவலைச் சரிபார்த்தோம் என்பதையே குறிக்கும். அது தரம் அல்லது பாதுகாப்புக்கான உத்தரவாதம் அல்ல.",
                    ],
                },
                {
                    h: "5. மதிப்புரைகள்",
                    p: [
                        "மதிப்புரைகள் நேர்மையானவையாகவும் உங்கள் சொந்த அனுபவத்தை அடிப்படையாகக் கொண்டவையாகவும் இருக்க வேண்டும். உங்கள் சொந்த வணிகத்தை மதிப்பாய்வு செய்ய முடியாது. விதிகளை மீறும் மதிப்புரைகளை நாங்கள் மறைக்கலாம்.",
                    ],
                },
                {
                    h: "6. திட்டங்களும் கட்டணங்களும்",
                    p: [
                        "இலவச திட்டமும் கட்டணத் திட்டங்களும் உள்ளன; வரம்புகள் விலைகள் பக்கத்தில் காட்டப்பட்டுள்ளன. கட்டணம் வங்கிப் பரிமாற்றம் மூலம் செலுத்தப்பட்டு, எங்களால் கைமுறையாக உறுதிப்படுத்தப்படும். உங்கள் கட்டணத்தை நாங்கள் உறுதிப்படுத்திய பின் கட்டணத் திட்டம் தொடங்கும். எதிர்கால வாங்குதல்களுக்கு விலைகள் மாறலாம். ஏதேனும் தவறாக வசூலிக்கப்பட்டதாக நினைத்தால் எங்களைத் தொடர்புகொள்ளுங்கள்.",
                    ],
                },
                {
                    h: "7. தகவல் மட்டும்: முன்பதிவுகள் இல்லை",
                    p: [
                        "Lanka Voyage தகவல்களையும் இணைப்புகளையும் மட்டுமே வழங்குகிறது. நாங்கள் முன்பதிவுகளை ஏற்பதில்லை; பயணிக்கும் வணிகத்துக்கும் இடையிலான எந்த ஒப்பந்தத்திலும் நாங்கள் பங்கேற்பதில்லை. தகவல்கள் முழுமையற்றதாகவோ காலாவதியானதாகவோ இருக்கலாம்: பயணிக்கும் முன் விலைகள், திறக்கும் நேரம், நுழைவு விதிகள், பாதுகாப்பைச் சரிபார்க்கவும்.",
                    ],
                },
                {
                    h: "8. எங்கள் பொறுப்பின் வரம்புகள்",
                    p: [
                        "சட்டம் அனுமதிக்கும் அளவுக்கு, மூன்றாம் தரப்பு வணிகங்கள், பயனர் உள்ளடக்கம், அல்லது தளத்தில் உள்ள தகவலை நம்பியதால் ஏற்படும் இழப்புகளுக்கு நாங்கள் பொறுப்பல்ல.",
                    ],
                },
                {
                    h: "9. மாற்றங்களும் முடிவும்",
                    p: [
                        "இந்த விதிமுறைகளை நாங்கள் புதுப்பிக்கலாம்; மேலே உள்ள தேதி சமீபத்திய பதிப்பைக் காட்டும். விதிகளை மீறும் கணக்குகளை இடைநிறுத்தலாம். நீங்கள் எப்போது வேண்டுமானாலும் தளத்தைப் பயன்படுத்துவதை நிறுத்தி, உங்கள் கணக்கை நீக்கும்படி கேட்கலாம்.",
                    ],
                },
                {
                    h: "10. பொருந்தும் சட்டம்",
                    p: ["இந்த விதிமுறைகள் இலங்கைச் சட்டங்களுக்கு உட்பட்டவை."],
                },
            ],
        },
    },

    // ───────────────────────── PRIVACY ─────────────────────────
    privacy: {
        en: {
            title: "Privacy Policy",
            intro:
                "This page explains what personal data Lanka Voyage collects, why, and what your choices are.",
            sections: [
                {
                    h: "1. What we collect",
                    p: [
                        "Account: your name, email address and account type. Your password is handled securely by our login provider; we never see it.",
                        "What you submit: business listings (business name, description, phone number, district, SLTDA number, photos and an optional map location), video links, articles, reviews, reports, and payment requests (plan, amount, note, payment code and your email).",
                        "Technical data: your IP address and basic request data appear in the server logs of our hosting providers.",
                        "Location: when you press 'Near me' or 'Use my current location', your browser finds your position and uses it to move the map. We do not store it unless you choose to save a business location pin.",
                    ],
                },
                {
                    h: "2. Why we use it",
                    p: [
                        "To run the platform, review content, confirm payments, prevent abuse and contact you about your account.",
                    ],
                },
                {
                    h: "3. What other people can see",
                    p: [
                        "Published content is public: this includes your display name on articles and reviews, and a business's phone number and location on its public listing. Your email address is never shown publicly. Payment requests are visible only to administrators and to you.",
                    ],
                },
                {
                    h: "4. Services we use",
                    p: [
                        "Hosting: Vercel. Database, file storage and login: Supabase (servers in Singapore).",
                        "Maps: when a map is shown, the OpenStreetMap tile servers receive your IP address and the map area requested.",
                        "Videos: video pages embed the YouTube player (youtube-nocookie.com), which may process data as described in YouTube's own policy.",
                        "We do not sell personal data. We currently use no advertising and no analytics trackers.",
                    ],
                },
                {
                    h: "5. Cookies",
                    p: [
                        "We use essential cookies to keep you logged in and to remember your language. We do not use advertising cookies.",
                    ],
                },
                {
                    h: "6. How long we keep data",
                    p: [
                        "While your account is active, and for published content until you or we remove it. Payment records are kept as long as needed for accounting and legal reasons.",
                    ],
                },
                {
                    h: "7. Your rights",
                    p: [
                        "You can ask to see, correct or delete your personal data, or object to how we use it, in line with Sri Lanka's Personal Data Protection Act No. 9 of 2022 and other applicable laws. You can delete your own reviews on the platform. For anything else, contact us.",
                    ],
                },
                {
                    h: "8. Security",
                    p: [
                        "We use standard security measures such as encrypted connections and access rules in our database. No system is perfectly secure, so please use a strong, unique password.",
                    ],
                },
                {
                    h: "9. Children",
                    p: [
                        "This platform is not meant for children. If you believe a child has created an account, please contact us.",
                    ],
                },
                {
                    h: "10. Changes",
                    p: [
                        "We may update this policy. The date at the top shows the latest version.",
                    ],
                },
            ],
        },
        si: {
            title: "රහස්‍යතා ප්‍රතිපත්තිය",
            intro:
                "මෙම පිටුවෙන් Lanka Voyage එකතු කරන පුද්ගලික දත්ත මොනවාද, ඒවා ඇයි, සහ ඔබට ඇති තේරීම් මොනවාද යන්න පැහැදිලි කෙරේ.",
            sections: [
                {
                    h: "1. අපි එකතු කරන දේ",
                    p: [
                        "ගිණුම: ඔබේ නම, ඊමේල් ලිපිනය සහ ගිණුම් වර්ගය. ඔබේ මුරපදය ආරක්ෂිතව හසුරුවන්නේ අපගේ ලොගින් සේවා සපයන්නා විසිනි; අපි එය කිසිවිටක නොදකිමු.",
                        "ඔබ ඉදිරිපත් කරන දේ: ව්‍යාපාර ලැයිස්තු (ව්‍යාපාරයේ නම, විස්තරය, දුරකථන අංකය, දිස්ත්‍රික්කය, SLTDA අංකය, ඡායාරූප සහ විකල්ප සිතියම් ස්ථානයක්), වීඩියෝ සබැඳි, ලිපි, සමාලෝචන, වාර්තා සහ ගෙවීම් ඉල්ලීම් (පැකේජය, මුදල, සටහන, ගෙවීම් කේතය සහ ඔබේ ඊමේල්).",
                        "තාක්ෂණික දත්ත: ඔබේ IP ලිපිනය සහ මූලික ඉල්ලීම් දත්ත අපගේ සත්කාරක සපයන්නන්ගේ සේවාදායක ලොග්වල පෙනේ.",
                        "ස්ථානය: ඔබ 'මට ආසන්නව' හෝ 'මගේ වත්මන් ස්ථානය භාවිත කරන්න' ඔබන විට, ඔබේ බ්‍රවුසරය ඔබේ පිහිටීම සොයාගෙන සිතියම ගෙන යාමට භාවිත කරයි. ඔබ ව්‍යාපාර ස්ථාන සලකුණක් සුරැකීමට තෝරන්නේ නම් මිස අපි එය ගබඩා නොකරමු.",
                    ],
                },
                {
                    h: "2. අපි එය භාවිත කරන්නේ ඇයි",
                    p: [
                        "වේදිකාව ක්‍රියාත්මක කිරීමට, අන්තර්ගතය සමාලෝචනය කිරීමට, ගෙවීම් තහවුරු කිරීමට, අනිසි භාවිත වැළැක්වීමට සහ ඔබේ ගිණුම ගැන ඔබව සම්බන්ධ කර ගැනීමට.",
                    ],
                },
                {
                    h: "3. අන් අයට පෙනෙන දේ",
                    p: [
                        "පළ කළ අන්තර්ගතය ප්‍රසිද්ධයි: ලිපි සහ සමාලෝචනවල ඔබේ පෙන්වන නම, සහ ව්‍යාපාරයක ප්‍රසිද්ධ ලැයිස්තුවේ දුරකථන අංකය සහ ස්ථානය මෙයට ඇතුළත්. ඔබේ ඊමේල් ලිපිනය කිසිවිටක ප්‍රසිද්ධියේ නොපෙන්වයි. ගෙවීම් ඉල්ලීම් පෙනෙන්නේ ඇඩ්මින්වරුන්ට සහ ඔබට පමණි.",
                    ],
                },
                {
                    h: "4. අපි භාවිත කරන සේවා",
                    p: [
                        "සත්කාරකත්වය: Vercel. දත්ත ගබඩාව, ගොනු ගබඩාව සහ ලොගින්: Supabase (සිංගප්පූරුවේ සේවාදායක).",
                        "සිතියම්: සිතියමක් පෙන්වන විට OpenStreetMap රූප කොටස් සේවාදායක ඔබේ IP ලිපිනය සහ ඉල්ලූ සිතියම් ප්‍රදේශය ලබා ගනී.",
                        "වීඩියෝ: වීඩියෝ පිටුවල YouTube ප්ලේයරය (youtube-nocookie.com) ඇතුළත් වන අතර, YouTube හි තමන්ගේ ප්‍රතිපත්තියේ සඳහන් පරිදි එයට දත්ත සැකසීමට පුළුවන.",
                        "අපි පුද්ගලික දත්ත විකුණන්නේ නැහැ. දැනට අපි දැන්වීම් හෝ විශ්ලේෂණ ලුහුබැඳීම් භාවිත නොකරමු.",
                    ],
                },
                {
                    h: "5. කුකීස් (Cookies)",
                    p: [
                        "ඔබව ලොගින් වී තබා ගැනීමට සහ ඔබේ භාෂාව මතක තබා ගැනීමට අපි අත්‍යවශ්‍ය කුකීස් භාවිත කරමු. දැන්වීම් කුකීස් භාවිත නොකරමු.",
                    ],
                },
                {
                    h: "6. දත්ත තබා ගන්නා කාලය",
                    p: [
                        "ඔබේ ගිණුම ක්‍රියාත්මක වන තාක් කල්, සහ පළ කළ අන්තර්ගතය ඔබ හෝ අප ඉවත් කරන තෙක්. ගෙවීම් වාර්තා ගිණුම්කරණය සහ නීතිමය හේතු සඳහා අවශ්‍ය තාක් කල් තබා ගනී.",
                    ],
                },
                {
                    h: "7. ඔබේ අයිතිවාසිකම්",
                    p: [
                        "2022 අංක 9 දරන ශ්‍රී ලංකාවේ පුද්ගලික දත්ත ආරක්ෂණ පනතට සහ අදාළ වෙනත් නීතිවලට අනුකූලව, ඔබේ පුද්ගලික දත්ත බැලීමට, නිවැරදි කිරීමට හෝ මකා දැමීමට, හෝ ඒවා අප භාවිත කරන ආකාරයට විරුද්ධ වීමට ඔබට ඉල්ලිය හැක. ඔබේම සමාලෝචන වේදිකාවේම මකා දැමිය හැක. අනෙක් සියල්ල සඳහා අපව අමතන්න.",
                    ],
                },
                {
                    h: "8. ආරක්ෂාව",
                    p: [
                        "සංකේතනය කළ සම්බන්ධතා සහ අපගේ දත්ත ගබඩාවේ ප්‍රවේශ රීති වැනි සම්මත ආරක්ෂණ ක්‍රම අපි භාවිත කරමු. කිසිම පද්ධතියක් සම්පූර්ණයෙන්ම ආරක්ෂිත නොවන නිසා ශක්තිමත්, අනන්‍ය මුරපදයක් භාවිත කරන්න.",
                    ],
                },
                {
                    h: "9. ළමයින්",
                    p: [
                        "මෙම වේදිකාව ළමයින් සඳහා නොවේ. ළමයෙකු ගිණුමක් සාදා ඇතැයි ඔබ සිතන්නේ නම් කරුණාකර අපව අමතන්න.",
                    ],
                },
                {
                    h: "10. වෙනස්කම්",
                    p: [
                        "අපට මෙම ප්‍රතිපත්තිය යාවත්කාලීන කළ හැක. උඩින් ඇති දිනයෙන් නවතම අනුවාදය පෙනේ.",
                    ],
                },
            ],
        },
        ta: {
            title: "தனியுரிமைக் கொள்கை",
            intro:
                "Lanka Voyage என்ன தனிப்பட்ட தரவைச் சேகரிக்கிறது, ஏன், உங்களுக்கு என்ன தேர்வுகள் உள்ளன என்பதை இந்தப் பக்கம் விளக்குகிறது.",
            sections: [
                {
                    h: "1. நாங்கள் சேகரிப்பவை",
                    p: [
                        "கணக்கு: உங்கள் பெயர், மின்னஞ்சல் முகவரி, கணக்கு வகை. உங்கள் கடவுச்சொல்லை எங்கள் உள்நுழைவு சேவை வழங்குநர் பாதுகாப்பாகக் கையாளுகிறார்; நாங்கள் அதைப் பார்ப்பதில்லை.",
                        "நீங்கள் சமர்ப்பிப்பவை: வணிகப் பட்டியல்கள் (வணிகப் பெயர், விளக்கம், தொலைபேசி எண், மாவட்டம், SLTDA எண், படங்கள், விருப்பமான வரைபட இடம்), காணொளி இணைப்புகள், கட்டுரைகள், மதிப்புரைகள், புகார்கள், கட்டணக் கோரிக்கைகள் (திட்டம், தொகை, குறிப்பு, கட்டணக் குறியீடு, உங்கள் மின்னஞ்சல்).",
                        "தொழில்நுட்பத் தரவு: உங்கள் IP முகவரியும் அடிப்படைக் கோரிக்கைத் தரவும் எங்கள் ஹோஸ்டிங் வழங்குநர்களின் சர்வர் பதிவுகளில் தோன்றும்.",
                        "இருப்பிடம்: நீங்கள் 'என் அருகில்' அல்லது 'என் தற்போதைய இடத்தைப் பயன்படுத்து' என்பதை அழுத்தும்போது, உங்கள் உலாவி உங்கள் இடத்தைக் கண்டறிந்து வரைபடத்தை நகர்த்தப் பயன்படுத்துகிறது. வணிக இடக் குறியைச் சேமிக்க நீங்கள் தேர்ந்தெடுத்தால் தவிர அதை நாங்கள் சேமிப்பதில்லை.",
                    ],
                },
                {
                    h: "2. ஏன் பயன்படுத்துகிறோம்",
                    p: [
                        "தளத்தை இயக்க, உள்ளடக்கத்தை மதிப்பாய்வு செய்ய, கட்டணங்களை உறுதிப்படுத்த, துஷ்பிரயோகத்தைத் தடுக்க, உங்கள் கணக்கு பற்றி உங்களைத் தொடர்புகொள்ள.",
                    ],
                },
                {
                    h: "3. மற்றவர்கள் பார்ப்பவை",
                    p: [
                        "வெளியிடப்பட்ட உள்ளடக்கம் பொதுவானது: கட்டுரைகள், மதிப்புரைகளில் உங்கள் காட்சிப் பெயர், ஒரு வணிகத்தின் பொதுப் பட்டியலில் அதன் தொலைபேசி எண் மற்றும் இடம் இதில் அடங்கும். உங்கள் மின்னஞ்சல் முகவரி பொதுவில் காட்டப்படாது. கட்டணக் கோரிக்கைகள் நிர்வாகிகளுக்கும் உங்களுக்கும் மட்டுமே தெரியும்.",
                    ],
                },
                {
                    h: "4. நாங்கள் பயன்படுத்தும் சேவைகள்",
                    p: [
                        "ஹோஸ்டிங்: Vercel. தரவுத்தளம், கோப்புச் சேமிப்பு, உள்நுழைவு: Supabase (சிங்கப்பூரில் சர்வர்கள்).",
                        "வரைபடங்கள்: வரைபடம் காட்டப்படும்போது, OpenStreetMap டைல் சர்வர்கள் உங்கள் IP முகவரியையும் கோரப்பட்ட வரைபடப் பகுதியையும் பெறுகின்றன.",
                        "காணொளிகள்: காணொளிப் பக்கங்கள் YouTube பிளேயரை (youtube-nocookie.com) உட்பொதிக்கின்றன; YouTube தன் சொந்தக் கொள்கையில் கூறியபடி தரவைச் செயலாக்கலாம்.",
                        "நாங்கள் தனிப்பட்ட தரவை விற்பதில்லை. தற்போது விளம்பரங்களோ பகுப்பாய்வு கண்காணிப்பான்களோ பயன்படுத்தவில்லை.",
                    ],
                },
                {
                    h: "5. குக்கீகள்",
                    p: [
                        "உங்களை உள்நுழைந்த நிலையில் வைக்கவும் உங்கள் மொழியை நினைவில் கொள்ளவும் அத்தியாவசியக் குக்கீகளைப் பயன்படுத்துகிறோம். விளம்பரக் குக்கீகளைப் பயன்படுத்துவதில்லை.",
                    ],
                },
                {
                    h: "6. தரவை எவ்வளவு காலம் வைத்திருக்கிறோம்",
                    p: [
                        "உங்கள் கணக்கு செயலில் இருக்கும் வரை; வெளியிடப்பட்ட உள்ளடக்கத்தை நீங்கள் அல்லது நாங்கள் நீக்கும் வரை. கட்டணப் பதிவுகள் கணக்கியல் மற்றும் சட்டக் காரணங்களுக்குத் தேவையான காலம் வரை வைக்கப்படும்.",
                    ],
                },
                {
                    h: "7. உங்கள் உரிமைகள்",
                    p: [
                        "2022 ஆம் ஆண்டின் 9 ஆம் இலக்க இலங்கை தனிப்பட்ட தரவுப் பாதுகாப்புச் சட்டம் மற்றும் பிற பொருந்தும் சட்டங்களுக்கு இணங்க, உங்கள் தனிப்பட்ட தரவைப் பார்க்க, திருத்த அல்லது நீக்கக் கோரலாம்; நாங்கள் அதைப் பயன்படுத்தும் விதத்தை எதிர்க்கலாம். உங்கள் மதிப்புரைகளைத் தளத்திலேயே நீக்கலாம். மற்றவற்றுக்கு எங்களைத் தொடர்புகொள்ளுங்கள்.",
                    ],
                },
                {
                    h: "8. பாதுகாப்பு",
                    p: [
                        "குறியாக்கப்பட்ட இணைப்புகள், தரவுத்தளத்தில் அணுகல் விதிகள் போன்ற நிலையான பாதுகாப்பு நடவடிக்கைகளைப் பயன்படுத்துகிறோம். எந்த அமைப்பும் முழுமையாகப் பாதுகாப்பானது அல்ல; எனவே வலுவான, தனித்துவமான கடவுச்சொல்லைப் பயன்படுத்துங்கள்.",
                    ],
                },
                {
                    h: "9. குழந்தைகள்",
                    p: [
                        "இந்தத் தளம் குழந்தைகளுக்கானது அல்ல. ஒரு குழந்தை கணக்கு உருவாக்கியதாக நீங்கள் நம்பினால் எங்களைத் தொடர்புகொள்ளுங்கள்.",
                    ],
                },
                {
                    h: "10. மாற்றங்கள்",
                    p: [
                        "இந்தக் கொள்கையை நாங்கள் புதுப்பிக்கலாம். மேலே உள்ள தேதி சமீபத்திய பதிப்பைக் காட்டும்.",
                    ],
                },
            ],
        },
    },

    // ───────────────────────── CONTENT POLICY ─────────────────────────
    content: {
        en: {
            title: "Content Policy",
            intro:
                "Lanka Voyage is for Sri Lanka tourism only. These rules keep it useful and safe for travellers and businesses.",
            sections: [
                {
                    h: "Allowed",
                    p: [
                        "Destination guides and travel stories, tips, food and culture, hotel, vehicle and guide experiences, festivals, wildlife and adventure, and listings of real tourism businesses in Sri Lanka.",
                    ],
                },
                {
                    h: "Not allowed",
                    p: [
                        "Anything that is not about Sri Lanka tourism; politics; adult content; hate, harassment or violence; gambling; illegal products or services; advertising for unrelated products; scams or false claims; spam; and content copied from other websites or that breaks someone's copyright.",
                    ],
                },
                {
                    h: "Business listings",
                    p: [
                        "List only a real tourism business that you own or are allowed to represent. Keep the phone number, location and description accurate. Do not claim a licence or SLTDA registration you do not have.",
                    ],
                },
                {
                    h: "Articles, videos and photos",
                    p: [
                        "Post only your own work, or work you have permission to share. Videos must be about Sri Lanka tourism and show the right place and category. Do not show people in a way that invades their privacy.",
                    ],
                },
                {
                    h: "Reviews",
                    p: [
                        "Write honestly about your own experience. Do not review your own business, do not post fake reviews, and do not insult people.",
                    ],
                },
                {
                    h: "How we enforce this",
                    p: [
                        "New listings, videos and articles are reviewed before they are published. Anyone can report content. We may remove content, hide reviews, and suspend accounts that break these rules.",
                    ],
                },
                {
                    h: "Report a problem",
                    p: [
                        "Use the 🚩 Report button on the page, or contact us with the link.",
                    ],
                },
            ],
        },
        si: {
            title: "අන්තර්ගත ප්‍රතිපත්තිය",
            intro:
                "Lanka Voyage ශ්‍රී ලංකා සංචාරක කර්මාන්තය සඳහා පමණි. මෙම රීති සංචාරකයන්ට සහ ව්‍යාපාරවලට එය ප්‍රයෝජනවත් සහ ආරක්ෂිතව තබයි.",
            sections: [
                {
                    h: "අවසර ඇත",
                    p: [
                        "ගමනාන්ත මාර්ගෝපදේශ සහ ගමන් කතා, උපදෙස්, ආහාර සහ සංස්කෘතිය, හෝටල්, වාහන සහ මගපෙන්වන්නන් පිළිබඳ අත්දැකීම්, උත්සව, වනජීවී සහ වික්‍රමාන්විත ක්‍රියා, සහ ශ්‍රී ලංකාවේ සැබෑ සංචාරක ව්‍යාපාරවල ලැයිස්තු.",
                    ],
                },
                {
                    h: "අවසර නැත",
                    p: [
                        "ශ්‍රී ලංකා සංචාරක කර්මාන්තයට අදාළ නොවන ඕනෑම දෙයක්; දේශපාලනය; වැඩිහිටි අන්තර්ගතය; වෛරය, හිරිහැර හෝ ප්‍රචණ්ඩත්වය; සූදුව; නීති විරෝධී භාණ්ඩ හෝ සේවා; අදාළ නොවන භාණ්ඩ සඳහා වෙළඳ දැන්වීම්; වංචා හෝ අසත්‍ය ප්‍රකාශ; spam; සහ වෙනත් වෙබ් අඩවිවලින් පිටපත් කළ හෝ කිසිවෙකුගේ ප්‍රකාශන හිමිකම කඩ කරන අන්තර්ගතය.",
                    ],
                },
                {
                    h: "ව්‍යාපාර ලැයිස්තු",
                    p: [
                        "ඔබ සතු හෝ නියෝජනය කිරීමට අවසර ඇති සැබෑ සංචාරක ව්‍යාපාරයක් පමණක් ලැයිස්තුගත කරන්න. දුරකථන අංකය, ස්ථානය සහ විස්තරය නිවැරදිව තබන්න. ඔබට නැති බලපත්‍රයක් හෝ SLTDA ලියාපදිංචියක් ඇතැයි නොකියන්න.",
                    ],
                },
                {
                    h: "ලිපි, වීඩියෝ සහ ඡායාරූප",
                    p: [
                        "ඔබේම නිර්මාණ, හෝ බෙදා ගැනීමට ඔබට අවසර ඇති ඒවා පමණක් පළ කරන්න. වීඩියෝ ශ්‍රී ලංකා සංචාරක කර්මාන්තයට අදාළ වී නිවැරදි ස්ථානය සහ කාණ්ඩය පෙන්විය යුතුය. මිනිසුන්ගේ පෞද්ගලිකත්වයට බලපාන ආකාරයට ඔවුන්ව නොපෙන්වන්න.",
                    ],
                },
                {
                    h: "සමාලෝචන",
                    p: [
                        "ඔබේ අත්දැකීම ගැන අවංකව ලියන්න. ඔබේම ව්‍යාපාරය සමාලෝචනය නොකරන්න, ව්‍යාජ සමාලෝචන නොදමන්න, මිනිසුන්ට නින්දා නොකරන්න.",
                    ],
                },
                {
                    h: "අපි මෙය බලාත්මක කරන ආකාරය",
                    p: [
                        "නව ලැයිස්තු, වීඩියෝ සහ ලිපි පළ කිරීමට පෙර සමාලෝචනය කෙරේ. ඕනෑම කෙනෙකුට අන්තර්ගතය වාර්තා කළ හැක. රීති කඩ කරන අන්තර්ගතය ඉවත් කිරීමටත්, සමාලෝචන සැඟවීමටත්, ගිණුම් අත්හිටුවීමටත් අපට හැක.",
                    ],
                },
                {
                    h: "ගැටලුවක් වාර්තා කරන්න",
                    p: [
                        "පිටුවේ ඇති 🚩 වාර්තා කරන්න බොත්තම භාවිත කරන්න, නැත්නම් සබැඳිය සමඟ අපව අමතන්න.",
                    ],
                },
            ],
        },
        ta: {
            title: "உள்ளடக்கக் கொள்கை",
            intro:
                "Lanka Voyage இலங்கை சுற்றுலாவுக்கு மட்டுமே. இந்த விதிகள் பயணிகளுக்கும் வணிகங்களுக்கும் இதைப் பயனுள்ளதாகவும் பாதுகாப்பாகவும் வைத்திருக்கின்றன.",
            sections: [
                {
                    h: "அனுமதிக்கப்படுபவை",
                    p: [
                        "சேருமிட வழிகாட்டிகளும் பயணக் கதைகளும், குறிப்புகள், உணவு மற்றும் கலாச்சாரம், ஹோட்டல், வாகனம், வழிகாட்டி அனுபவங்கள், திருவிழாக்கள், வனவிலங்கு மற்றும் சாகசம், இலங்கையிலுள்ள உண்மையான சுற்றுலா வணிகங்களின் பட்டியல்கள்.",
                    ],
                },
                {
                    h: "அனுமதிக்கப்படாதவை",
                    p: [
                        "இலங்கை சுற்றுலாவுடன் தொடர்பில்லாத எதுவும்; அரசியல்; வயதுவந்தோர் உள்ளடக்கம்; வெறுப்பு, துன்புறுத்தல் அல்லது வன்முறை; சூதாட்டம்; சட்டவிரோதப் பொருட்கள் அல்லது சேவைகள்; தொடர்பற்ற பொருட்களின் விளம்பரம்; மோசடிகள் அல்லது பொய்யான கூற்றுகள்; ஸ்பேம்; பிற இணையதளங்களிலிருந்து நகலெடுத்த அல்லது யாருடைய பதிப்புரிமையையும் மீறும் உள்ளடக்கம்.",
                    ],
                },
                {
                    h: "வணிகப் பட்டியல்கள்",
                    p: [
                        "நீங்கள் சொந்தமாக வைத்திருக்கும் அல்லது பிரதிநிதித்துவப்படுத்த அனுமதி பெற்ற உண்மையான சுற்றுலா வணிகத்தை மட்டும் பட்டியலிடுங்கள். தொலைபேசி எண், இடம், விளக்கத்தைச் சரியாக வையுங்கள். உங்களிடம் இல்லாத உரிமம் அல்லது SLTDA பதிவு இருப்பதாகக் கூறாதீர்கள்.",
                    ],
                },
                {
                    h: "கட்டுரைகள், காணொளிகள், படங்கள்",
                    p: [
                        "உங்கள் சொந்தப் படைப்புகளை அல்லது பகிர அனுமதி உள்ளவற்றை மட்டும் வெளியிடுங்கள். காணொளிகள் இலங்கை சுற்றுலா தொடர்பானவையாக இருந்து சரியான இடத்தையும் வகையையும் காட்ட வேண்டும். மக்களின் தனியுரிமையை மீறும் விதத்தில் அவர்களைக் காட்டாதீர்கள்.",
                    ],
                },
                {
                    h: "மதிப்புரைகள்",
                    p: [
                        "உங்கள் அனுபவத்தைப் பற்றி நேர்மையாக எழுதுங்கள். உங்கள் சொந்த வணிகத்தை மதிப்பாய்வு செய்யாதீர்கள், போலி மதிப்புரைகளை இடாதீர்கள், மக்களை அவமதிக்காதீர்கள்.",
                    ],
                },
                {
                    h: "இதை நாங்கள் எவ்வாறு நடைமுறைப்படுத்துகிறோம்",
                    p: [
                        "புதிய பட்டியல்கள், காணொளிகள், கட்டுரைகள் வெளியிடப்படும் முன் மதிப்பாய்வு செய்யப்படும். யார் வேண்டுமானாலும் உள்ளடக்கத்தைப் புகாரளிக்கலாம். இந்த விதிகளை மீறும் உள்ளடக்கத்தை நீக்கவும், மதிப்புரைகளை மறைக்கவும், கணக்குகளை இடைநிறுத்தவும் எங்களுக்கு உரிமை உண்டு.",
                    ],
                },
                {
                    h: "ஒரு பிரச்சினையைப் புகாரளிக்கவும்",
                    p: [
                        "பக்கத்திலுள்ள 🚩 புகாரளி பொத்தானைப் பயன்படுத்துங்கள், அல்லது இணைப்புடன் எங்களைத் தொடர்புகொள்ளுங்கள்.",
                    ],
                },
            ],
        },
    },
};