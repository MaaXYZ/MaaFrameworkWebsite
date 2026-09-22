// Run after npm run build; optionally pass an existing preview URL as the first argument.
// Requires Node 22+ and Chrome/Edge (set BROWSER_PATH for a custom installation).
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve, sep } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

let base = process.argv[2]?.replace(/\/$/, "");
const browserPath = [process.env.BROWSER_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find(path => path && existsSync(path));
assert(browserPath, "Set BROWSER_PATH to a Chrome or Edge executable");
let server;
if (!base) {
  const root = resolve("src/.vitepress/dist");
  assert(existsSync(join(root, "index.html")), "Run npm run build first");
  const mime = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2" };
  server = createServer(async (request, response) => {
    try {
      let path = resolve(root, "." + decodeURIComponent(new URL(request.url, "http://localhost").pathname));
      assert(path === root || path.startsWith(root + sep));
      // Documentation routes contain dots (e.g. 3.1-PipelineProtocol).
      if (!mime[extname(path)]) path = join(path, "index.html");
      response.setHeader("Content-Type", mime[extname(path)] || "application/octet-stream");
      response.end(await readFile(path));
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
}
const profile = await mkdtemp(join(tmpdir(), "maafw-regression-"));
const browser = spawn(browserPath, ["--headless=new", "--remote-debugging-port=0",
  `--user-data-dir=${profile}`, "--no-first-run", "--no-default-browser-check", "--window-size=1440,900", "about:blank",
], { stdio: "ignore", windowsHide: true });
let ws;
let send;
const errors = [];
const waitFor = async (check, message, timeout = 15000) => {
  const end = Date.now() + timeout;
  while (Date.now() < end) { if (await check()) return; await delay(100); }
  throw new Error(`Timed out: ${message}`);
};
try {
  await waitFor(() => existsSync(join(profile, "DevToolsActivePort")), "browser startup");
  const port = (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  ws = new WebSocket(targets.find(t => t.type === "page").webSocketDebuggerUrl);
  await new Promise(resolve => ws.addEventListener("open", resolve, { once: true }));
  let sequence = 0;
  const pending = new Map();
  ws.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const entry = pending.get(message.id);
      pending.delete(message.id);
      message.error ? entry.reject(message.error) : entry.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") {
      errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    } else if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      errors.push(message.params.args.map(arg => arg.value || arg.description).join(" "));
    }
  });
  send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    assert(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Performance.enable");
  await send("Page.addScriptToEvaluateOnNewDocument", { source: `(() => {
    const state = window.__homepageCheck = { draws: 0, detachedDraws: 0, mouseListeners: new Set() };
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function(...args) {
      state.draws++;
      if (!this.canvas.isConnected) state.detachedDraws++;
      return clear.apply(this, args);
    };
    // Store only weak IDs: instrumentation must not retain unmounted components.
    const ids = new WeakMap(); let nextId = 0;
    const add = window.addEventListener, remove = window.removeEventListener;
    window.addEventListener = function(type, fn, options) {
      if (type === 'mousemove') { if (!ids.has(fn)) ids.set(fn, ++nextId); state.mouseListeners.add(ids.get(fn)); }
      return add.call(this, type, fn, options);
    };
    window.removeEventListener = function(type, fn, options) {
      if (type === 'mousemove') state.mouseListeners.delete(ids.get(fn));
      return remove.call(this, type, fn, options);
    };
  })()` });
  const navigate = async path => {
    await send("Page.navigate", { url: base + path });
    await waitFor(() => evaluate("document.readyState === 'complete'"), "page load");
  };
  const snapshot = () => evaluate(`({ draws: __homepageCheck.draws, detachedDraws: __homepageCheck.detachedDraws,
    mouseListeners: __homepageCheck.mouseListeners.size,
    runningAnimations: document.getAnimations().filter(a => a.playState === 'running').length })`);
  const screenshot = async name => {
    if (!process.env.SCREENSHOT_DIR) return;
    const { data } = await send("Page.captureScreenshot", { format: "png" });
    await writeFile(join(process.env.SCREENSHOT_DIR, `${name}.png`), Buffer.from(data, "base64"));
  };
  for (const path of ["/", "/en/"]) {
    const html = await (await fetch(base + path)).text();
    assert.match(html, /<h1[^>]*class="hero-title"/);
    assert.match(html, /class="shiki/);
    assert(!html.includes('src=""'), "SSR must not emit empty image requests");
  }
  await navigate("/");
  await waitFor(() => evaluate("document.querySelector('.homepage-container')?.dataset.motion === 'on'"), "homepage hydration");
  await delay(1200);
  const initial = await snapshot();
  assert.equal(initial.mouseListeners, 1);
  assert.equal(await evaluate("document.querySelector('.carousel-track').style.getPropertyValue('--carousel-distance')"), "", "below-fold carousel should not hydrate immediately");
  const resources = await evaluate("performance.getEntriesByType('resource').map(r => r.name)");
  assert(!resources.some(url => /(?:wasm[.-]|mermaid[.-]|Diagram-)/i.test(url)), "homepage fetched code-highlighter or diagram engines: " + resources.filter(url => /(?:wasm[.-]|mermaid[.-]|Diagram-)/i.test(url)).join(", "));
  const metrics = async () => Object.fromEntries((await send("Performance.getMetrics")).metrics.map(m => [m.name, m.value]));
  const before = await metrics();
  await delay(5000);
  const after = await metrics();
  console.log("idle5s", JSON.stringify({ taskMs: (after.TaskDuration - before.TaskDuration) * 1000,
    layoutCount: after.LayoutCount - before.LayoutCount, ...await snapshot() }));
  await screenshot("desktop-light");

  await evaluate("document.querySelector('.theme-toggle').click()");
  await waitFor(() => evaluate("document.documentElement.classList.contains('dark')"), "dark theme");
  await delay(300);
  await screenshot("desktop-dark");
  await evaluate("document.querySelector('.theme-toggle').click()");
  await evaluate("document.querySelector('.integration-comparison').scrollIntoView()");
  await delay(500);
  for (let tab = 0; tab < 4; tab++) {
    await evaluate(`document.querySelectorAll('.tab-button')[${tab}].click()`);
    await waitFor(() => evaluate(`document.querySelectorAll('.tab-button')[${tab}].classList.contains('active')`), "code tab");
  }
  const rectReads = await evaluate(`(async () => {
    const card = [...document.querySelectorAll('.code-example')].find(el => el.getBoundingClientRect().height > 0);
    const parent = card.parentElement;
    const rect = parent.getBoundingClientRect();
    const original = parent.getBoundingClientRect; let reads = 0;
    parent.getBoundingClientRect = function() { reads++; return original.call(this); };
    card.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse' }));
    for(let i = 0; i < 100; i++) card.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', clientX: rect.left + 30 + i, clientY: rect.top + 50 }));
    await new Promise(requestAnimationFrame);
    const moved = !!card.style.transform;
    card.dispatchEvent(new PointerEvent('pointerleave'));
    parent.getBoundingClientRect = original;
    return { reads, moved, reset: !card.style.transform };
  })()`);
  assert(rectReads.reads <= 2 && rectReads.moved && rectReads.reset, JSON.stringify(rectReads));
  await evaluate("document.querySelector('.community-projects').scrollIntoView()");
  await waitFor(() => evaluate("document.querySelector('.community-projects').dataset.motion === 'on'"), "carousel visibility");
  assert.notEqual(await evaluate("document.querySelector('.carousel-track').style.getPropertyValue('--carousel-distance')"), "");
  const transform = await evaluate("getComputedStyle(document.querySelector('.carousel-track')).transform");
  await delay(500);
  assert.notEqual(await evaluate("getComputedStyle(document.querySelector('.carousel-track')).transform"), transform);
  await screenshot("desktop-community");
  await evaluate("window.scrollTo(0,0)");
  await waitFor(() => evaluate("document.querySelector('.community-projects').dataset.motion === 'off'"), "offscreen pause");

  for (let cycle = 0; cycle < 5; cycle++) {
    await evaluate(`document.querySelector('.desktop-nav a[href="/community/projects"]').click()`);
    await waitFor(() => evaluate("location.pathname.includes('/community/projects') && !document.querySelector('.homepage-container')"), "leave homepage");
    await delay(200);
    assert.equal((await snapshot()).mouseListeners, 0, "mousemove listener leaked after unmount");
    await evaluate(`document.querySelector('a.title[href="/"]').click()`);
    await waitFor(() => evaluate("!!document.querySelector('.homepage-container')"), "return home");
    await delay(250);
    assert.equal((await snapshot()).mouseListeners, initial.mouseListeners);
  }
  const cycled = await snapshot();
  assert.equal(cycled.detachedDraws, 0, "unmounted canvas is still drawing");
  console.log("after5roundTrips", JSON.stringify(cycled));

  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await waitFor(() => evaluate("document.querySelector('.homepage-container').dataset.motion === 'off'"), "reduced motion");
  await delay(200);
  const reduced = await snapshot();
  await delay(500);
  assert.equal((await snapshot()).draws, reduced.draws, "particles run with reduced motion");
  assert.equal((await snapshot()).runningAnimations, 0);
  await send("Emulation.setEmulatedMedia", { features: [] });
  await waitFor(() => evaluate("document.querySelector('.homepage-container').dataset.motion === 'on'"), "resume motion");
  // Exercise the application's visibility handler without relying on headless
  // Chromium's background-tab scheduling behavior.
  await evaluate("Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange'))");
  await delay(200);
  const hidden = await snapshot();
  await delay(500);
  assert.equal((await snapshot()).draws, hidden.draws, "hidden-page particles run");
  assert.equal((await snapshot()).runningAnimations, 0);
  await evaluate("delete document.hidden; document.dispatchEvent(new Event('visibilitychange'))");
  await send("Emulation.setHardwareConcurrencyOverride", { hardwareConcurrency: 2 });
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true });
  await navigate("/en/");
  await delay(700);
  assert.equal(await evaluate("document.querySelector('.homepage-container').dataset.motion"), "off");
  assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true, "mobile horizontal overflow");
  await screenshot("mobile-en");
  await evaluate("document.querySelector('.hamburger-btn').click()");
  assert.equal(await evaluate("document.body.style.overflow"), "hidden");
  await evaluate(`document.querySelector('.mobile-nav-link[href="/en/community/projects"]').click()`);
  await waitFor(() => evaluate("!document.querySelector('.homepage-container')"), "mobile navigation");
  assert.notEqual(await evaluate("document.body.style.overflow"), "hidden");
  assert.equal((await snapshot()).mouseListeners, 0);
  assert.equal((await snapshot()).detachedDraws, 0);
  await navigate("/docs/3.1-PipelineProtocol");
  await waitFor(() => evaluate("!!document.querySelector('.mermaid svg')"), "lazy Mermaid document rendering", 30000);
  assert(await evaluate("performance.getEntriesByType('resource').some(r => /Mermaid\\./.test(r.name))"));
  await navigate("/");
  await delay(500);
  await evaluate("document.querySelector('.theme-toggle').click()");
  await navigate("/");
  await delay(500);
  assert(await evaluate("document.documentElement.classList.contains('dark') && !document.querySelector('.homepage-container').classList.contains('light-mode')"), "persisted dark theme");
  assert.deepEqual(errors, [], "browser errors");
  console.log("PASS: SSR, deferred hydration, lazy engines, pointer batching, tabs, themes, carousel, lifecycle, reduced motion, visibility, mobile navigation and Mermaid");
} finally {
  if (send && ws?.readyState === WebSocket.OPEN) await send("Browser.close").catch(() => {});
  ws?.close();
  await delay(300);
  if (browser.exitCode === null) browser.kill();
  // This is the unique temporary profile created by this script, never a user profile.
  assert.equal(dirname(resolve(profile)), resolve(tmpdir()));
  assert(basename(profile).startsWith("maafw-regression-"));
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  server?.close();
}
