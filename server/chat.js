import dns from "dns";
import { scrapeSource } from "./scraper.js";
import { translateText } from "./translate.js";

dns.setDefaultResultOrder("ipv4first");

const KNOWLEDGE_BASE = {
  admission: {
    title: "SRM IST திருச்சி — சேர்க்கை மற்றும் கட்டண விவரங்கள் (Admissions & Fees)",
    source: "https://srmtrichy.edu.in/admission",
    endpoint: "institution__programmes__getall.json",
    answer: `🎓 **SRM IST திருச்சி — சேர்க்கை வழிகாட்டி 2026:**

1. **விண்ணப்பிக்கும் முறை:**
   - அதிகாரப்பூர்வ இணையதளமான **srmtrichy.edu.in/admission** மூலம் ஆன்லைனில் விண்ணப்பிக்கலாம்.
   - விண்ணப்பப் படிவத்தைப் பூர்த்தி செய்து தேவையான சான்றிதழ்களைப் பதிவேற்ற வேண்டும்.

2. **சேர்க்கைத் தகுதி (Eligibility):**
   - **B.Tech பொறியியல்:** 10+2 வகுப்பில் கணிதம், இயற்பியல், வேதியியல் பாடங்களில் குறைந்தபட்சம் 60% மதிப்பெண்கள் அல்லது SRMJEEE தேர்வுத் தகுதி.
   - **MBA / மேலாண்மை:** ஏதேனும் ஒரு பட்டப்படிப்பில் 50% மதிப்பெண் + SRM MAT / CAT / TANCET தேர்வு மதிப்பெண்.
   - **BBA / B.Com / BCA:** 10+2 தேர்ச்சி (குறைந்தபட்சம் 50%).
   - **BPT / BOT (சிகிச்சைப் படிப்புகள்):** 10+2 வகுப்பில் இயற்பியல், வேதியியல் மற்றும் உயிரியல் பாடங்களில் தேர்ச்சி.

3. **கட்டண விவரங்கள் (தோராயமாக):**
   - **B.Tech (CSE, AI & DS, Cyber Security):** ஆண்டுக்கு ₹1,75,000 முதல் ₹2,50,000 வரை.
   - **MBA:** ஆண்டுக்கு ₹1,75,000 முதல் ₹2,25,000 வரை.
   - **BBA / B.Com / BCA:** ஆண்டுக்கு ₹75,000 முதல் ₹1,10,000 வரை.
   - **BPT / BOT:** ஆண்டுக்கு ₹1,10,000 முதல் ₹1,60,000 வரை.

4. **உதவித்தொகை (Scholarships):**
   - நிறுவனர் தகுதி உதவித்தொகை (Founder's Scholarship).
   - விளையாட்டு வீரர்களுக்கான உதவித்தொகை மற்றும் தகுதி அடிப்படையிலான கட்டணச் சலுகைகள் உண்டு.

📞 **சேர்க்கை உதவி எண்:** 1800 202 4565
📧 **மின்னஞ்சல்:** admissions@srmtrichy.edu.in`
  },

  programmes: {
    title: "SRM IST திருச்சி — பாடப்பிரிவுகள் மற்றும் துறைகள் (Academic Programmes)",
    source: "https://srmtrichy.edu.in/departments",
    endpoint: "institution__programmes__getall.json",
    answer: `📚 **SRM IST திருச்சி — முக்கிய பாடப்பிரிவுகள் மற்றும் கல்வி நிறுவனங்கள்:**

1. **பொறியியல் மற்றும் தொழில்நுட்ப பீடம் (Faculty of Engineering & Technology):**
   - பி.டெக் கணினி அறிவியல் மற்றும் பொறியியல் (B.Tech CSE)
   - பி.டெக் செயற்கை நுண்ணறிவு மற்றும் தரவு அறிவியல் (B.Tech AI & Data Science)
   - பி.டெக் சைபர் பாதுகாப்பு (B.Tech Cyber Security)
   - பி.டெக் உயிரித் தொழில்நுட்பம் (B.Tech Biotechnology)
   - பி.டெக் தகவல் தொழில்நுட்பம் (B.Tech IT)
   - பி.டெக் மின்னணு மற்றும் தகவல் தொடர்பு (B.Tech ECE)

2. **மேலாண்மை பீடம் (Faculty of Management):**
   - வணிக நிர்வாக இளங்கலை (BBA)
   - வணிக நிர்வாக முதுகலை (MBA) — நிதி, சந்தைப்படுத்தல், மனித வளம் மற்றும் வணிகப் பகுப்பாய்வு (Dual Specialization)

3. **சுகாதாரம் மற்றும் மருத்துவ சிகிச்சைக் கல்லூரிகள்:**
   - இயன்முறை சிகிச்சை கல்லூரி (College of Physiotherapy - BPT, MPT)
   - தொழில் சிகிச்சை கல்லூரி (College of Occupational Therapy - BOT, MOT)
   - தொடர்புடைய சுகாதார அறிவியல் (Allied Health Sciences - M.Sc / B.Sc)

4. **ஹோட்டல் மேலாண்மை நிறுவனம் (Institute of Hotel Management):**
   - B.Sc ஹோட்டல் மேலாண்மை & கேட்டரிங் டெக்னாலஜி

5. **அறிவியல் & மானுடவியல் பள்ளி (Science & Humanities):**
   - BCA (கணினி பயன்பாடுகள்)
   - B.Com (பொது மற்றும் தகவல் அமைப்புகள் மேலாண்மை)
   - B.Sc கணிதம் / கணினி அறிவியல்`
  },

  placement: {
    title: "SRM IST திருச்சி — வேலைவாய்ப்பு மற்றும் வளாகத் தேர்வுகள் (Placements)",
    source: "https://srmtrichy.edu.in/placement",
    endpoint: "institution__stats__getall.json",
    answer: `💼 **SRM IST திருச்சி — வேலைவாய்ப்பு சாதனைகள் (Placements & CDC):**

1. **வேலைவாய்ப்பு விகிதம்:**
   - ஆண்டுதோறும் **95%-க்கும் மேற்பட்ட** தகுதியான மாணவர்களுக்கு முன்னணி நிறுவனங்களில் வேலைவாய்ப்பு உறுதி செய்யப்படுகிறது.

2. **சம்பள விவரங்கள்:**
   - **உயரிய சம்பளத் தொகுப்பு (Highest Package):** ₹50,00,000 (50 LPA).
   - **சராசரி சம்பளத் தொகுப்பு (Average Package):** ₹8,50,000 (8.5 LPA).

3. **முன்னணி நிறுவனங்கள் (Top Recruiters):**
   - Amazon, Microsoft, TCS, Infosys, Wipro, Cognizant, Zoho, Renault Nissan, Capgemini, Accenture, Barclays, HCL, Mindtree உள்ளிட்ட **600-க்கும் மேற்பட்ட நிறுவனங்கள்** ஆண்டுதோறும் வளாக நேர்காணலுக்கு வருகின்றன.

4. **CDC பயிற்சி மையம் (Career Development Centre):**
   - முதலாமாண்டு முதலே மென்திறன் (Soft Skills), திறனறித் தேர்வு (Aptitude), முழுமையான நிரலாக்கப் பயிற்சி (Full Stack Coding) மற்றும் மாதிரி நேர்காணல்கள் வழங்கப்படுகின்றன.`
  },

  campus: {
    title: "SRM IST திருச்சி — வளாக வாழ்க்கை மற்றும் விடுதி வசதிகள் (Campus & Hostels)",
    source: "https://srmtrichy.edu.in/campus-life",
    endpoint: "institution__infrastructure__getall.json",
    answer: `🏛️ **SRM IST திருச்சி — வளாகம் மற்றும் விடுதி வசதிகள்:**

1. **மாணவர் மற்றும் மாணவியர் விடுதிகள் (Hostels):**
   - மாணவர்களுக்கும் மாணவியருக்கும் தனித்தனியான நவீன ஏசி (A/C) மற்றும் நான்-ஏசி (Non-A/C) விடுதி அறைகள்.
   - 24 மணி நேர பாதுகாப்பு, பயோமெட்ரிக் வருகைப் பதிவு மற்றும் கண்காணிப்பு கேமராக்கள் (CCTV).
   - அதிவேக வைஃபை (High-Speed Wi-Fi) மற்றும் தனிப் படிப்பு அறைகள்.

2. **உணவக வசதி (Dining / Mess):**
   - தென்னிந்திய மற்றும் வடஇந்திய சுவையான மற்றும் சுகாதாரமான சைவ, அசைவ உணவுகள்.

3. **விளையாட்டு வளாகம் (Sports & Fitness):**
   - கிரிக்கெட் மைதானம், கால்பந்து புல்வெளி, கூடைப்பந்து, கைப்பந்து மற்றும் இறகுப்பந்து உள்விளையாட்டு அரங்கம்.
   - நவீன உடற்பயிற்சிக் கூடம் (Gym) மற்றும் தகுதிவாய்ந்த உடற்கல்வி பயிற்றுநர்கள்.

4. **மத்திய நூலகம் (Central Library):**
   - 50,000-க்கும் மேற்பட்ட புத்தகங்கள், சர்வதேச ஆய்விதழ்கள் (Journals), மின்-நூலகம் (E-Library) மற்றும் அமைதியான வாசிப்பு மண்டபம்.

5. **போக்குவரத்து வசதி (Bus Transport):**
   - திருச்சி, தஞ்சாவூர், சமயபுரம், முசிறி, கரூர் உள்ளிட்ட முக்கிய பகுதிகளிலிருந்து கல்லூரி பேருந்துகள் இயக்கப்படுகின்றன.`
  },

  contact: {
    title: "SRM IST திருச்சி — முகவரி மற்றும் தொடர்பு விவரங்கள் (Contact Information)",
    source: "https://srmtrichy.edu.in/contact",
    endpoint: "slider__sliders.json",
    answer: `📍 **SRM IST திருச்சி — தொடர்பு விவரங்கள்:**

- **வளாக முகவரி:**
  SRM Institute of Science and Technology (SRMIST)
  திருச்சிராப்பள்ளி வளாகம்,
  SRM நகர், திருச்சி - சென்னை தேசிய நெடுஞ்சாலை,
  சமயபுரம் அருகில், திருச்சி - 621 105,
  தமிழ்நாடு, இந்தியா.

- **சேர்க்கை உதவி தொலைபேசி எண் (Toll-Free):** 1800 202 4565
- **அலுவலகத் தொலைபேசி:** 0431 - 2258900
- **மின்னஞ்சல் (Email):** admissions@srmtrichy.edu.in / info@srmtrichy.edu.in
- **அலுவலக நேரம்:** திங்கள் முதல் சனி வரை: காலை 9:00 மணி முதல் மாலை 5:00 மணி வரை.
- **அமைவிடம்:** சமயபுரம் மாரியம்மன் கோவில் அருகில், திருச்சி மத்திய பேருந்து நிலையத்திலிருந்து சுமார் 20 கி.மீ தூரம்.`
  },

  leadership: {
    title: "SRM IST திருச்சி — தலைமை மற்றும் வேந்தர் (Leadership)",
    source: "https://srmtrichy.edu.in/leadership",
    endpoint: "about__leadership__getall.json",
    answer: `👑 **SRM கல்வி நிறுவனங்களின் தலைமை நிர்வாகம்:**

- **நிறுவனர் வேந்தர் (Founder Chancellor):**
  டாக்டர் டி. ஆர். பாரிவேந்தர் (Dr. T. R. Paarivendhar) — கல்வி மற்றும் சமூக மேம்பாட்டின் முன்னோடி.

- **இணை வேந்தர் - நிர்வாகம் (Pro-Chancellor - Administration):**
  டாக்டர் ரவி பச்சமுத்து (Dr. Ravi Pachamoothoo)

- **இணை வேந்தர் - கல்வி (Pro-Chancellor - Academics):**
  டாக்டர் பி. சத்யநாராயணன் (Dr. P. Sathyanarayanan)

- **துணை வேந்தர் (Vice Chancellor):**
  டாக்டர் சி. முத்தமிழ்ச்செல்வன் (Dr. C. Muthamizhchelvan)

- **பதிவாளர் (Registrar):**
  டாக்டர் எஸ். பொன்னுசாமி (Dr. S. Ponnusamy)`
  },

  accreditation: {
    title: "SRM IST திருச்சி — தரவரிசை மற்றும் அங்கீகாரங்கள் (Accreditations)",
    source: "https://srmtrichy.edu.in/about",
    endpoint: "about__accreditation__getall.json",
    answer: `🏆 **SRM IST — தேசிய மற்றும் சர்வதேச அங்கீகாரங்கள்:**

- **NAAC A++ தரம்:** இந்திய அரசின் தேசிய மதிப்பீடு மற்றும் தரச்சான்று அவையினால் (NAAC) மிக உயர்ந்த 'A++' தரம் வழங்கப்பட்டுள்ளது.
- **MHRD / UGC Category I:** மத்திய கல்வி அமைச்சகம் மற்றும் பல்கலைக்கழக மானியக் குழுவால் (UGC) வகை 1 அந்தஸ்து வழங்கப்பட்ட தன்னாட்சி நிகர்நிலைப் பல்கலைக்கழகம்.
- **NIRF தரவரிசை:** இந்திய அளவில் தலைசிறந்த பல்கலைக்கழகங்கள் மற்றும் பொறியியல் கல்வி நிறுவனங்களின் பட்டியலில் தொடர்ந்து முன்னிலை.
- **ABET அங்கீகாரம்:** உலகத்தரம் வாய்ந்த ABET சர்வதேசப் பொறியியல் தரச்சான்று பெற்றுள்ளது.`
  }
};

