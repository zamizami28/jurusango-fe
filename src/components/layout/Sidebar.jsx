import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  ClipboardList,
  Trophy,
  ShoppingBag,
  User,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Assessment", to: "/assessment", icon: Brain },
  { label: "Try Out SNBT", to: "/tryout", icon: ClipboardList },
  { label: "Leaderboard", to: "/leaderboard", icon: Trophy },
  { label: "Product", to: "/product", icon: ShoppingBag },
  { label: "Profile", to: "/profile", icon: User },
];

const LEAGUE_DATA = {
  current: 6500,
  max: 10000,
  label: "League Progress",
};

export default function Sidebar() {
  const location = useLocation();

  const progressPct = Math.round((LEAGUE_DATA.current / LEAGUE_DATA.max) * 100);

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col bg-white border-r border-slate-100 shadow-sm z-40">
      {/* ── Logo ── */}
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-2 select-none">
          {/* Globe icon SVG inline — matches "Jurusanku" brand mark feel */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-md shadow-blue-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-white"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            Jurusan<span className="text-blue-600">ku</span>
          </span>
        </div>
        <div className="mt-5 h-px bg-slate-100" />
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
          // Exact match for "/" otherwise prefix match
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);

          return (
            <NavLink
              key={to}
              to={to}
              className={() =>
                [
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                  isActive
                    ? "bg-blue-50 text-blue-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                ].join(" ")
              }
            >
              {/* Active indicator bar */}
              <span
                className={[
                  "absolute left-0 w-1 h-7 rounded-r-full bg-blue-700 transition-all duration-200",
                  isActive ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />

              <span
                className={[
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-400 group-hover:text-slate-600",
                ].join(" ")}
              >
                <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              </span>

              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ── League Progress Widget ── */}
      <div className="px-4 pb-6 pt-3">
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-4 shadow-lg shadow-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-blue-400/20 flex items-center justify-center">
              <Zap size={12} className="text-blue-300" fill="currentColor" />
            </div>
            <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
              {LEAGUE_DATA.label}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-slate-600 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <p className="text-xs text-slate-400 font-medium">
            {LEAGUE_DATA.current.toLocaleString("id-ID")} /{" "}
            {LEAGUE_DATA.max.toLocaleString("id-ID")} XP
          </p>
        </div>
      </div>
    </aside>
  );
}
