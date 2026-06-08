import { useState, useMemo } from "react";
import {
  Search,
  Flame,
  BarChart2,
  Medal,
  Clock,
  Users,
  Target,
  BookOpen,
  ChevronRight,
  CheckSquare,
} from "lucide-react";

// ─── Dummy Data ────────────────────────────────────────────────────────────────

const STATS = [
  {
    id: "selesai",
    icon: Flame,
    value: "12",
    label: "Try Out Selesai",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "score",
    icon: BarChart2,
    value: "485",
    label: "Rata-rata Score",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "peringkat",
    icon: Medal,
    value: "#1,234",
    label: "Peringkat Nasional",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "waktu",
    icon: Clock,
    value: "24 Jam",
    label: "Waktu Belajar",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
  },
];

const SNBT_TIPS = [
  "Kerjakan soal yang mudah terlebih dahulu",
  "Kelola waktu dengan baik",
  "Jangan terpaku pada satu soal",
  "Review jawaban sebelum submit",
];

// Paket Try Out master list
const TRYOUT_LIST = [
  {
    id: 1,
    title: "Try Out SNBT #1 - Paket Lengkap",
    badge: "Populer",
    type: "gratis",
    category: "semua",
    soal: 185,
    menit: 195,
    avg: 524,
    peserta: 10100,
    status: "selesai",
    score: 485,
    maxScore: 600,
    pct: 80,
  },
  {
    id: 2,
    title: "Try Out SNBT #2 - Tes Potensi Skolastik",
    badge: null,
    type: "gratis",
    category: "tps",
    soal: 90,
    menit: 105,
    avg: 487,
    peserta: 8400,
    status: "selesai",
    score: 460,
    maxScore: 500,
    pct: 92,
  },
  {
    id: 3,
    title: "Try Out SNBT #3 - Literasi & Numerasi",
    badge: "Baru",
    type: "gratis",
    category: "litnum",
    soal: 95,
    menit: 90,
    avg: 412,
    peserta: 7200,
    status: "tersedia",
    score: null,
    maxScore: 500,
    pct: 0,
  },
  {
    id: 4,
    title: "Try Out SNBT #4 - Paket Lengkap",
    badge: null,
    type: "premium",
    category: "semua",
    soal: 185,
    menit: 195,
    avg: 551,
    peserta: 4300,
    status: "tersedia",
    score: null,
    maxScore: 600,
    pct: 0,
  },
  {
    id: 5,
    title: "Try Out SNBT #5 - Tes Potensi Skolastik",
    badge: null,
    type: "premium",
    category: "tps",
    soal: 90,
    menit: 105,
    avg: 501,
    peserta: 3100,
    status: "tersedia",
    score: null,
    maxScore: 500,
    pct: 0,
  },
  {
    id: 6,
    title: "Try Out SNBT #6 - Literasi & Numerasi",
    badge: "Baru",
    type: "premium",
    category: "litnum",
    soal: 95,
    menit: 90,
    avg: 389,
    peserta: 2800,
    status: "tersedia",
    score: null,
    maxScore: 500,
    pct: 0,
  },
];

