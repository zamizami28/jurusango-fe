import {
  Bell,
  User,
  TrendingUp,
  Star,
  Target,
  CheckSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─── Dummy Data

const USER = {
  name: "Vania",
  questsDone: 3,
  questsTotal: 5,
  notifications: 99,
};

const STATS = [
  {
    id: "ovr",
    icon: "🎯",
    value: "85",
    label: "OVR Score",
    trend: null,
    trendPct: null,
    iconBg: "bg-red-50",
  },
  {
    id: "league",
    icon: "🏆",
    value: "35",
    label: "Teknik Sipil League",
    trend: "up",
    trendPct: "8%",
    iconBg: "bg-yellow-50",
  },
  {
    id: "xp",
    icon: "⭐",
    value: "6,500",
    label: "Total XP Points",
    trend: "up",
    trendPct: "25%",
    iconBg: "bg-amber-50",
  },
  {
    id: "quest",
    icon: "✅",
    value: "18/25",
    label: "Quest Selesai",
    trend: "up",
    trendPct: "25%",
    iconBg: "bg-green-50",
  },
];

const ASSESSMENT_UMUM = [
  { subject: "Fisika", pct: 90 },
  { subject: "Matematika", pct: 88 },
  { subject: "Informatika", pct: 85 },
  { subject: "Ekonomi", pct: 84 },
  { subject: "Kimia", pct: 80 },
];

const OVR_JURUSAN = [
  { jurusan: "Teknik Elektro", score: 83, max: 100 },
  { jurusan: "Teknik Industri", score: 75, max: 100 },
  { jurusan: "Akuntansi", score: 67, max: 100 },
];

const ACTIVE_QUESTS = [
  {
    id: 1,
    title: "Teknik Sipil",
    badge: null,
    pct: 80,
    reward: "+350 XP",
  },
  {
    id: 2,
    title: "Teknik Informatika",
    badge: "PREMIUM",
    pct: 10,
    reward: "+500 XP",
  },
];

const LEAGUE_RANKINGS = [
  { rank: 1, name: "Dewi Lestari", xp: "9,800 XP", medal: "🥇" },
  { rank: 2, name: "Andi Pratama", xp: "9,300 XP", medal: "🥈" },
  { rank: 3, name: "Fitri Handayani", xp: "8,500 XP", medal: "🥉" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon, value, label, trend, trendPct, iconBg }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-1">
      <div className="flex items-center justify-between mb-1">
        <span
          className={`text-xl w-9 h-9 flex items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </span>
        {trend === "up" && trendPct && (
          <span className="flex items-center gap-0.5 sm:text-xs md:text-base lg:text-xl font-semibold text-emerald-500">
            <TrendingUp size={14} />
            {trendPct}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">
        {value}
      </p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  );
}

function ProgressBar({ pct, color = "bg-slate-800" }) {
  return (
    <div className="h-2 w-full bg-white rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function SectionCard({ title, children, action, linkTo }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-slate-800 text-base">{title}</h2>
        {action && (
          <Link
            to={linkTo || "#"}
            className="text-xs text-[#4282AA] font-semibold hover:underline whitespace-nowrap"
          >
            {action} →
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Dashboard Page ────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[25px] font-extrabold text-[#25485E]">
            Selamat Datang, {USER.name}!
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Kamu sudah menyelesaikan {USER.questsDone} dari {USER.questsTotal}{" "}
            Quest hari ini
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <Bell size={18} className="text-slate-600" />
            {USER.notifications > 0 && (
              <span className="absolute -top-1.5 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {USER.notifications}
              </span>
            )}
          </button>
          {/* Avatar */}
          <Link
            to="/profile"
            className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center hover:bg-slate-300 transition-colors"
          >
            <User size={18} className="text-slate-500" />
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* ── Report Analytics ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="font-bold text-slate-800 text-[16px] mb-4">
          Report Analytics &amp; Progress
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Asesmen Umum */}
          <div className="bg-[#D8EAF3] rounded-2xl p-6">
            <p className="text-xs font-semibold text-slate-500 mb-3 text-center tracking-wide uppercase">
              Asesmen Umum
            </p>
            <div className="space-y-3">
              {ASSESSMENT_UMUM.map(({ subject, pct }) => (
                <div key={subject} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 font-medium w-20 shrink-0">
                    {subject}
                  </span>
                  <div className="flex-1">
                    <ProgressBar
                      pct={pct}
                      color="bg-linear-to-r from-[#4585AC] to-[#1F3E51]"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700 w-8 text-right shrink-0">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* OVR Asesmen Jurusan */}
          <div className="bg-[#D8EAF3] rounded-2xl p-6">
            <p className="text-xs font-semibold text-slate-500 mb-3 text-center tracking-wide uppercase">
              Asesmen Jurusan
            </p>
            <div className="space-y-3">
              {OVR_JURUSAN.map(({ jurusan, score }) => (
                <div key={jurusan} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 font-medium w-24 shrink-0">
                    {jurusan}
                  </span>
                  <div className="flex-1">
                    <ProgressBar
                      pct={score}
                      color="bg-linear-to-r from-[#4585AC] to-[#1F3E51]"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700 w-6 text-right shrink-0">
                    {score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Active Quests + League ── */}
      <div className="grid grid-cols-2 gap-4 pb-6">
        {/* Active Major Quest */}
        <SectionCard
          title="🎮 Active Major Quest"
          action="Lihat Semua"
          linkTo="/assessment"
        >
          <div className="space-y-3">
            {ACTIVE_QUESTS.map((quest) => (
              <div
                key={quest.id}
                className="bg-[#D8EAF3] rounded-xl p-3 border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[16px] font-bold text-slate-800">
                    {quest.title}
                  </span>
                  {quest.badge && (
                    <span className="text-[10px] font-extrabold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full tracking-wide">
                      {quest.badge}
                    </span>
                  )}
                </div>
                <div className="mb-1.5">
                  <ProgressBar
                    pct={quest.pct}
                    color={"bg-linear-to-r from-[#4585AC] to-[#1F3E51]"}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-slate-500">
                    {quest.pct}% Selesai
                  </span>
                  <span className="text-[14px] font-bold text-amber-600">
                    🪙 {quest.reward}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Teknik Sipil League */}
        <SectionCard
          title="🏆 Teknik Sipil League"
          action="Lihat Semua"
          linkTo="/leaderboard"
        >
          <div className="space-y-2">
            {LEAGUE_RANKINGS.map(({ rank, name, xp, medal }) => (
              <div
                key={rank}
                className="flex items-center gap-4 bg-[#D8EAF3] rounded-xl px-3 py-2.5 border border-slate-100"
              >
                <span className="text-[25px] w-6 text-center">{medal}</span>
                <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                  <User size={20} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-slate-800 truncate">
                    {name}
                  </p>
                  <p className="text-[14px] text-slate-500">{xp}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
