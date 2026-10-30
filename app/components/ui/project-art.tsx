"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Animated cover art for projects that have no live embed.
 * All art is drawn in a 520x270 viewBox and scales to fill the device screen.
 * MotionConfig(reducedMotion="user") disables the movement for users who prefer less motion.
 */

const W = 520;
const H = 270;

function Canvas({ children, id }: { children: ReactNode; id: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={`${id} illustration`}
      >
        {children}
      </svg>
    </MotionConfig>
  );
}

/* ───────────────────────── Lofty: AI agent data flow ───────────────────────── */

const FLOW = [
  { label: "Inquiry", sub: "visitor chat", color: "#2fb8aa" },
  { label: "Gemini", sub: "conversation", color: "#8b6fe0" },
  { label: "Supabase", sub: "lead storage", color: "#10b981" },
  { label: "Resend", sub: "follow-up email", color: "#f0745a" },
] as const;

function LoftyArt() {
  const nodeW = 92;
  const gap = (W - 60 - nodeW * FLOW.length) / (FLOW.length - 1);
  const y = 112;
  return (
    <Canvas id="Lofty data flow">
      <defs>
        <linearGradient id="loftyBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f0ff" />
          <stop offset="1" stopColor="#e6defc" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#loftyBg)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={0} x2={W} y1={30 * i + 15} y2={30 * i + 15} stroke="#4b46a8" strokeOpacity="0.06" />
      ))}

      <text x={30} y={44} fontSize="13" fontWeight="700" fill="#4b46a8" letterSpacing="2">
        SERVERLESS AI AGENT
      </text>
      <text x={30} y={62} fontSize="11" fill="#4b46a8" fillOpacity="0.75">
        Lead in → reply → store → follow up
      </text>

      {FLOW.map((node, i) => {
        const x = 30 + i * (nodeW + gap);
        const next = x + nodeW;
        return (
          <g key={node.label}>
            {i < FLOW.length - 1 ? (
              <>
                <line
                  x1={next}
                  x2={next + gap}
                  y1={y + 30}
                  y2={y + 30}
                  stroke="#4b46a8"
                  strokeOpacity="0.35"
                  strokeDasharray="4 5"
                />
                <motion.circle
                  r="4.5"
                  cy={y + 30}
                  fill={node.color}
                  initial={{ cx: next, opacity: 0 }}
                  animate={{ cx: [next, next + gap], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
                />
              </>
            ) : null}
            <motion.g
              initial={{ y: 0 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              <rect x={x} y={y} width={nodeW} height={60} rx={14} fill="#fff" stroke={node.color} strokeOpacity="0.45" />
              <circle cx={x + 18} cy={y + 20} r={6} fill={node.color} />
              <text x={x + 30} y={y + 24} fontSize="12" fontWeight="700" fill="#1a1033">
                {node.label}
              </text>
              <text x={x + 12} y={y + 44} fontSize="9.5" fill="#666f8a">
                {node.sub}
              </text>
            </motion.g>
          </g>
        );
      })}

      <g>
        <rect x={30} y={212} width={190} height={30} rx={15} fill="#fff" stroke="#10b981" strokeOpacity="0.4" />
        <circle cx={48} cy={227} r={5} fill="#10b981" />
        <text x={62} y={231} fontSize="11" fontWeight="600" fill="#047857">
          Faster first response
        </text>
      </g>
    </Canvas>
  );
}

/* ───────────────────────── Firewatch: wildfire risk heatmap ───────────────────────── */

const COLS = 12;
const ROWS = 5;

function riskAt(col: number, row: number) {
  const v = Math.sin(col * 0.75 + 0.4) + Math.cos(row * 1.15) + (col - ROWS) / 7 + Math.sin((col + row) * 0.9) * 0.5;
  return Math.min(1, Math.max(0, (v + 1.2) / 3.4));
}

function riskColor(r: number) {
  if (r > 0.78) return "#f9a8c9";
  if (r > 0.6) return "#f97316";
  if (r > 0.42) return "#f59e0b";
  if (r > 0.25) return "#2dd4bf";
  return "#1e4b5a";
}

function FirewatchArt() {
  const cell = 34;
  const gap = 6;
  const ox = (W - (COLS * (cell + gap) - gap)) / 2;
  const oy = 40;
  return (
    <Canvas id="Firewatch risk heatmap">
      <defs>
        <linearGradient id="fwBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1530" />
          <stop offset="1" stopColor="#2a1a2e" />
        </linearGradient>
        <linearGradient id="fwLegend" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2dd4bf" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#f9a8c9" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#fwBg)" />
      <text x={ox} y={26} fontSize="12" fontWeight="700" fill="#fde68a" letterSpacing="2">
        FIRE DANGER · BEFORE IGNITION
      </text>

      {Array.from({ length: ROWS }).flatMap((_, row) =>
        Array.from({ length: COLS }).map((__, col) => {
          const r = riskAt(col, row);
          const hot = r > 0.6;
          return (
            <motion.rect
              key={`${col}-${row}`}
              x={ox + col * (cell + gap)}
              y={oy + row * (cell + gap)}
              width={cell}
              height={cell}
              rx={8}
              fill={riskColor(r)}
              initial={{ opacity: hot ? 0.75 : 0.5 }}
              animate={hot ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.55 + r * 0.3 }}
              transition={{ duration: 2.2 + (col % 3) * 0.4, repeat: Infinity, delay: (col + row) * 0.12 }}
            />
          );
        }),
      )}

      <g transform={`translate(${ox} ${oy + ROWS * (cell + gap) + 12})`}>
        <rect width={150} height={8} rx={4} fill="url(#fwLegend)" />
        <text y={24} fontSize="10" fill="#d9cef7">
          low
        </text>
        <text x={150} y={24} fontSize="10" fill="#d9cef7" textAnchor="end">
          extreme
        </text>
      </g>
      <text x={W - ox} y={oy + ROWS * (cell + gap) + 24} fontSize="10.5" fill="#d9cef7" textAnchor="end">
        AB · BC · SK
      </text>
    </Canvas>
  );
}

/* ───────────────────────── LockIn AI: focus timer + garden ───────────────────────── */

function Plant({ x, delay, hue }: { x: number; delay: number; hue: string }) {
  return (
    <motion.g
      style={{ transformOrigin: "50% 100%", transformBox: "fill-box" }}
      initial={{ scale: 0.2, opacity: 0.4 }}
      animate={{ scale: [0.2, 1, 1, 0.2], opacity: [0.4, 1, 1, 0.4] }}
      transition={{ duration: 7, repeat: Infinity, delay, times: [0, 0.35, 0.85, 1], ease: "easeOut" }}
    >
      <path d={`M${x} 236 C ${x} 220, ${x} 212, ${x} 200`} stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx={x - 9} cy={206} rx={10} ry={5.5} transform={`rotate(-30 ${x - 9} 206)`} fill={hue} />
      <ellipse cx={x + 9} cy={200} rx={10} ry={5.5} transform={`rotate(30 ${x + 9} 200)`} fill={hue} />
      <circle cx={x} cy={196} r={5} fill="#f9a8c9" />
    </motion.g>
  );
}

function LockInArt() {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <Canvas id="LockIn AI focus timer">
      <defs>
        <linearGradient id="liBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecfdf5" />
          <stop offset="1" stopColor="#a7f3d0" />
        </linearGradient>
        <linearGradient id="liRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d9488" />
          <stop offset="1" stopColor="#4b46a8" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#liBg)" />
      <ellipse cx={W / 2} cy={250} rx={250} ry={30} fill="#86efac" fillOpacity="0.6" />

      <g transform={`translate(${W / 2} 96)`}>
        <circle r={r} fill="#fff" fillOpacity="0.7" />
        <circle r={r} fill="none" stroke="#0d9488" strokeOpacity="0.18" strokeWidth="9" />
        <motion.circle
          r={r}
          fill="none"
          stroke="url(#liRing)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          transform="rotate(-90)"
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: [c, 0, 0, c] }}
          transition={{ duration: 7, repeat: Infinity, times: [0, 0.6, 0.9, 1], ease: "easeInOut" }}
        />
        <text y={4} fontSize="22" fontWeight="700" fill="#1a1033" textAnchor="middle">
          25:00
        </text>
        <text y={22} fontSize="9" fill="#0f766e" textAnchor="middle" letterSpacing="2">
          FOCUS SESSION
        </text>
      </g>

      {[130, 190, 250, 310, 370].map((x, i) => (
        <Plant key={x} x={x + 20} delay={i * 0.55} hue={i % 2 ? "#22c55e" : "#4ade80"} />
      ))}
    </Canvas>
  );
}

