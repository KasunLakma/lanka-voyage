export type Locale3 = "en" | "si" | "ta";
type L3 = { en: string; si: string; ta: string };

// Destinations shown on the home page and the destinations page
export const DESTINATIONS = [
    {
        slug: "sigiriya",
        image: "/images/sigiriya.jpg",
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

// Detail page content (later this will come from the database)
export const DETAILS: Record<
    string,
    { summary: L3; bestTime: L3; highlights: L3[] }
> = {
    sigiriya: {
        summary: {
            en: "Sigiriya is an ancient rock fortress rising about 180 metres above the jungle in central Sri Lanka. Built in the 5th century and now a UNESCO World Heritage Site, it is famous for its frescoes, mirror wall and summit gardens.",
            si: "සීගිරිය යනු මධ්‍යම ශ්‍රී ලංකාවේ වනාන්තරයෙන් මීටර් 180ක් පමණ උසට නැඟී ඇති පුරාණ පර්වත බලකොටුවකි. 5 වන සියවසේ ඉදිකළ මෙය දැන් යුනෙස්කෝ ලෝක උරුමයකි. බිතුසිතුවම්, කැඩපත් පවුර සහ මුදුනේ උද්‍යාන සඳහා ප්‍රසිද්ධය.",
            ta: "சிகிரியா மத்திய இலங்கையின் காட்டுப்பகுதியிலிருந்து சுமார் 180 மீட்டர் உயரத்தில் எழும் ஒரு பழமையான பாறைக் கோட்டை. 5ஆம் நூற்றாண்டில் கட்டப்பட்ட இது தற்போது யுனெஸ்கோ உலக பாரம்பரியத் தளமாகும்; சுவரோவியங்கள், கண்ணாடிச் சுவர், உச்சியிலுள்ள தோட்டங்கள் ஆகியவற்றுக்குப் பிரசித்தி பெற்றது.",
        },
        bestTime: {
            en: "January – April",
            si: "ජනවාරි – අප්‍රේල්",
            ta: "ஜனவரி – ஏப்ரல்",
        },
        highlights: [
            {
                en: "Climb Lion Rock",
                si: "සිංහ පර්වතය නැඟීම",
                ta: "சிங்கப் பாறையில் ஏறுதல்",
            },
            {
                en: "Sunrise from Pidurangala Rock",
                si: "පිදුරංගල පර්වතයෙන් හිරු උදාව",
                ta: "பிதுரங்கல பாறையில் சூரிய உதயம்",
            },
            {
                en: "Mirror Wall and frescoes",
                si: "කැඩපත් පවුර සහ බිතුසිතුවම්",
                ta: "கண்ணாடிச் சுவரும் சுவரோவியங்களும்",
            },
        ],
    },
    ella: {
        summary: {
            en: "Ella is a relaxed hill-country village surrounded by tea estates, waterfalls and misty mountains. It is known for the Nine Arches Bridge, easy hikes and one of the world's most scenic train rides.",
            si: "ඇල්ල යනු තේ වතු, දිය ඇල්ල සහ මීදුමෙන් වැසුණු කඳු වලින් වට වූ සන්සුන් කඳුකර ගමකි. ආරුක්කු නවයේ පාලම, පහසු කඳු ගමන් සහ ලොව සුන්දරතම දුම්රිය ගමනක් සඳහා ප්‍රසිද්ධය.",
            ta: "எல்ல தேயிலைத் தோட்டங்கள், நீர்வீழ்ச்சிகள், மூடுபனி மலைகள் சூழ்ந்த அமைதியான மலைநாட்டு கிராமம். ஒன்பது வளைவுப் பாலம், எளிய மலையேற்றங்கள், உலகின் அழகான ரயில் பயணங்களில் ஒன்றுக்குப் பெயர் பெற்றது.",
        },
        bestTime: {
            en: "January – March",
            si: "ජනවාරි – මාර්තු",
            ta: "ஜனவரி – மார்ச்",
        },
        highlights: [
            {
                en: "Nine Arches Bridge",
                si: "ආරුක්කු නවයේ පාලම",
                ta: "ஒன்பது வளைவுப் பாலம்",
            },
            {
                en: "Little Adam's Peak hike",
                si: "පුංචි ශ්‍රී පාද කන්ද නැඟීම",
                ta: "சிறிய ஆதாம் மலை ஏற்றம்",
            },
            {
                en: "Scenic train ride from Kandy",
                si: "මහනුවර සිට දුම්රිය ගමන",
                ta: "கண்டியிலிருந்து ரயில் பயணம்",
            },
        ],
    },
    mirissa: {
        summary: {
            en: "Mirissa is a laid-back beach town on the south coast with golden sand and palm-fringed bays. It is one of the best places in Sri Lanka for whale watching, surfing and sunset beach evenings.",
            si: "මිරිස්ස යනු දකුණු වෙරළේ රන්වන් වැලි සහ පොල් ගස් වැටුණු බොක්ක සහිත සන්සුන් වෙරළබඩ නගරයකි. තල්මසුන් නැරඹීම, සර්ෆින් සහ වෙරළේ හිරු බැසීම සඳහා ලංකාවේ හොඳම ස්ථානවලින් එකකි.",
            ta: "மிரிஸ்ஸ தெற்குக் கடற்கரையிலுள்ள அமைதியான கடற்கரை நகரம்; தங்க நிற மணலும் தென்னை சூழ்ந்த விரிகுடாக்களும் கொண்டது. திமிங்கலம் பார்த்தல், அலைச்சறுக்கு, மாலைச் சூரிய அஸ்தமனம் ஆகியவற்றுக்கு இலங்கையின் சிறந்த இடங்களில் ஒன்று.",
        },
        bestTime: {
            en: "November – April",
            si: "නොවැම්බර් – අප්‍රේල්",
            ta: "நவம்பர் – ஏப்ரல்",
        },
        highlights: [
            {
                en: "Whale watching",
                si: "තල්මසුන් නැරඹීම",
                ta: "திமிங்கலம் பார்த்தல்",
            },
            {
                en: "Sunset at Coconut Tree Hill",
                si: "පොල් ගස් කන්දේ හිරු බැසීම",
                ta: "தேங்காய் மரக் குன்றில் சூரிய அஸ்தமனம்",
            },
            {
                en: "Surfing and beach cafés",
                si: "සර්ෆින් සහ වෙරළබඩ කැෆේ",
                ta: "அலைச்சறுக்கும் கடற்கரை கஃபேகளும்",
            },
        ],
    },
    kandy: {
        summary: {
            en: "Kandy is Sri Lanka's last royal capital, set around a lake in the central hills. It is home to the Temple of the Tooth Relic, a UNESCO World Heritage Site, and hosts the famous Esala Perahera pageant every July or August.",
            si: "මහනුවර යනු මධ්‍යම කඳුකරයේ වැවක් වටා පිහිටි ශ්‍රී ලංකාවේ අවසන් රාජධානියයි. යුනෙස්කෝ ලෝක උරුමයක් වන ශ්‍රී දළදා මාළිගාව මෙහි පිහිටා ඇති අතර සෑම වසරකම ජූලි හෝ අගෝස්තු මාසයේ ප්‍රසිද්ධ ඇසළ පෙරහැර පැවැත්වේ.",
            ta: "கண்டி இலங்கையின் கடைசி அரச தலைநகரம்; மத்திய மலைப்பகுதியில் ஏரியைச் சுற்றி அமைந்துள்ளது. யுனெஸ்கோ உலக பாரம்பரியத் தளமான தலதா மாளிகை இங்குள்ளது; ஒவ்வொரு ஆண்டும் ஜூலை அல்லது ஆகஸ்ட் மாதத்தில் புகழ்பெற்ற எசல பெரஹெரா நடைபெறும்.",
        },
        bestTime: {
            en: "January – April (Esala Perahera: July/August)",
            si: "ජනවාරි – අප්‍රේල් (ඇසළ පෙරහැර: ජූලි/අගෝස්තු)",
            ta: "ஜனவரி – ஏப்ரல் (எசல பெரஹெரா: ஜூலை/ஆகஸ்ட்)",
        },
        highlights: [
            {
                en: "Temple of the Tooth Relic",
                si: "ශ්‍රී දළදා මාළිගාව",
                ta: "தலதா மாளிகை",
            },
            {
                en: "Peradeniya Royal Botanic Gardens",
                si: "පේරාදෙණිය රාජකීය උද්භිද උද්‍යානය",
                ta: "பேராதனை அரச தாவரவியல் பூங்கா",
            },
            {
                en: "Walk around Kandy Lake",
                si: "මහනුවර වැව වටා ඇවිදීම",
                ta: "கண்டி ஏரியைச் சுற்றி நடை",
            },
        ],
    },
    yala: {
        summary: {
            en: "Yala National Park, in the south-east, is one of Sri Lanka's most visited wildlife parks and is known for its high density of leopards. Elephants, crocodiles, sloth bears and many birds also live among its scrub, lagoons and rocky outcrops.",
            si: "ගිනිකොනදිග පිහිටි යාල ජාතික වනෝද්‍යානය ලංකාවේ වැඩිපුරම නරඹන වනජීවී උද්‍යානවලින් එකක් වන අතර දිවියන්ගේ ඝනත්වය වැඩි බැවින් ප්‍රසිද්ධය. පඳුරු, කලපු සහ පාෂාණ අතර අලි, කිඹුලන්, වලස් සහ විවිධ පක්ෂීන්ද වාසය කරති.",
            ta: "தென்கிழக்கில் உள்ள யால தேசியப் பூங்கா இலங்கையில் அதிகம் பார்வையிடப்படும் வனவிலங்கு பூங்காக்களில் ஒன்று; சிறுத்தைகளின் அடர்த்திக்குப் பெயர் பெற்றது. புதர்க்காடுகள், கடற்கழிகள், பாறைகள் இடையே யானைகள், முதலைகள், கரடிகள், பல பறவைகளும் வாழ்கின்றன.",
        },
        bestTime: {
            en: "February – July (check park closures)",
            si: "පෙබරවාරි – ජූලි (උද්‍යාන වසා තැබීම් පරීක්ෂා කරන්න)",
            ta: "பிப்ரவரி – ஜூலை (பூங்கா மூடல்களைச் சரிபார்க்கவும்)",
        },
        highlights: [
            { en: "Leopard safari", si: "දිවි සෆාරි", ta: "சிறுத்தை சஃபாரி" },
            {
                en: "Wild elephants",
                si: "වල් අලි නැරඹීම",
                ta: "காட்டு யானைகள்",
            },
            {
                en: "Bird watching",
                si: "පක්ෂි නිරීක්ෂණය",
                ta: "பறவை நோக்குதல்",
            },
        ],
    },
};

// Sample upcoming destinations (REPLACE with real, officially sourced projects later)
export const UPCOMING = [
    {
        slug: "sample-1",
        image: "/images/mirissa.jpg",
        status: "opensSoon",
        expected: "2027",
        name: {
            en: "Sample: Coastal Eco Park",
            si: "නියැදිය: වෙරළබඩ පරිසර උද්‍යානය",
            ta: "மாதிரி: கடலோர சூழல் பூங்கா",
        },
    },
    {
        slug: "sample-2",
        image: "/images/yala1.jpg",
        status: "underConstruction",
        expected: "2028",
        name: {
            en: "Sample: Wildlife Visitor Centre",
            si: "නියැදිය: වනජීවී අමුත්තන් මධ්‍යස්ථානය",
            ta: "மாதிரி: வனவிலங்கு பார்வையாளர் மையம்",
        },
    },
    {
        slug: "sample-3",
        image: "/images/ella.jpg",
        status: "planned",
        expected: "2029",
        name: {
            en: "Sample: Hill Country Trail",
            si: "නියැදිය: කඳුකර ගමන් මාර්ගය",
            ta: "மாதிரி: மலைநாட்டு நடைப்பாதை",
        },
    },
] as const;

export const SAMPLE_NOTE: L3 = {
    en: "These are sample entries. Real projects will be added with an official source.",
    si: "මේවා නියැදි ඇතුළත් කිරීම් පමණි. සැබෑ ව්‍යාපෘති නිල මූලාශ්‍රයක් සමඟ එකතු කෙරේ.",
    ta: "இவை மாதிரி பதிவுகள் மட்டுமே. உண்மையான திட்டங்கள் அதிகாரப்பூர்வ மூலத்துடன் சேர்க்கப்படும்.",
};

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

// Text for the new pages
export const UI_TEXT = {
    en: {
        destinations: "Destinations",
        destinationsSub: "Explore the places that make Sri Lanka special.",
        about: "About",
        bestTime: "Best time to visit",
        highlights: "Highlights",
        services: "Services nearby",
        stays: "Stays",
        guides: "Guides",
        vehicles: "Vehicles",
        food: "Food",
        plan: "Plan this trip",
        enquiryTitle: "Have a question?",
        enquirySub:
            "Leave your details and we will connect you with local providers.",
        name: "Your name",
        phone: "Phone or email",
        message: "Message",
        send: "Send",
        comingSoonNote: "Sending will be enabled soon.",
        back: "All destinations",
        upcoming: "Upcoming destinations",
        upcomingSub: "New places being developed or about to open.",
        sample: "Sample data",
        opensSoon: "Opening soon",
        planned: "Planned",
        underConstruction: "Under construction",
        follow: "Follow",
        expected: "Expected",
    },
    si: {
        destinations: "ගමනාන්ත",
        destinationsSub: "ශ්‍රී ලංකාව විශේෂ කරන ස්ථාන ගවේෂණය කරන්න.",
        about: "ගැන",
        bestTime: "සංචාරය කිරීමට හොඳම කාලය",
        highlights: "විශේෂත්වයන්",
        services: "අවට සේවා",
        stays: "නවාතැන්",
        guides: "මගපෙන්වන්නන්",
        vehicles: "වාහන",
        food: "ආහාර",
        plan: "මෙම ගමන සැලසුම් කරන්න",
        enquiryTitle: "ප්‍රශ්නයක් තිබේද?",
        enquirySub:
            "ඔබේ විස්තර තබන්න, අපි ඔබව ප්‍රදේශයේ සේවා සපයන්නන් සමඟ සම්බන්ධ කරන්නෙමු.",
        name: "ඔබේ නම",
        phone: "දුරකථන අංකය හෝ ඊමේල්",
        message: "පණිවිඩය",
        send: "යවන්න",
        comingSoonNote: "යැවීම ඉක්මනින් සක්‍රීය වේ.",
        back: "සියලු ගමනාන්ත",
        upcoming: "ඉදිරි ගමනාන්ත",
        upcomingSub: "සංවර්ධනය වන හෝ ඉක්මනින් විවෘත වන නව ස්ථාන.",
        sample: "නියැදි දත්ත",
        opensSoon: "ඉක්මනින් විවෘතයි",
        planned: "සැලසුම්ගත",
        underConstruction: "ඉදිවෙමින්",
        follow: "අනුගමනය",
        expected: "අපේක්ෂිත",
    },
    ta: {
        destinations: "சேருமிடங்கள்",
        destinationsSub: "இலங்கையைச் சிறப்பாக்கும் இடங்களை ஆராயுங்கள்.",
        about: "அறிமுகம்",
        bestTime: "செல்ல சிறந்த காலம்",
        highlights: "சிறப்பம்சங்கள்",
        services: "அருகிலுள்ள சேவைகள்",
        stays: "தங்குமிடங்கள்",
        guides: "வழிகாட்டிகள்",
        vehicles: "வாகனங்கள்",
        food: "உணவு",
        plan: "இந்தப் பயணத்தைத் திட்டமிடுங்கள்",
        enquiryTitle: "கேள்வி உள்ளதா?",
        enquirySub:
            "உங்கள் விவரங்களை விடுங்கள்; உள்ளூர் சேவை வழங்குநர்களுடன் இணைக்கிறோம்.",
        name: "உங்கள் பெயர்",
        phone: "தொலைபேசி அல்லது மின்னஞ்சல்",
        message: "செய்தி",
        send: "அனுப்பு",
        comingSoonNote: "அனுப்பும் வசதி விரைவில் இயக்கப்படும்.",
        back: "அனைத்து சேருமிடங்கள்",
        upcoming: "வரவிருக்கும் இடங்கள்",
        upcomingSub: "உருவாக்கப்படும் அல்லது விரைவில் திறக்கப்படும் புதிய இடங்கள்.",
        sample: "மாதிரி தரவு",
        opensSoon: "விரைவில் திறப்பு",
        planned: "திட்டமிடப்பட்டது",
        underConstruction: "கட்டுமானத்தில்",
        follow: "பின்தொடர்",
        expected: "எதிர்பார்க்கப்படுவது",
    },
} as const;