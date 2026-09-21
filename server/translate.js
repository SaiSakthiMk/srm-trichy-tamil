import dns from "dns";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dns.setDefaultResultOrder("ipv4first");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = path.join(__dirname, "tamil-cache.json");

const cache = new Map();

// Load cache from disk if available
try {
  if (fs.existsSync(CACHE_FILE)) {
    const raw = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    for (const [k, v] of Object.entries(raw)) {
      cache.set(k, v);
    }
    console.log(`Loaded ${cache.size} translations from disk cache.`);
  }
} catch (e) {
  console.warn("Could not load translation cache:", e.message);
}

let saveTimer = null;
function queueSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      const obj = {};
      for (const [k, v] of cache.entries()) {
        obj[k] = v;
      }
      fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), "utf8");
    } catch (e) {}
  }, 1000);
}

const STATIC_DICT = {
  "Home": "முகப்பு",
  "About": "எங்களைப் பற்றி",
  "About Us": "எங்களைப் பற்றி",
  "Academics": "கல்வி",
  "Academic Programs": "கல்வித் திட்டங்கள்",
  "Academic Calendar": "கல்வி நாட்காட்டி",
  "Departments": "துறைகள்",
  "Admissions": "சேர்க்கை",
  "Admissions 2026": "சேர்க்கை 2026",
  "Admission": "சேர்க்கை",
  "Placement": "வேலைவாய்ப்பு",
  "Placements": "வேலைவாய்ப்புகள்",
  "Campus Life": "வளாக வாழ்க்கை",
  "Campus": "வளாகம்",
  "Research": "ஆராய்ச்சி",
  "Research Home": "ஆராய்ச்சி முகப்பு",
  "International Affairs": "சர்வதேச அலுவல்கள்",
  "Students": "மாணவர்கள்",
  "News & Events": "செய்திகள் & நிகழ்வுகள்",
  "Contact": "தொடர்பு",
  "Contact Us": "எங்களைத் தொடர்பு கொள்ளவும்",
  "Overview": "மேலோட்டம்",
  "Vision & Mission": "தொலைநோக்கு & நோக்கம்",
  "Leadership": "தலைமை",
  "Policy": "கொள்கை",
  "Exam Cell": "தேர்வுப் பிரிவு",
  "Examcell": "தேர்வுப் பிரிவு",
  "Library": "நூலகம்",
  "Sports": "விளையாட்டு",
  "Hostels": "விடுதிகள்",
  "Transport": "போக்குவரத்து",
  "Apply Now": "இப்போதே விண்ணப்பிக்கவும்",
  "Learn More": "மேலும் அறிக",
  "Download Brochure": "விளக்க ஏடு பதிவிறக்குக",
  "Explore Programs": "பாடத்திட்டங்களை ஆராயுங்கள்",
  "Explore Campus": "வளாகத்தை ஆராயுங்கள்",
  "View Placements": "வேலைவாய்ப்புகளைக் காண்க",
  "World Class Education": "உலகத் தரம் வாய்ந்த கல்வி",
  "Faculty of Engineering and Technology": "பொறியியல் மற்றும் தொழில்நுட்ப பீடம்",
  "Faculty of Management": "மேலாண்மை பீடம்",
  "Institute of Hotel Management": "ஹோட்டல் மேலாண்மை நிறுவனம்",
  "College of Physiotherapy": "இயன்முறை சிகிச்சை கல்லூரி",
  "College of Occupational Therapy": "தொழில் சிகிச்சை கல்லூரி",
  "Allied Health Sciences": "தொடர்புடைய சுகாதார அறிவியல் கல்லூரி",
  "Science & Humanities": "அறிவியல் மற்றும் மானுடவியல் பள்ளி"
};

function looksTamil(s) {
  return /[\u0B80-\u0BFF]/.test(s);
}

async function googleTranslate(text, target) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);
  try {
    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
      encodeURIComponent(target) +
      "&dt=t&q=" +
      encodeURIComponent(text.slice(0, 4500));
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error("gtx " + res.status);
    const data = await res.json();
    if (!Array.isArray(data?.[0])) throw new Error("gtx parse");
    return data[0].map((x) => x[0]).join("");
  } finally {
    clearTimeout(timeoutId);
  }
}

async function myMemory(text, target) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);
  try {
    const pair = target === "en" ? "ta|en" : "en|ta";
    const url =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text.slice(0, 500)) +
      "&langpair=" +
      pair;
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error("mm " + res.status);
    const data = await res.json();
    const out = data?.responseData?.translatedText;
    if (!out) throw new Error("mm empty");
    return out;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function translateText(text, target = "ta") {
  const t = String(text || "").trim();
  if (!t) return t;
  if (target === "ta" && looksTamil(t)) return t;
  if (target === "en" && !looksTamil(t)) return t;
  
  if (target === "ta" && STATIC_DICT[t]) {
    return STATIC_DICT[t];
  }

  const key = target + "::" + t;
  if (cache.has(key)) return cache.get(key);

  let out = t;
  try {
    out = await googleTranslate(t, target);
  } catch {
    try {
      const parts = [];
      for (let i = 0; i < t.length; i += 450) {
        parts.push(await myMemory(t.slice(i, i + 450), target));
      }
      out = parts.join(" ");
    } catch {
      out = t;
    }
  }

  cache.set(key, out);
  queueSave();
  return out;
}

export async function translateMany(texts) {
  const out = [];
  for (const t of texts) {
    try {
      out.push(await translateText(t, "ta"));
    } catch {
      out.push(t);
    }
  }
  return out;
}