/* ───────────────────────── Pengloo Party: cozy penguin town ───────────────────────── */

function Penguin({ x, y, scale = 1, delay = 0, flip = false }: { x: number; y: number; scale?: number; delay?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
    <motion.g
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <ellipse cx={0} cy={44} rx={20} ry={5} fill="#2c2370" fillOpacity="0.12" />
      <ellipse cx={-9} cy={40} rx={8} ry={3.5} fill="#fb923c" />
      <ellipse cx={9} cy={40} rx={8} ry={3.5} fill="#fb923c" />
      <ellipse cx={0} cy={16} rx={24} ry={30} fill="#2c2370" />
      <ellipse cx={0} cy={22} rx={15} ry={22} fill="#f8fafc" />
      <ellipse cx={-23} cy={20} rx={5} ry={14} fill="#2c2370" transform="rotate(15 -23 20)" />
      <ellipse cx={23} cy={20} rx={5} ry={14} fill="#2c2370" transform="rotate(-15 23 20)" />
      <circle cx={-7} cy={-3} r={3.2} fill="#fff" />
      <circle cx={7} cy={-3} r={3.2} fill="#fff" />
      <circle cx={-6.5} cy={-2.5} r={1.5} fill="#1a1033" />
      <circle cx={7.5} cy={-2.5} r={1.5} fill="#1a1033" />
      <path d="M-5 4 L5 4 L0 11 Z" fill="#fb923c" />
      <ellipse cx={-13} cy={6} rx={3.5} ry={2} fill="#ffe4f0" fillOpacity="0.7" />
      <ellipse cx={13} cy={6} rx={3.5} ry={2} fill="#ffe4f0" fillOpacity="0.7" />
    </motion.g>
    </g>
  );
}

