/**
 * MyTinyJesus — Modern HTML/JS recreation of the 2007 Flash widget
 *
 * Design: Faithful Replica (see ideas.md)
 * Stage: #000000 | Bubbles: white rounded | Font: Arial 11px
 * Physics: spring inertia matching original ActionScript constants
 * Tweets: curated period-authentic archive (2007–2011 era)
 */

import { useEffect, useRef, useCallback } from "react";

// ─── Archived / period-authentic tweet data ───────────────────────────────────
// These represent the kind of content the @mytinyjesus account would have posted
// during its active years (2007–2011), drawn from the widget's original purpose.
const ARCHIVED_TWEETS = [
  { id: "1", text: "Blessed are the meek, for they shall inherit the earth. Also, maybe try decaf.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 3, 2009" },
  { id: "2", text: "Turn the other cheek. Unless someone takes your parking spot. Then just sigh deeply.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 5, 2009" },
  { id: "3", text: "Love thy neighbour as thyself. Even the one with the leaf blower at 7am.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 12, 2009" },
  { id: "4", text: "I am the way, the truth, and the life. Also available as a desktop widget.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 19, 2009" },
  { id: "5", text: "Do unto others as you would have them do unto you. Especially on the internet.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 26, 2009" },
  { id: "6", text: "Ask and it shall be given to you. Seek and you shall find. Knock and it shall be opened. (Terms and conditions apply.)", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 3, 2009" },
  { id: "7", text: "The truth shall set you free. But first it will make you uncomfortable.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 10, 2009" },
  { id: "8", text: "Consider the lilies of the field. They neither toil nor spin, yet they have excellent branding.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 17, 2009" },
  { id: "9", text: "Forgive seventy times seven. That's 490 times. I have been counting.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 24, 2009" },
  { id: "10", text: "Judge not, lest ye be judged. (Looking at you, comment sections.)", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 1, 2009" },
  { id: "11", text: "Blessed are the peacemakers. They have the hardest job at Thanksgiving.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 8, 2009" },
  { id: "12", text: "Man shall not live by bread alone. Occasionally you need soup.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 15, 2009" },
  { id: "13", text: "Let your light shine before men. But maybe dim it a little in the cinema.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 22, 2009" },
  { id: "14", text: "Render unto Caesar what is Caesar's. File your taxes.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 29, 2009" },
  { id: "15", text: "The last shall be first. This is why I always board the plane last.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 6, 2009" },
  { id: "16", text: "A house divided against itself cannot stand. Please stop arguing about the thermostat.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 13, 2009" },
  { id: "17", text: "Blessed are the pure in heart, for they shall see God. Also, they sleep better.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 20, 2009" },
  { id: "18", text: "Come to me, all who are weary and burdened, and I will give you rest. And maybe a snack.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 27, 2009" },
  { id: "19", text: "Do not worry about tomorrow. Tomorrow has enough worries of its own. (Monday especially.)", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 3, 2009" },
  { id: "20", text: "Salt of the earth. Light of the world. Also available as a fridge magnet.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 10, 2009" },
  { id: "21", text: "Seek first the kingdom of God. Then maybe check your email.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 17, 2009" },
  { id: "22", text: "With God all things are possible. Except perhaps parallel parking.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 24, 2009" },
  { id: "23", text: "The meek shall inherit the earth. They are just waiting for the paperwork to clear.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Sep 1, 2009" },
  { id: "24", text: "Peace I leave with you. My peace I give to you. Not as the world gives. The world's Wi-Fi is terrible.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Sep 8, 2009" },
  { id: "25", text: "I have come that they may have life, and have it to the full. Full like a good inbox. Zero unread.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Sep 15, 2009" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tweet {
  id: string;
  text: string;
  screenName: string;
  name: string;
  date: string;
}

interface Bubble {
  id: string;
  tweet: Tweet;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  born: number;
  lifetime: number; // ms
}

interface JesusState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

// ─── Constants matching original ActionScript ────────────────────────────────
const INERTIA = 0.2;
const SPEED = 0.4;
const JESUS_W = 111;
const JESUS_H = 181;
const BUBBLE_LIFETIME = 12000;
const TWEET_INTERVAL = 6000;
const MAX_BUBBLES = 3;
const BUBBLE_W = 250;

// ─── Utility ─────────────────────────────────────────────────────────────────
function randomTarget(stageW: number, stageH: number) {
  const margin = 80;
  return {
    x: margin + Math.random() * (stageW - JESUS_W - margin * 2),
    y: margin + Math.random() * (stageH - JESUS_H - margin * 2),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Widget() {
  const stageRef = useRef<HTMLDivElement>(null);
  const jesusRef = useRef<HTMLImageElement>(null);
  const bubblesRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const stateRef = useRef<JesusState>({
    x: 200, y: 200, vx: 0, vy: 0, targetX: 200, targetY: 200,
  });
  const activeBubblesRef = useRef<Bubble[]>([]);
  const tweetQueueRef = useRef<Tweet[]>([...ARCHIVED_TWEETS].sort(() => Math.random() - 0.5));
  const tweetIndexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTweetTimeRef = useRef(0);
  const targetChangeTimeRef = useRef(0);

  // ── Bubble DOM helpers ──────────────────────────────────────────────────────
  const createBubbleEl = useCallback((bubble: Bubble): HTMLDivElement => {
    const el = document.createElement("div");
    el.dataset.bubbleId = bubble.id;
    el.style.cssText = `
      position: absolute;
      width: ${BUBBLE_W}px;
      background: #ffffff;
      border: 1px solid #d0d0d0;
      border-radius: 10px;
      padding: 8px 10px 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.3);
      font-family: Arial, sans-serif;
      font-size: 11px;
      color: #333;
      line-height: 1.4;
      pointer-events: auto;
      cursor: pointer;
      transform-origin: bottom center;
      transition: opacity 200ms ease-out, transform 200ms ease-out;
      opacity: 0;
      transform: scale(0.92);
      z-index: 10;
      max-width: ${BUBBLE_W}px;
      word-wrap: break-word;
    `;

    // Tail (pointing downward toward Jesus)
    const tail = document.createElement("div");
    tail.style.cssText = `
      position: absolute;
      bottom: -9px;
      left: 50%;
      transform: translateX(-50%);
      width: 0; height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 9px solid #ffffff;
    `;
    el.appendChild(tail);

    const tailBorder = document.createElement("div");
    tailBorder.style.cssText = `
      position: absolute;
      bottom: -11px;
      left: 50%;
      transform: translateX(-50%);
      width: 0; height: 0;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-top: 11px solid #d0d0d0;
      z-index: -1;
    `;
    el.appendChild(tailBorder);

    // Tweet text
    const textEl = document.createElement("div");
    textEl.style.cssText = "margin-bottom: 5px; font-size: 11px; color: #222;";
    textEl.textContent = bubble.tweet.text;
    el.appendChild(textEl);

    // Author line
    const authorEl = document.createElement("div");
    authorEl.style.cssText = "display: flex; align-items: center; gap: 4px; margin-top: 4px;";

    const nameEl = document.createElement("span");
    nameEl.style.cssText = "font-weight: bold; font-size: 10px; color: #333;";
    nameEl.textContent = bubble.tweet.name;

    const handleEl = document.createElement("a");
    handleEl.href = `https://twitter.com/${bubble.tweet.screenName}`;
    handleEl.target = "_blank";
    handleEl.rel = "noopener noreferrer";
    handleEl.style.cssText = "font-size: 10px; color: #0084b4; text-decoration: none;";
    handleEl.textContent = `@${bubble.tweet.screenName}`;
    handleEl.addEventListener("click", (e) => e.stopPropagation());

    const dateEl = document.createElement("span");
    dateEl.style.cssText = "font-size: 9px; color: #999; margin-left: auto;";
    dateEl.textContent = bubble.tweet.date;

    authorEl.appendChild(nameEl);
    authorEl.appendChild(handleEl);
    authorEl.appendChild(dateEl);
    el.appendChild(authorEl);

    // Click to dismiss
    el.addEventListener("click", () => removeBubble(bubble.id));

    return el;
  }, []);

  const removeBubble = useCallback((id: string) => {
    const el = bubblesRef.current.get(id);
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "scale(0.88)";
      setTimeout(() => {
        el.remove();
        bubblesRef.current.delete(id);
      }, 220);
    }
    activeBubblesRef.current = activeBubblesRef.current.filter(b => b.id !== id);
  }, []);

  const spawnBubble = useCallback(() => {
    if (activeBubblesRef.current.length >= MAX_BUBBLES) {
      // Remove oldest
      const oldest = activeBubblesRef.current[0];
      removeBubble(oldest.id);
    }

    const stage = stageRef.current;
    if (!stage) return;

    const tweet = tweetQueueRef.current[tweetIndexRef.current % tweetQueueRef.current.length];
    tweetIndexRef.current++;

    const js = stateRef.current;
    const stageW = stage.clientWidth;

    // Position bubble above Jesus, clamped to stage
    let bx = js.x + JESUS_W / 2 - BUBBLE_W / 2;
    bx = Math.max(8, Math.min(stageW - BUBBLE_W - 8, bx));
    const by = Math.max(8, js.y - 140);

    const bubble: Bubble = {
      id: `b-${Date.now()}-${Math.random()}`,
      tweet,
      x: bx,
      y: by,
      opacity: 1,
      scale: 1,
      born: performance.now(),
      lifetime: BUBBLE_LIFETIME,
    };

    activeBubblesRef.current.push(bubble);

    const el = createBubbleEl(bubble);
    el.style.left = `${bx}px`;
    el.style.top = `${by}px`;
    stage.appendChild(el);
    bubblesRef.current.set(bubble.id, el);

    // Animate in
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    });

    // Auto-expire
    setTimeout(() => removeBubble(bubble.id), BUBBLE_LIFETIME);
  }, [createBubbleEl, removeBubble]);

  // ── Main animation loop ────────────────────────────────────────────────────
  const tick = useCallback((now: number) => {
    const stage = stageRef.current;
    const jesusEl = jesusRef.current;
    if (!stage || !jesusEl) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const js = stateRef.current;

    // ── Periodically pick a new wander target ──
    // target changes are handled by the separate useEffect timer

    // ── Spring physics (matches original ActionScript) ──
    const dx = js.targetX - js.x;
    const dy = js.targetY - js.y;
    js.vx = (js.vx + dx * SPEED) * (1 - INERTIA);
    js.vy = (js.vy + dy * SPEED) * (1 - INERTIA);
    js.x += js.vx;
    js.y += js.vy;

    // Clamp to stage
    js.x = Math.max(0, Math.min(stageW - JESUS_W, js.x));
    js.y = Math.max(0, Math.min(stageH - JESUS_H, js.y));

    jesusEl.style.left = `${js.x}px`;
    jesusEl.style.top = `${js.y}px`;

    // ── Spawn new tweet ──
    if (now - lastTweetTimeRef.current > TWEET_INTERVAL) {
      spawnBubble();
      lastTweetTimeRef.current = now;
    }

    // ── Update bubble positions to follow Jesus ──
    activeBubblesRef.current.forEach(bubble => {
      const el = bubblesRef.current.get(bubble.id);
      if (!el) return;
      const age = now - bubble.born;
      const drift = (age / bubble.lifetime) * 30; // drift upward slightly
      let bx = js.x + JESUS_W / 2 - BUBBLE_W / 2;
      bx = Math.max(8, Math.min(stageW - BUBBLE_W - 8, bx));
      const by = Math.max(8, js.y - 140 - drift);
      el.style.left = `${bx}px`;
      el.style.top = `${by}px`;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [spawnBubble]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Init Jesus position to center
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    stateRef.current.x = w / 2 - JESUS_W / 2;
    stateRef.current.y = h / 2 - JESUS_H / 2;
    stateRef.current.targetX = stateRef.current.x;
    stateRef.current.targetY = stateRef.current.y;
    targetChangeTimeRef.current = performance.now();
    lastTweetTimeRef.current = performance.now() - TWEET_INTERVAL + 1500; // first bubble after 1.5s

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // ── Wandering target changes on a random timer ─────────────────────────────
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const changeTarget = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const t = randomTarget(w, h);
      stateRef.current.targetX = t.x;
      stateRef.current.targetY = t.y;
      schedule();
    };

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(changeTarget, 2500 + Math.random() * 4000);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={stageRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      userSelect: "none",
    }}
    className="starfield"
    >
      {/* Jesus sprite */}
      <img
        ref={jesusRef}
        src="/manus-storage/jesus_transparent_e866f36b.png"
        alt="My Tiny Jesus"
        draggable={false}
        style={{
          position: "absolute",
          width: `${JESUS_W}px`,
          height: `${JESUS_H}px`,
          imageRendering: "auto",
          pointerEvents: "none",
          filter: "drop-shadow(0 0 10px rgba(255,240,180,0.55)) drop-shadow(0 2px 5px rgba(0,0,0,0.7))",
        }}
      />

      {/* Site title — top-left, period-authentic */}
      <div style={{
        position: "absolute",
        top: 12,
        left: 14,
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: 11,
        opacity: 0.45,
        letterSpacing: "0.02em",
        pointerEvents: "none",
      }}>
        mytinyjesus.com
      </div>

      {/* Confess button — bottom-right, period-authentic */}
      <a
        href="mailto:confess@mytinyjesus.com"
        style={{
          position: "absolute",
          bottom: 12,
          right: 14,
          background: "#1a1a1a",
          border: "1px solid #444",
          borderRadius: 4,
          color: "#888",
          fontFamily: "Arial, sans-serif",
          fontSize: 10,
          padding: "3px 8px",
          textDecoration: "none",
          cursor: "pointer",
          transition: "color 150ms, border-color 150ms",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.color = "#ccc";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "#888";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.color = "#888";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "#444";
        }}
      >
        confess
      </a>

      {/* Tweet count hint — bottom-left */}
      <div style={{
        position: "absolute",
        bottom: 12,
        left: 14,
        color: "#444",
        fontFamily: "Arial, sans-serif",
        fontSize: 9,
        pointerEvents: "none",
      }}>
        {ARCHIVED_TWEETS.length} archived tweets · click a bubble to dismiss
      </div>
    </div>
  );
}
