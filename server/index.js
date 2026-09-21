import http from "http";
import fs from "fs";
import path from "path";
import dns from "dns";
import { fileURLToPath } from "url";
import { handleChat } from "./chat.js";
import { translateMany } from "./translate.js";

dns.setDefaultResultOrder("ipv4first");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const MIRROR = path.join(ROOT, "mirror");
const ORIGIN = "https://srmtrichy.edu.in";
const PORT = Number(process.env.PORT || 3000);
const ufetch = globalThis.fetch;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".JPG": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function mimeFor(file) {
  return MIME[path.extname(file)] || "application/octet-stream";
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function allowedCms(u) {
  try {
    return new URL(u).hostname === "srv1079154.hstgr.cloud";
  } catch {
    return false;
  }
}

function serveFile(res, file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return false;
  send(res, 200, { "content-type": mimeFor(file), "cache-control": "public, max-age=3600" }, fs.readFileSync(file));
  return true;
}

function safeMirrorPath(urlPath) {
  const relativePath = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const resolved = path.resolve(MIRROR, relativePath);
  return resolved === MIRROR || resolved.startsWith(MIRROR + path.sep) ? resolved : null;
}

const LOCAL_JS = new Set(["/srm-intercept.js", "/srm-tamil-widget.js", "/srm-tamil-widget.css", "/srm-tamil-dict.js"]);
const DATA_DIR = path.join(__dirname, "data");

function findLocalCms(u) {
  try {
    const parsed = new URL(u);
    const p = parsed.pathname.replace(/^\/api\//, "").replace(/^\//, "");
    const baseName = p.replace(/\//g, "__") + ".json";
    const directFile = path.join(DATA_DIR, baseName);
    if (fs.existsSync(directFile)) return fs.readFileSync(directFile);

    // Fallbacks
    if (p.includes("leadership")) {
      const f = path.join(DATA_DIR, "about__leadership__getall.json");
      if (fs.existsSync(f)) return fs.readFileSync(f);
    }
    if (p.includes("accreditation")) {
      const f = path.join(DATA_DIR, "about__accreditation__getall.json");
      if (fs.existsSync(f)) return fs.readFileSync(f);
    }
    if (p.includes("programmes")) {
      const f = path.join(DATA_DIR, "institution__programmes__getall.json");
      if (fs.existsSync(f)) return fs.readFileSync(f);
    }
    if (p.includes("institution")) {
      const f = path.join(DATA_DIR, "institution__getall.json");
      if (fs.existsSync(f)) return fs.readFileSync(f);
    }
    if (p.includes("slider")) {
      const f = path.join(DATA_DIR, "slider__sliders.json");
      if (fs.existsSync(f)) return fs.readFileSync(f);
    }
    if (p.includes("student")) {
      const f = path.join(DATA_DIR, "student__getAll.json");
      if (fs.existsSync(f)) return fs.readFileSync(f);
    }
    if (p.includes("infrastructure")) {
      const f = path.join(DATA_DIR, "institution__infrastructure__getall.json");
      if (fs.existsSync(f)) return fs.readFileSync(f);
    }
  } catch (e) {}
  return null;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (LOCAL_JS.has(url.pathname)) {
      const file = path.join(PUBLIC, url.pathname);
      return send(res, 200, { "content-type": mimeFor(file), "cache-control": "no-cache" }, fs.readFileSync(file));
    }

    if (url.pathname === "/__cms") {
      const u = url.searchParams.get("u") || "";
      if (!allowedCms(u)) return send(res, 400, { "content-type": "text/plain" }, "blocked");

      // Render bundled official snapshots first. This makes the mirror dependable
      // when the original CMS is unavailable or slow, without changing the UI.
      const localData = findLocalCms(u);
      if (localData) {
        // The original home-page leadership endpoint returns an array directly,
        // while its bundled snapshot retains the API envelope.
        if (new URL(u).pathname === "/api/about/leadership/getall" && new URL(u).searchParams.get("displayInHome") === "true") {
          const parsed = JSON.parse(localData.toString("utf8"));
          return send(res, 200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }, JSON.stringify(parsed.data || []));
        }
        return send(res, 200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }, localData);
      }

      // Endpoints without a bundled snapshot are fetched from the original CMS.
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const up = await ufetch(u, { headers: { "user-agent": "Mozilla/5.0" }, signal: controller.signal });
        clearTimeout(timeoutId);
        if (up.ok) {
          const buf = Buffer.from(await up.arrayBuffer());
          return send(res, up.status, { "content-type": up.headers.get("content-type") || "application/json" }, buf);
        }
      } catch (err) {
        // Upstream unavailable or timed out; continue to local snapshot
      }

      return send(res, 200, { "content-type": "application/json; charset=utf-8" }, JSON.stringify({ success: true, data: [] }));
    }

    if (url.pathname === "/api/translate" && req.method === "POST") {
      const body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
      const translations = await translateMany(body.texts || []);
      return send(res, 200, { "content-type": "application/json; charset=utf-8" }, JSON.stringify({ translations }));
    }

    if (url.pathname === "/api/chat" && req.method === "POST") {
      const body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
      const result = await handleChat(body.message || "");
      return send(res, 200, { "content-type": "application/json; charset=utf-8" }, JSON.stringify(result));
    }

    const localPath = safeMirrorPath(url.pathname);
    if (localPath && path.extname(url.pathname) && serveFile(res, localPath)) return;

    if (url.pathname.startsWith("/assets/") || path.extname(url.pathname)) {
      res.writeHead(302, { Location: ORIGIN + url.pathname });
      return res.end();
    }

    send(
      res,
      200,
      { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
      fs.readFileSync(path.join(MIRROR, "index.html"))
    );
  } catch (err) {
    console.error(err);
    send(res, 500, { "content-type": "text/plain; charset=utf-8" }, "Server error");
  }
});

server.listen(PORT, () => {
  console.log(`SRM Trichy Tamil clone → http://localhost:${PORT}`);
});