const SNOW = Array.from({ length: 16 }).map((_, i) => ({
  x: 20 + ((i * 97) % 480),
  r: 1.6 + (i % 3) * 0.7,
  d: 5 + (i % 5),
  delay: (i * 0.45) % 5,
}));

function PenglooArt() {
  return (
    <Canvas id="Pengloo Party penguin town">
      <defs>
        <linearGradient id="pgBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9ceff" />
          <stop offset="0.6" stopColor="#e6f9f6" />
          <stop offset="1" stopColor="#f2fcfa" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#pgBg)" />

      {/* distant hills */}
      <path d={`M0 190 Q 90 140 180 186 T 360 176 T ${W} 170 V ${H} H0 Z`} fill="#d9ceff" fillOpacity="0.7" />

      {/* igloo */}
      <g>
        <path d="M70 214 a52 52 0 0 1 104 0 Z" fill="#fff" stroke="#bff0ea" strokeWidth="2" />
        <path d="M96 214 a14 16 0 0 1 28 0 Z" fill="#2c2370" fillOpacity="0.8" />
        <path d="M70 196 H174 M82 178 H162" stroke="#bff0ea" strokeWidth="1.5" />
      </g>

      {/* snow ground */}
      <ellipse cx={W / 2} cy={262} rx={300} ry={48} fill="#fff" />
      <ellipse cx={W / 2} cy={268} rx={300} ry={40} fill="#e6f9f6" fillOpacity="0.6" />

      <Penguin x={260} y={168} scale={1.15} delay={0} />
      <Penguin x={350} y={184} scale={0.9} delay={0.5} flip />
      <Penguin x={430} y={176} scale={1} delay={0.9} />

      {/* party bunting */}
      <path d="M20 40 Q 130 80 240 44 T 500 50" fill="none" stroke="#4b46a8" strokeOpacity="0.4" strokeWidth="1.5" />
      {[60, 110, 165, 225, 290, 350, 410, 465].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} ${58 + Math.sin(i) * 6} l9 0 l-4.5 12 Z`}
          fill={["#f0745a", "#8b6fe0", "#2fb8aa", "#fbbf24"][i % 4]}
          animate={{ rotate: [-6, 6, -6] }}
          style={{ transformBox: "fill-box", transformOrigin: "top center" }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}

      {SNOW.map((f, i) => (
        <motion.circle
          key={i}
          cx={f.x}
          r={f.r}
          fill="#fff"
          initial={{ cy: -6 }}
          animate={{ cy: [-6, H + 6] }}
          transition={{ duration: f.d, repeat: Infinity, delay: f.delay, ease: "linear" }}
        />
      ))}
    </Canvas>
  );
}

/* ───────────────────────── MLC: wave-themed site wireframe ───────────────────────── */

const WAVE = "M0 30 " + "q20 -16 40 0 t40 0 ".repeat(9);

function MlcArt() {
  return (
    <Canvas id="MLC website wireframe">
      <defs>
        <linearGradient id="mlcBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ece6ff" />
          <stop offset="1" stopColor="#bff0ea" />
        </linearGradient>
        <linearGradient id="mlcHero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c2370" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
        <clipPath id="mlcClip">
          <rect x={40} y={76} width={440} height={96} rx={14} />
        </clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#mlcBg)" />

      {/* nav */}
      <rect x={40} y={26} width={440} height={34} rx={10} fill="#fff" fillOpacity="0.85" />
      <circle cx={58} cy={43} r={7} fill="#4b46a8" />
      <rect x={72} y={39} width={44} height={8} rx={4} fill="#1a1033" fillOpacity="0.75" />
      {[330, 372, 414].map((x) => (
        <rect key={x} x={x} y={40} width={30} height={6} rx={3} fill="#1a1033" fillOpacity="0.25" />
      ))}
      <rect x={446} y={35} width={26} height={16} rx={8} fill="#4b46a8" />

      {/* hero with waves */}
      <rect x={40} y={76} width={440} height={96} rx={14} fill="url(#mlcHero)" />
      <g clipPath="url(#mlcClip)">
        <g transform="translate(0 112)">
          <motion.path
            d={WAVE}
            fill="#4fcfc0"
            fillOpacity="0.35"
            animate={{ x: [0, -80] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <g transform="translate(-80 126)">
          <motion.path
            d={WAVE}
            fill="#a8e4db"
            fillOpacity="0.3"
            animate={{ x: [0, 80] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </g>
      </g>
      <rect x={62} y={96} width={170} height={12} rx={6} fill="#fff" />
      <rect x={62} y={116} width={120} height={8} rx={4} fill="#fff" fillOpacity="0.6" />
      <rect x={62} y={138} width={64} height={18} rx={9} fill="#fff" />

      {/* cards */}
      {[40, 190, 340].map((x, i) => (
        <g key={x}>
          <rect x={x} y={186} width={140} height={60} rx={12} fill="#fff" fillOpacity="0.9" />
          <rect x={x + 12} y={198} width={22} height={22} rx={7} fill={["#4b46a8", "#2fb8aa", "#8b6fe0"][i]} fillOpacity="0.9" />
          <rect x={x + 42} y={200} width={70} height={7} rx={3.5} fill="#1a1033" fillOpacity="0.55" />
          <rect x={x + 42} y={213} width={50} height={6} rx={3} fill="#1a1033" fillOpacity="0.2" />
          <motion.rect
            x={x + 12}
            y={230}
            width={116}
            height={5}
            rx={2.5}
            fill="#4b46a8"
            fillOpacity="0.18"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
          />
        </g>
      ))}
    </Canvas>
  );
}

/* ───────────────────────── Selector ───────────────────────── */

const ART: Record<string, () => ReactNode> = {
  lofty: LoftyArt,
  firewatch: FirewatchArt,
  "lockin-ai": LockInArt,
  "pengloo-party": PenglooArt,
  mlc: MlcArt,
};

export function hasProjectArt(id?: string) {
  return !!id && id in ART;
}

export function ProjectArt({ id }: { id: string }) {
  const Art = ART[id];
  return Art ? <Art /> : null;
}