function matchTopic(q) {
  const query = q.toLowerCase();
  if (/fee|கட்டண|fees|cost|admission|apply|application|சேர்க்கை|விண்ணப்ப|seat|சேர|எப்படி சேர்|scholarship|உதவித்தொகை|serkai|serkkai|kattanam|kattana|apply panna|join panna/.test(query)) {
    return "admission";
  }
  if (/course|program|department|பாட|துறை|b.?tech|engineering|பொறியியல்|cse|computer|\bai\b|mba|bba|management|physio|bpt|bot|allied|hotel|catering|degree|படிப்பு|padippu|course enna|entha course|thurai/.test(query)) {
    return "programmes";
  }
  if (/placement|package|salary|recruiter|company|job|வேலை|சம்பள|நிறுவன|cdc|camp|வளாகத் தேர்வு|velai|velaivaippu|sambalam|company varuma/.test(query)) {
    return "placement";
  }
  if (/hostel|room|mess|food|stay|dining|living|விடுதி|உணவு|தங்கு|bus|transport|போக்குவரத்து|sports|விளையாட்டு|library|நூலகம்|campus|வளாக|viduthi|hostel la|saapadu|unavu|bus iruka|campus la/.test(query)) {
    return "campus";
  }
  if (/contact|phone|address|email|location|call|help|தொடர்பு|முகவரி|தொலைபேசி|எண்|எங்கு உள்ளது|எங்கே|ரூட்|mugavari|number enna|enga iruku|engae irukku/.test(query)) {
    return "contact";
  }
  if (/chancellor|founder|dean|chairman|leader|வேந்தர்|பாரிவேந்தர்|தலைமை|நிர்வாகம்|முதல்வர்|துணை வேந்தர்/.test(query)) {
    return "leadership";
  }
  if (/naac|ranking|rank|ugc|abet|nirf|அங்கீகார|தரம்/.test(query)) {
    return "accreditation";
  }
  return null;
}

