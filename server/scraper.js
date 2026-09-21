import dns from "dns";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dns.setDefaultResultOrder("ipv4first");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");

const LIVE_CACHE = new Map();
const TTL = 15 * 60 * 1000;

export async function fetchWithTimeout(url, timeoutMs = 2000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) SRM-Tamil-Bot/1.0" },
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    return null;
  }
}

export function getLocalSnapshot(filename) {
  try {
    const fp = path.join(DATA_DIR, filename);
    if (fs.existsSync(fp)) {
      return JSON.parse(fs.readFileSync(fp, "utf8"));
    }
  } catch (e) {}
  return null;
}

/**
 * Scrapes a live web page or CMS endpoint, falling back to local snapshots.
 */
export async function scrapeSource(targetUrl, localSnapshotFile) {
  const cacheKey = targetUrl || localSnapshotFile;
  const cached = LIVE_CACHE.get(cacheKey);
  if (cached && Date.now() - cached.at < TTL) {
    return cached.data;
  }

  let scrapedText = [];

  // Try live scrape if URL provided
  if (targetUrl) {
    try {
      const res = await fetchWithTimeout(targetUrl, 2000);
      if (res && res.ok) {
        const text = await res.text();
        // Clean HTML tags
        const clean = text
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (clean.length > 50) {
          scrapedText.push(clean);
        }
      }
    } catch (e) {}
  }

  // Also read official structured dataset
  if (localSnapshotFile) {
    const snapshot = getLocalSnapshot(localSnapshotFile);
    if (snapshot && snapshot.data) {
      const items = Array.isArray(snapshot.data) ? snapshot.data : [snapshot.data];
      items.forEach((it) => {
        const parts = [];
        if (it.name) parts.push(it.name);
        if (it.title) parts.push(it.title);
        if (it.degree) parts.push(it.degree + " (" + (it.duration || "") + ")");
        if (it.eligibility) parts.push("தகுதி / Eligibility: " + it.eligibility);
        if (it.annualFee) parts.push("கட்டணம் / Annual Fee: " + it.annualFee);
        if (it.description) parts.push(it.description);
        if (it.about) parts.push(it.about);
        if (it.designation) parts.push(it.designation);
        if (it.message) parts.push(it.message);
        if (parts.length) scrapedText.push(parts.join(" — "));
      });
    }
  }

  const result = scrapedText.join("\n\n");
  LIVE_CACHE.set(cacheKey, { at: Date.now(), data: result });
  return result;
}
