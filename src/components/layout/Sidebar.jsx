import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  ClipboardList,
  Trophy,
  ShoppingBag,
  User,
  Zap,
  GraduationCap,
  ChevronLeft,
  Menu,
  Gift,
} from "lucide-react";

// ─── Dummy Data ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Assessment", to: "/assessment", icon: Brain },
  { label: "Try Out SNBT", to: "/tryout", icon: ClipboardList },
  { label: "Leaderboard", to: "/leaderboard", icon: Trophy },
  { label: "Rewards", to: "/rewards", icon: Gift },
  { label: "Product", to: "/product", icon: ShoppingBag },
  { label: "Profile", to: "/profile", icon: User },
];

const LEAGUE_DATA = {
  current: 6000,
  max: 10000,
  label: "League Progress",
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const progressPct = Math.round((LEAGUE_DATA.current / LEAGUE_DATA.max) * 100);

  return (
    <aside
      // Lebar berubah dinamis dari w-60 ke w-20, ditambah efek transisi mulus
      className={`fixed left-0 top-0 h-screen flex flex-col bg-white border-r border-slate-100 shadow-sm z-40 transition-all duration-300 ease-in-out ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      {/* ── Header & Toggle Button ── */}
      <div
        className={`px-4 pt-7 pb-6 flex items-center ${isOpen ? "justify-between" : "justify-center"}`}
      >
        {/* Logo JURUSANKU (Hanya Muncul Jika Terbuka) */}
        <div
          className={`flex items-center gap-2 select-none overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
        >
          <div className="relative w-9 h-9 flex">
            <img src="/src/assets/logo.svg" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#1F3D50] whitespace-nowrap group-hover:">
            Jurusan<span className="text-[#4282AA]">Go</span>
          </span>
        </div>

        {/* Tombol Buka Tutup */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="px-6 mb-4">
        <div className="h-px bg-slate-200" />
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);

          return (
            <NavLink
              key={to}
              to={to}
              title={!isOpen ? label : ""} // Memunculkan tooltip nama menu saat sidebar ditutup
              className={() =>
                `group flex items-center gap-3 py-2.5 rounded-xl text-[16px] font-semibold transition-all duration-150 ${
                  isOpen ? "px-3" : "px-0 justify-center"
                } ${
                  isActive
                    ? "bg-blue-50 text-blue-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`
              }
            >
              {/* Indikator Garis Aktif */}
              <span
                className={`absolute left-0 w-1 h-7 rounded-r-full bg-blue-700 transition-all duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}
              />

              <span
                className={`flex items-center justify-center min-w-8 h-8 rounded-lg transition-colors duration-150 ${isActive ? "bg-blue-100 text-blue-700" : "text-slate-400 group-hover:text-slate-600"}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              </span>

              {/* Teks Menu */}
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? "opacity-100 max-w-50" : "opacity-0 max-w-0"}`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* ── League Progress Widget (Disembunyikan Jika Tertutup) ── */}
      <div
        className={`px-4 overflow-hidden transition-all duration-300 ${isOpen ? "pb-6 pt-3 opacity-100 max-h-64" : "p-0 opacity-0 max-h-0"}`}
      >
        <div className="bg-linear-to-r from-[#3E799E] to-[#284E65] rounded-2xl p-4 shadow-lg shadow-slate-200 w-full min-w-48">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-blue-200/20 flex items-center justify-center shrink-0">
              <Zap size={12} className="text-white" fill="currentColor" />
            </div>
            <span className="text-xs font-semibold text-[#FFFFFF] tracking-wide uppercase whitespace-nowrap">
              {LEAGUE_DATA.label}
            </span>
          </div>

          <div className="h-2 w-full bg-white/40 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-linear-to-r from-blue-400 to-cyan-300 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <p className="text-xs text-[#FFFFFF] font-medium whitespace-nowrap">
            {LEAGUE_DATA.current.toLocaleString("id-ID")} /{" "}
            {LEAGUE_DATA.max.toLocaleString("id-ID")} XP
          </p>
        </div>
      </div>
    </aside>
  );
}