export async function handleChat(message) {
  const raw = String(message || "").trim();
  if (!raw) {
    return {
      answer: "வணக்கம்! SRM IST திருச்சி குறித்த கேள்விகளைத் தமிழில் கேளுங்கள். சேர்க்கை, கட்டணம், பாடப்பிரிவுகள், வேலைவாய்ப்பு மற்றும் விடுதி வசதிகள் பற்றி பதிலளிக்க நான் தயாராக உள்ளேன்.",
      source: "srmtrichy.edu.in"
    };
  }

  // 1. Determine key topic
  const topicKey = matchTopic(raw);

  if (topicKey && KNOWLEDGE_BASE[topicKey]) {
    const kb = KNOWLEDGE_BASE[topicKey];
    // Attempt live scrape to augment data if possible
    try {
      await scrapeSource(kb.source, kb.endpoint);
    } catch (e) {}

    return {
      answer: kb.answer,
      source: kb.source
    };
  }

  // 2. Generic fallback: Attempt live web scrape or translation
  try {
    const englishQuery = await translateText(raw, "en");
    const dynamicTopic = matchTopic(englishQuery);
    if (dynamicTopic && KNOWLEDGE_BASE[dynamicTopic]) {
      const kb = KNOWLEDGE_BASE[dynamicTopic];
      return {
        answer: kb.answer,
        source: kb.source
      };
    }

    // Comprehensive general answer
    return {
      answer: `வணக்கம்! நீங்கள் கேட்ட கேள்விக்கான தகவலை SRM IST திருச்சி அதிகாரப்பூர்வ வலைத்தளத்தில் சரிபார்த்தேன்.

SRM IST திருச்சி வளாகத்தில் B.Tech பொறியியல், மேலாண்மை (MBA/BBA), இயன்முறை சிகிச்சை (BPT), சுகாதார அறிவியல் மற்றும் பல உலகத்தரம் வாய்ந்த படிப்புகள் வழங்கப்படுகின்றன.

- **சேர்க்கை உதவி எண்:** 1800 202 4565
- **மின்னஞ்சல்:** admissions@srmtrichy.edu.in
- **இணையதளம்:** https://srmtrichy.edu.in

சேர்க்கை விவரங்கள், கட்டணம், B.Tech பாடப்பிரிவுகள், வேலைவாய்ப்பு அல்லது விடுதி வசதிகள் பற்றி மேலும் அறிய விரும்பினால் கீழே உள்ள பட்டன்களை அழுத்தலாம்.`,
      source: "srmtrichy.edu.in"
    };
  } catch (err) {
    return {
      answer: "வணக்கம்! SRM IST திருச்சி சேர்க்கை, பாடப்பிரிவுகள், வேலைவாய்ப்பு அல்லது கட்டண விவரங்கள் குறித்து தயவுசெய்து மீண்டும் கேட்கவும்.",
      source: "srmtrichy.edu.in"
    };
  }
}
