import { useState } from "react";
import { Crown, ChevronRight, ArrowRight, Trophy } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const LEADERBOARD_TABS = [
  { id: "semua",   label: "Semua"         },
  { id: "tryout",  label: "Try Out SNBT"  },
  { id: "jurusan", label: "Jurusan Saya"  },
];

// Top-3 podium
const PODIUM = [
  { rank: 2, initials: "KA", name: "Kevin Abian",  score: "807,86", color: "#94a3b8", ring: "#cbd5e1", barBg: "#e2e8f0", barFill: "#94a3b8",  height: "h-16" },
  { rank: 1, initials: "AR", name: "Ajeng Raina",  score: "820,14", color: "#f59e0b", ring: "#fbbf24", barBg: "#fef3c7", barFill: "#f59e0b",  height: "h-24" },
  { rank: 3, initials: "JP", name: "Jessica Putri", score: "792,67", color: "#b45309", ring: "#d97706", barBg: "#fef3c7", barFill: "#b45309",  height: "h-12" },
];

// Ranks 4–7
const RANKED_LIST = [
  { rank: 4, name: "Tyas Melin",      score: "790,22" },
  { rank: 5, name: "Rian Wicaksono",  score: "746,17" },
  { rank: 6, name: "Zahra Amelia",    score: "696,77" },
  { rank: 7, name: "Vania Arshita",   score: "696,77" },
];

// Asesmen Jurusan leaderboard
const JURUSAN_BOARDS = [
  { id: "tek-elektro",  label: "Teknik Elektro",   rank: 7,  rankColor: "bg-amber-100 text-amber-800",  xp: "9800 XP",  status: "Selesai.",  pct: null },
  { id: "tek-industri", label: "Teknik Industri",  rank: 23, rankColor: "bg-blue-100 text-blue-800",    xp: "6700 XP",  status: "Selesai.",  pct: null },
  { id: "akuntansi",    label: "Akuntansi",         rank: 67, rankColor: "bg-slate-100 text-slate-600",  xp: "3100 XP",  status: "Selesai.",  pct: null },
  { id: "tek-sipil",    label: "Teknik Sipil",      rank: 35, rankColor: "bg-slate-100 text-slate-600",  xp: "5850 XP",  status: "80% Selesai.", pct: 80 },
];

// ─── Medal colors ──────────────────────────────────────────────────────────────
const MEDAL = {
  1: { bg: "bg-amber-400",  text: "text-amber-900",  label: "🥇" },
  2: { bg: "bg-slate-400",  text: "text-white",       label: "🥈" },
  3: { bg: "bg-amber-700",  text: "text-white",       label: "🥉" },
};

// ─── Podium Avatar ─────────────────────────────────────────────────────────────
function PodiumAvatar({ entry }) {
  const isFirst = entry.rank === 1;
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Crown — only for rank 1 */}
      <div className={`${isFirst ? "opacity-100" : "opacity-0"} text-2xl mb-0.5`}>
        👑
      </div>

      {/* Avatar circle */}
      <div
        className={[
          "rounded-full flex items-center justify-center font-extrabold text-white shadow-lg border-4",
          isFirst ? "w-16 h-16 text-lg" : "w-14 h-14 text-base",
        ].join(" ")}
        style={{
          backgroundColor: entry.color,
          borderColor: entry.ring,
        }}
      >
        {entry.initials}
      </div>

      {/* Rank badge */}
      <div
        className={[
          "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white -mt-3 shadow-sm z-10",
          isFirst ? "bg-amber-400" : entry.rank === 2 ? "bg-slate-400" : "bg-amber-700",
        ].join(" ")}
      >
        {entry.rank}
      </div>

      {/* Name + score */}
      <p className="text-sm font-bold text-slate-800 text-center mt-1 max-w-[80px] leading-tight">
        {entry.name}
      </p>
      <p className="text-xs font-semibold text-slate-500">{entry.score}</p>

      {/* Podium bar */}
      <div
        className={[
          "w-20 rounded-t-lg mt-2",
          entry.rank === 1 ? "h-24" : entry.rank === 2 ? "h-16" : "h-12",
        ].join(" ")}
        style={{ backgroundColor: entry.barFill, opacity: 0.4 }}
      />
    </div>
  );
}

// ─── Leaderboard Page ──────────────────────────────────────────────────────────
export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("semua");

  // Podium order: 2, 1, 3 (left, center, right)
  const podiumOrder = [
    PODIUM.find((p) => p.rank === 2),
    PODIUM.find((p) => p.rank === 1),
    PODIUM.find((p) => p.rank === 3),
  ];

  return (
    <div className="space-y-5 pb-8">
      {/* ── Top Card: Podium + Ranked List ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <h1 className="text-xl font-extrabold text-slate-800">Leaderboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Bersaing dengan peserta lain dan raih posisi teratas!
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 flex gap-2">
          {LEADERBOARD_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-slate-800 text-white shadow-sm"
                    : "border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 bg-white",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Section title */}
        <div className="px-6 pt-5 pb-1">
          <h2 className="text-base font-extrabold text-blue-700 text-center tracking-tight">
            Leaderboard Try Out SNBT Paket 7
          </h2>
        </div>

        {/* Podium */}
        <div className="px-6 pt-2 pb-2 flex items-end justify-center gap-4">
          {podiumOrder.map((entry) => (
            <PodiumAvatar key={entry.rank} entry={entry} />
          ))}
        </div>

        {/* Ranked List 4–7 */}
        <div className="mx-6 mb-5 mt-1 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
          {/* Header row */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Peserta</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Skor</span>
              <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5">
                Lihat Semua <ArrowRight size={11} />
              </button>
            </div>
          </div>

          {RANKED_LIST.map((entry, i) => (
            <div
              key={entry.rank}
              className={[
                "flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-100",
                i < RANKED_LIST.length - 1 ? "border-b border-slate-200" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-5">{entry.rank}.</span>
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-500">
                    {entry.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-700">{entry.name}</span>
              </div>
              <span className="text-sm font-extrabold text-slate-800">{entry.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Leaderboard Asesmen Jurusan ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-base font-extrabold text-slate-800 text-center mb-5">
          Leaderboard Asesmen Jurusan
        </h2>

        <div className="space-y-3">
          {JURUSAN_BOARDS.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100 hover:bg-blue-50/40 hover:border-blue-100 transition-all duration-150 group"
            >
              {/* Major name */}
              <span className="text-sm font-bold text-slate-800 flex-1">
                {item.label}
              </span>

              {/* Rank badge */}
              <span
                className={[
                  "px-3 py-1 rounded-full text-xs font-extrabold",
                  item.rankColor,
                ].join(" ")}
              >
                Peringkat #{item.rank}
              </span>

              {/* XP + status */}
              <span className="text-sm font-semibold text-slate-600 min-w-[120px] text-right">
                {item.status} {item.xp}
              </span>

              {/* Link */}
              <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                Lihat <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