const TYPE_FILTERS = ["Semua", "Gratis", "Premium"];
const CAT_FILTERS = ["Semua", "Tes Potensi Skolastik", "Literasi & Numerasi"];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, value, label, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-1">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${iconBg}`}
      >
        <Icon size={20} className={iconColor} strokeWidth={1.8} />
      </div>
      <p className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">
        {value}
      </p>
      <p className="sm:text-xs lg:text-base text-slate-500 font-medium">{label}</p>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0",
        active
          ? "bg-linear-to-r from-[#3E799E] to-[#284E65] text-white shadow-sm"
          : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function formatPeserta(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

function TryOutCard({ item }) {
  const isSelesai = item.status === "selesai";
  const isPremium = item.type === "premium";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      {/* Title row */}
      <div className="flex items-start gap-2 mb-2">
        <h3 className="text-base font-extrabold text-[#25485E] flex-1 leading-snug">
          {item.title}
        </h3>
        <div className="flex gap-1.5 shrink-0">
          {item.badge && (
            <span
              className={[
                "text-[11px] font-extrabold px-2.5 py-0.5 rounded-full",
                item.badge === "Populer"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-700",
              ].join(" ")}
            >
              {item.badge}
            </span>
          )}
          {isPremium && (
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
              Premium
            </span>
          )}
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-4 mb-4 text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-1">
          <BookOpen size={11} /> {item.soal} Soal
        </span>
        <span className="flex items-center gap-1">
          <Clock size={11} /> {item.menit} Menit
        </span>
        <span className="flex items-center gap-1">
          <Target size={11} /> Avg: {item.avg}
        </span>
        <span className="flex items-center gap-1">
          <Users size={11} /> {formatPeserta(item.peserta)} Peserta
        </span>
      </div>

      {/* Status section */}
      {isSelesai ? (
        <div className="mb-4">
          {/* Status badge + score */}
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckSquare size={13} />
              Selesai
            </span>
            <div className="text-right">
              <span className="text-lg font-extrabold text-slate-800">
                {item.score}
              </span>
              <span className="text-xs text-slate-400 font-medium ml-1">
                Dari {item.maxScore} poin
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${(item.score / item.maxScore) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-200 rounded-full w-0" />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Belum dikerjakan</p>
        </div>
      )}

      {/* CTA button */}
      <button className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#3E799E] to-[#284E65] hover:bg-slate-900 text-white text-sm font-bold tracking-wide transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-1.5">
        {isSelesai ? "Lihat Pembahasan" : "Mulai Try Out"}
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

function TipsWidget() {
  return (
    <div className="bg-[#3E799E] rounded-2xl p-5 text-white sticky top-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-2xl">
          🎯
        </div>
        <h3 className="font-extrabold text-base leading-tight">
          Tips Mengerjakan SNBT
        </h3>
      </div>

      {/* Tips list */}
      <ul className="space-y-2.5 mb-5">
        {SNBT_TIPS.map((tip) => (
          <li
            key={tip}
            className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed"
          >
            <span className="text-amber-400 font-black mt-px shrink-0">
              ✦
            </span>
            {tip}
          </li>
        ))}
      </ul>

      <button className="w-full py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.98]">
        Pelajari Lebih Lanjut
      </button>
    </div>
  );
}

// ─── TryOut Page ───────────────────────────────────────────────────────────────

export default function TryOut() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [catFilter, setCatFilter] = useState("Semua");

  // Derived filtered list
  const filtered = useMemo(() => {
    return TRYOUT_LIST.filter((item) => {
      const matchQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchType =
        typeFilter === "Semua" ||
        (typeFilter === "Gratis" && item.type === "gratis") ||
        (typeFilter === "Premium" && item.type === "premium");
      const matchCat =
        catFilter === "Semua" ||
        (catFilter === "Tes Potensi Skolastik" && item.category === "tps") ||
        (catFilter === "Literasi & Numerasi" && item.category === "litnum");
      return matchQuery && matchType && matchCat;
    });
  }, [query, typeFilter, catFilter]);

  return (
    <div className="pb-8">
      {/* ── Page Header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4 mb-5">
        <h1 className="text-[25px] font-extrabold text-[#25485E]">Try Out SNBT</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Latih kemampuanmu dengan berbagai paket Try Out SNBT
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {STATS.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* ── Two-column layout: main + sidebar ── */}
      <div className="grid grid-cols-1 gap-5 items-start">
        {/* Left: Search + Filter + List */}
        <div className="space-y-4">
          {/* Search + type filter row */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            {/* Search bar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Cari Try Out..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                />
              </div>
              {/* Type filter pills (inline on same row as search) */}
              <div className="flex gap-2 shrink-0">
                {TYPE_FILTERS.map((f) => (
                  <FilterPill
                    key={f}
                    label={f}
                    active={typeFilter === f}
                    onClick={() => setTypeFilter(f)}
                  />
                ))}
              </div>
            </div>

            {/* Category filter pills — horizontally scrollable */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CAT_FILTERS.map((f) => (
                <FilterPill
                  key={f}
                  label={f}
                  active={catFilter === f}
                  onClick={() => setCatFilter(f)}
                />
              ))}
            </div>
          </div>

          {/* Try Out Card list */}
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((item) => (
                <TryOutCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-5xl mb-4">🔍</span>
              <p className="font-semibold text-slate-500">
                Tidak ada Try Out ditemukan
              </p>
              <p className="text-sm mt-1">
                Coba ubah filter atau kata pencarian
              </p>
            </div>
          )}
        </div>

        {/* Right: sticky Tips widget */}
        <TipsWidget />
      </div>
    </div>
  );
}
