(function () {
  // Merge comprehensive dictionary if present
  const DICT = Object.assign({
    Home: "முகப்பு",
    About: "எங்களைப் பற்றி",
    "About Us": "எங்களைப் பற்றி",
    Academics: "கல்வி",
    "Academic Programs": "கல்வித் திட்டங்கள்",
    "Academic Calendar": "கல்வி நாட்காட்டி",
    Placement: "வேலைவாய்ப்பு",
    Placements: "வேலைவாய்ப்புகள்",
    "Placement Home": "வேலைவாய்ப்பு முகப்பு",
    Campus: "வளாகம்",
    "Campus Life": "வளாக வாழ்க்கை",
    Research: "ஆராய்ச்சி",
    "Research Home": "ஆராய்ச்சி முகப்பு",
    "Sponsored Research": "நிதியுதவி ஆராய்ச்சி",
    "International Affairs": "சர்வதேச அலுவல்கள்",
    "International Relations": "சர்வதேச உறவுகள்",
    Students: "மாணவர்கள்",
    "News & Events": "செய்திகள் & நிகழ்வுகள்",
    Contact: "தொடர்பு",
    "Contact Us": "எங்களைத் தொடர்பு கொள்ளவும்",
    "Admissions 2026": "சேர்க்கை 2026",
    Admission: "சேர்க்கை",
    Admissions: "சேர்க்கை",
    "Fee Payment": "கட்டணம் செலுத்துதல்",
    "Fee Payment →": "கட்டணம் செலுத்துதல் →",
    Overview: "மேலோட்டம்",
    "Vision & Mission": "தொலைநோக்கு & நோக்கம்",
    "Our Vision": "எங்கள் தொலைநோக்கு",
    "Our Mission": "எங்கள் நோக்கம்",
    Leadership: "தலைமை",
    "Apex Leadership": "உயர் தலைமை",
    "Administrative Heads": "நிர்வாகத் தலைவர்கள்",
    "Academics Head": "கல்வித் தலைவர்கள்",
    Policy: "கொள்கை",
    NAAC: "NAAC அங்கீகாரம்",
    Infrastructure: "உள்கட்டமைப்பு",
    Departments: "துறைகள்",
    "Career Development Centre": "தொழில் வளர்ச்சி மையம் (CDC)",
    "Career Development Centre (CDC-CET)": "தொழில் வளர்ச்சி மையம் (CDC-CET)",
    "CDC Programs": "CDC பயிற்சித் திட்டங்கள்",
    Hostels: "விடுதிகள்",
    Hostel: "விடுதி",
    "Boys' Hostel": "மாணவர் விடுதி",
    "Girls' Hostel": "மாணவியர் விடுதி",
    Library: "நூலகம்",
    "Central Library": "மத்திய நூலகம்",
    Sports: "விளையாட்டு",
    "Sports & Athletics": "விளையாட்டு & தடகளம்",
    NCC: "தேசிய மாணவர் படை (NCC)",
    NSS: "நாட்டு நலப்பணித் திட்டம் (NSS)",
    Transport: "போக்குவரத்து",
    Examcell: "தேர்வுப் பிரிவு",
    "Exam Cell": "தேர்வுப் பிரிவு",
    Announcements: "அறிவிப்புகள்",
    "For Admission →": "சேர்க்கைக்கு →",
    "Learn More": "மேலும் அறிக",
    "Download Brochure": "விளக்க ஏடு பதிவிறக்குக",
    "Apply Now": "இப்போதே விண்ணப்பிக்கவும்",
    "View Placements": "வேலைவாய்ப்புகளைக் காண்க",
    "Explore Campus": "வளாகத்தை ஆராயுங்கள்",
    "Explore Programs": "பாடத்திட்டங்களை ஆராயுங்கள்",
    "Send Message": "செய்தி அனுப்பு",
    "Enter First Name": "முதல் பெயரை உள்ளிடவும்",
    "Enter Last Name": "கடைசி பெயரை உள்ளிடவும்",
    "Enter Email": "மின்னஞ்சலை உள்ளிடவும்",
    "Enter Phone": "தொலைபேசி எண்ணை உள்ளிடவும்",
    "Enter Message": "செய்தியை உள்ளிடவும்",
    "First Name *": "முதல் பெயர் *",
    "Last Name": "கடைசி பெயர்",
    "Email *": "மின்னஞ்சல் *",
    "Phone *": "தொலைபேசி எண் *",
    Message: "செய்தி",
    "Chat with us on WhatsApp": "WhatsApp-இல் எங்களுடன் பேசுங்கள்",
    Governance: "ஆளுமை",
    Careers: "வேலை வாய்ப்புகள்",
    "Careers at SRM": "SRM-இல் வேலை வாய்ப்புகள்",
    "SCROLL TO EXPLORE": "ஆராய கீழே உருட்டவும்",
    "Scroll to Explore": "ஆராய கீழே உருட்டவும்",
    "ABOUT SRM TRICHY": "SRM திருச்சி பற்றி",
    "About SRM Trichy": "SRM திருச்சி பற்றி",
    "World Class Education": "உலகத் தரம் வாய்ந்த கல்வி",
    "Now in Trichy": "இப்போது திருச்சியில்",
    "What Defines": "எது தனித்துவமாக்குகிறது",
    "Rankings & Accreditations": "தரவரிசை & அங்கீகாரங்கள்",
    "Purpose-Driven Excellence": "நோக்கமுடைய சிறப்பு",
    "Leadership & Vision": "தலைமை & தொலைநோக்கு",
    "Programs Designed for Tomorrow's Leaders": "நாளைத் தலைவர்களுக்கான பாடத்திட்டங்கள்",
    "Life Beyond the Classroom": "வகுப்பறைக்கு அப்பால் வாழ்க்கை",
    "Hear It From Our Students": "எங்கள் மாணவர்களிடமிருந்து கேளுங்கள்",
    "We'd Love to Hear From You": "உங்களிடமிருந்து கேட்க விரும்புகிறோம்",
    "OUR RECOGNITION": "எங்கள் அங்கீகாரம்",
    "OUR VISION & MISSION": "எங்கள் தொலைநோக்கு & நோக்கம்",
    "OUR MANAGEMENT": "எங்கள் நிர்வாகம்",
    "ACADEMIC PROGRAMS": "கல்வித் திட்டங்கள்",
    "CAMPUS LIFE": "வளாக வாழ்க்கை",
    "STUDENT STORIES": "மாணவர் கதைகள்",
    "GET IN TOUCH": "தொடர்பு கொள்ளுங்கள்",
    "Get In Touch": "தொடர்பு கொள்ளுங்கள்",
    "Faculty of Engineering and Technology": "பொறியியல் மற்றும் தொழில்நுட்ப பீடம்",
    "Faculty of Management": "மேலாண்மை பீடம்",
    "Institute of Hotel Management": "ஹோட்டல் மேலாண்மை நிறுவனம்",
    "College of Physiotherapy": "இயன்முறை சிகிச்சை கல்லூரி",
    "College of Occupational Therapy": "தொழில் சிகிச்சை கல்லூரி",
    "Allied Health Sciences": "தொடர்புடைய சுகாதார அறிவியல் கல்லூரி",
    "Science & Humanities": "அறிவியல் & மானுடவியல் பள்ளி",
    "School of Computing": "கணினி அறிவியல் பள்ளி",
    "School of Electrical and Electronics Engineering": "மின் மற்றும் மின்னணு பொறியியல் பள்ளி",
    "School of Mechanical Engineering": "இயந்திரப் பொறியியல் பள்ளி",
    "School of Biosciences and Technology": "உயிரியல் அறிவியல் மற்றும் தொழில்நுட்பப் பள்ளி",
    "Department of Computer Science": "கணினி அறிவியல் துறை",
    "Department of Commerce": "வணிகவியல் துறை",
    "Industry-Integrated Curriculum": "தொழில் ஒருங்கிணைந்த பாடத்திட்டம்",
    "Download Our Prospectus.": "எங்கள் விளக்க ஏட்டைப் பதிவிறக்கவும்.",
    "Start Your Journey.": "உங்கள் பயணத்தைத் தொடங்குங்கள்.",
    Address: "முகவரி",
    Phone: "தொலைபேசி",
    Email: "மின்னஞ்சல்",
    "Office Hours": "அலுவலக நேரம்",
    "Quick Links": "விரைவு இணைப்புகள்",
    "INNOVATION DRIVES SUCCESS": "புத்தாக்கம் வெற்றியை இயக்குகிறது",
    "WELLNESS MEETS LEARNING": "நல்வாழ்வு கற்றலைச் சந்திக்கிறது",
    "FUTURE STARTS HERE": "எதிர்காலம் இங்கே தொடங்குகிறது",
    "Career Growth": "தொழில் வளர்ச்சி",
    "Balanced Living": "சமநிலை வாழ்க்கை",
    "Endless Opportunities": "முடிவற்ற வாய்ப்புகள்",
    "SRM IST Trichy": "SRM IST திருச்சி",
    "SRM IST TRICHY": "SRM IST திருச்சி",
    Loading: "ஏற்றுகிறது...",
    "Loading...": "ஏற்றுகிறது...",
    "Mandatory Disclosure": "கட்டாய வெளியிடுதல்",
    Communication: "தொடர்பாடல்"
  }, window.SRM_TAMIL_DICT || {});

  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "CODE", "PRE", "TEXTAREA"]);
  const originalTextMap = new WeakMap();
  const translatedNodes = new WeakSet();

  let tamilOn = localStorage.getItem("srm_tamil_lang") !== "en";
  let queue = [];
  let timer = null;

  function hasTamil(s) {
    return /[\u0B80-\u0BFF]/.test(s);
  }

  function isTranslatable(s) {
    const t = s.replace(/\s+/g, " ").trim();
    if (!t || t.length < 2) return false;
    if (hasTamil(t)) return false;
    if (/^[\d\s.,:+\-/%₹$()#@&]+$/.test(t)) return false;
    if (/^https?:|^[\w.+-]+@[\w.-]+$/.test(t)) return false;
    if (/^[A-Z]{2,6}$/.test(t) && t.length <= 6) return false;
    return /[A-Za-z]/.test(t);
  }

  function translateNode(node) {
    if (!node || node.nodeType !== 3) return;
    const raw = node.nodeValue;
    if (!originalTextMap.has(node)) {
      originalTextMap.set(node, raw);
    }

    if (!tamilOn) {
      const orig = originalTextMap.get(node);
      if (orig !== undefined && node.nodeValue !== orig) {
        node.nodeValue = orig;
      }
      return;
    }

    if (!isTranslatable(raw)) return;
    const text = raw.replace(/\s+/g, " ").trim();

    // 1. Direct dictionary match
    if (DICT[text]) {
      node.nodeValue = raw.replace(text, DICT[text]);
      translatedNodes.add(node);
      return;
    }

    // 2. Multi-word phrase or compound word replacement
    let replaced = raw;
    let found = false;
    for (const [en, ta] of Object.entries(DICT)) {
      if (en.length >= 3 && replaced.includes(en)) {
        replaced = replaced.split(en).join(ta);
        found = true;
      }
    }
    if (found) {
      node.nodeValue = replaced;
      translatedNodes.add(node);
      return;
    }

    // 3. Fallback queue for backend translate API
    queue.push({ node, text });
    schedule();
  }

  function translateAttributes(el) {
    if (!el || !el.getAttribute) return;
    ["placeholder", "title", "aria-label"].forEach((attr) => {
      const val = el.getAttribute(attr);
      if (!val) return;
      const key = "orig_" + attr;
      if (!el.hasAttribute(key)) el.setAttribute(key, val);

      if (!tamilOn) {
        el.setAttribute(attr, el.getAttribute(key));
        return;
      }
      if (DICT[val]) {
        el.setAttribute(attr, DICT[val]);
      }
    });
  }

  function walk(root) {
    if (!root) return;
    const it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p || SKIP.has(p.tagName)) return NodeFilter.FILTER_REJECT;
        if (p.closest("#srm-ta-root") || p.closest(".srm-ta-toggle")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let n;
    while ((n = it.nextNode())) translateNode(n);

    const selector = "input[placeholder], textarea[placeholder], button[title], [aria-label]";
    const els = root.querySelectorAll ? root.querySelectorAll(selector) : [];
    els.forEach((el) => {
      if (!el.closest("#srm-ta-root")) translateAttributes(el);
    });
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(flush, 300);
  }

  async function flush() {
    if (!queue.length || !tamilOn) return;
    const batch = queue.splice(0, 30);
    const unique = [];
    const map = new Map();
    batch.forEach((item) => {
      if (!map.has(item.text)) {
        map.set(item.text, []);
        unique.push(item.text);
      }
      map.get(item.text).push(item.node);
    });

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: unique }),
      });
      if (res.ok) {
        const data = await res.json();
        (data.translations || []).forEach((ta, i) => {
          const en = unique[i];
          if (!ta || ta === en) return;
          DICT[en] = ta;
          (map.get(en) || []).forEach((node) => {
            if (!node || !node.nodeValue) return;
            node.nodeValue = node.nodeValue.replace(en, ta);
            translatedNodes.add(node);
          });
        });
      }
    } catch (e) {}
    if (queue.length) schedule();
  }

  function mountChat() {
    if (document.getElementById("srm-ta-root")) return;
    const root = document.createElement("div");
    root.id = "srm-ta-root";
    root.innerHTML = `
      <button class="srm-ta-toggle" id="srm-ta-lang" type="button" title="மொழியை மாற்றவும்">
        ${tamilOn ? "தமிழ் ⇄ EN" : "EN ⇄ தமிழ்"}
      </button>
      <button class="srm-ta-btn" id="srm-ta-open" type="button" title="SRM திருச்சி தமிழ் உதவியாளர்">
        <span class="srm-ta-btn-icon">💬</span>
        <span class="srm-ta-btn-badge">MozhiAI</span>
      </button>
      <div class="srm-ta-panel" id="srm-ta-panel">
        <div class="srm-ta-head">
          <div class="srm-ta-head-info">
            <div class="srm-ta-head-title">
              <span class="srm-ta-head-dot"></span>
              <h3>SRM திருச்சி · MozhiAI</h3>
            </div>
            <p>அதிகாரப்பூர்வ இணையதளத் தகவல் உதவியாளர்</p>
          </div>
          <button type="button" id="srm-ta-close" title="மூடுக">✕</button>
        </div>
        <div class="srm-ta-msgs" id="srm-ta-msgs"></div>
        <div class="srm-ta-chips" id="srm-ta-chips"></div>
        <form class="srm-ta-form" id="srm-ta-form">
          <input id="srm-ta-input" autocomplete="off" placeholder="உங்கள் கேள்வியைத் தமிழில் கேளுங்கள்..." />
          <button type="submit" id="srm-ta-send">அனுப்பு</button>
        </form>
      </div>
    `;
    document.body.appendChild(root);

    const panel = document.getElementById("srm-ta-panel");
    const msgs = document.getElementById("srm-ta-msgs");
    const chips = document.getElementById("srm-ta-chips");
    const form = document.getElementById("srm-ta-form");
    const input = document.getElementById("srm-ta-input");
    const langBtn = document.getElementById("srm-ta-lang");
    const openBtn = document.getElementById("srm-ta-open");
    const head = panel.querySelector(".srm-ta-head");

    function speakTamil(text) {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(String(text).replace(/[★•*_#`]/g, " "));
      utterance.lang = "ta-IN";
      utterance.rate = 0.9;
      const voice = window.speechSynthesis.getVoices().find((item) => /^ta(?:-|_)/i.test(item.lang));
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }

    function addMsg(text, who, src) {
      const d = document.createElement("div");
      d.className = "srm-ta-msg " + who;
      
      const content = document.createElement("div");
      content.className = "srm-ta-msg-content";
      content.textContent = text;
      d.appendChild(content);

      if (who === "bot" && !d.classList.contains("typing") && "speechSynthesis" in window) {
        const voiceButton = document.createElement("button");
        voiceButton.type = "button";
        voiceButton.className = "srm-ta-voice";
        voiceButton.textContent = "🔊 கேளுங்கள்";
        voiceButton.onclick = () => speakTamil(text);
        d.appendChild(voiceButton);
      }

      if (src) {
        const s = document.createElement("div");
        s.className = "srm-ta-src";
        s.innerHTML = "<strong>அதிகாரப்பூர்வ மூலம்:</strong> " + src;
        d.appendChild(s);
      }
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    addMsg(
      "வணக்கம்! நான் SRM IST திருச்சி தமிழ் தகவல் உதவியாளர். அதிகாரப்பூர்வ இணையதளம் மற்றும் அதன் தரவுகளின் அடிப்படையில் சேர்க்கை, கட்டணம், B.Tech பாடப்பிரிவுகள், வேலைவாய்ப்பு, விடுதி மற்றும் வளாக விவரங்களைத் தமிழில் வழங்குகிறேன்.",
      "bot"
    );

    const quickQuestions = [
      "சேர்க்கை மற்றும் கட்டணம் விவரம்",
      "B.Tech பாடப்பிரிவுகள் என்னென்ன?",
      "வேலைவாய்ப்பு மற்றும் நிறுவனங்கள்",
      "விடுதி மற்றும் உணவு வசதிகள்",
      "முகவரி மற்றும் தொடர்பு எண்",
      "பல்கலைக்கழக தலைமை & வேந்தர்"
    ];

    quickQuestions.forEach((q) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = q;
      b.onclick = () => ask(q);
      chips.appendChild(b);
    });

    function enableDrag(el, handle, storageKey, onClick) {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        el.style.left = saved.left + "px";
        el.style.top = saved.top + "px";
        el.style.right = "auto";
        el.style.bottom = "auto";
      }
      let startX = 0, startY = 0, originLeft = 0, originTop = 0, moved = false;
      handle.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button") && handle !== el) return;
        startX = event.clientX; startY = event.clientY;
        const rect = el.getBoundingClientRect();
        originLeft = rect.left; originTop = rect.top; moved = false;
        handle.setPointerCapture(event.pointerId);
        if (handle === head) head.classList.add("dragging");
      });
      handle.addEventListener("pointermove", (event) => {
        if (!handle.hasPointerCapture(event.pointerId)) return;
        const dx = event.clientX - startX, dy = event.clientY - startY;
        moved = moved || Math.abs(dx) > 5 || Math.abs(dy) > 5;
        const rect = el.getBoundingClientRect();
        const left = Math.max(8, Math.min(window.innerWidth - rect.width - 8, originLeft + dx));
        const top = Math.max(8, Math.min(window.innerHeight - rect.height - 8, originTop + dy));
        el.style.left = left + "px"; el.style.top = top + "px";
        el.style.right = "auto"; el.style.bottom = "auto";
      });
      handle.addEventListener("pointerup", (event) => {
        if (!handle.hasPointerCapture(event.pointerId)) return;
        handle.releasePointerCapture(event.pointerId);
        head.classList.remove("dragging");
        const rect = el.getBoundingClientRect();
        localStorage.setItem(storageKey, JSON.stringify({ left: rect.left, top: rect.top }));
        if (!moved && onClick) onClick();
      });
    }

    enableDrag(openBtn, openBtn, "srm_mozhi_button_position", () => panel.classList.toggle("open"));
    enableDrag(panel, head, "srm_mozhi_panel_position");
    document.getElementById("srm-ta-close").onclick = () => panel.classList.remove("open");

    langBtn.onclick = () => {
      tamilOn = !tamilOn;
      localStorage.setItem("srm_tamil_lang", tamilOn ? "ta" : "en");
      langBtn.textContent = tamilOn ? "தமிழ் ⇄ EN" : "EN ⇄ தமிழ்";
      walk(document.body);
    };

    async function ask(q) {
      panel.classList.add("open");
      addMsg(q, "user");
      input.value = "";
      
      const typing = addMsg("அதிகாரப்பூர்வ தகவலைச் சரிபார்க்கிறேன்...", "bot typing");
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: q }),
        });
        const data = await res.json();
        typing.remove();
        addMsg(data.answer || "தகவல் கிடைக்கவில்லை.", "bot", data.source || "srmtrichy.edu.in");
      } catch (e) {
        typing.remove();
        addMsg("தகவல் பெறுவதில் சிக்கல் ஏற்பட்டது. மீண்டும் முயலவும்.", "bot");
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (q) ask(q);
    });
  }

  function boot() {
    mountChat();
    walk(document.body);

    const obs = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) walk(n);
          if (n.nodeType === 3) translateNode(n);
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });

    ["click", "popstate"].forEach((ev) =>
      window.addEventListener(ev, () => setTimeout(() => walk(document.body), 300))
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(boot, 400));
  } else {
    setTimeout(boot, 400);
  }
})();
