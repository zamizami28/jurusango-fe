import { useState } from "react";
import { Edit3, Zap } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const USER = {
  initials: "VR",
  name: "Vania R.",
  fullName: "Vania Riska",
  joinedSince: "April 2027",
  birthDate: "14 Maret 2007",
  gender: "Perempuan",
  city: "Yogyakarta",
  school: "SMAN 1 Surabaya",
  grade: "XII",
  email: "v********2@gmail.com",
};

const IDENTITY_ROWS = [
  { label: "Nama Lengkap",  value: USER.fullName   },
  { label: "Tanggal Lahir", value: USER.birthDate  },
  { label: "Jenis Kelamin", value: USER.gender      },
  { label: "Kota",          value: USER.city        },
  { label: "Sekolah",       value: USER.school      },
  { label: "Kelas",         value: USER.grade       },
  { label: "Email",         value: USER.email       },
];

const BADGES = [
  { id: "streak",    icon: "🔥", label: "Streak 7 Hari",    active: true  },
  { id: "top30",     icon: "⭐", label: "Top 30 League",    active: true  },
  { id: "asesmen",   icon: "🧠", label: "Asesmen Lengkap",  active: true  },
  { id: "liga-perak",icon: "💎", label: "Liga Perak",       active: true  },
  { id: "liga-emas", icon: "🏆", label: "Liga Emas",        active: false },
  { id: "top20",     icon: "🎖️", label: "Top 20 Nasional",  active: false },
  { id: "perfect",   icon: "🎯", label: "Perfect Score",    active: false },
  { id: "top5",      icon: "🔥", label: "Top 5 League",     active: false },
];

const ACTIVITIES = [
  {
    id: 1,
    title: "Menyelesaikan Try Out SNBT #2",
    time: "2 jam lalu",
    xp: null,
    dotColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "Quest Teknik Sipil 80%",
    time: "2 jam lalu",
    xp: "+ 1700 XP",
    dotColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Naik ke Peringkat #35 Teknik Sipil League",
    time: "2 hari lalu",
    xp: null,
    icon: "🥈",
    dotColor: "bg-slate-400",
  },
  {
    id: 4,
    title: 'Dapat badge "Streak 7 Hari"',
    time: "5 hari lalu",
    xp: null,
    icon: "🔥",
    dotColor: "bg-orange-400",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ children, className = "" }) {
  return (
    <div
      className={[
        "bg-white rounded-2xl border border-slate-100 shadow-sm p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-sm font-extrabold text-blue-700 mb-5">{children}</h2>
  );
}

function IdentityRow({ label, value, isLast }) {
  return (
    <div
      className={[
        "flex items-center gap-6 py-3",
        !isLast ? "border-b border-slate-100" : "",
      ].join(" ")}
    >
      <span className="text-sm text-slate-500 w-36 flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

function BadgeCircle({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "w-14 h-14 rounded-full flex items-center justify-center text-2xl",
          "border-2 transition-all duration-200",
          active
            ? "bg-white border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            : "bg-slate-100 border-slate-200 grayscale opacity-40",
        ].join(" ")}
      >
        {icon}
      </div>
      <span
        className={[
          "text-[10px] font-semibold text-center leading-tight max-w-[64px]",
          active ? "text-slate-600" : "text-slate-400",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

function ActivityItem({ activity, isLast }) {
  return (
    <div className="flex gap-4 relative">
      {/* Timeline stem */}
      {!isLast && (
        <div className="absolute left-[5px] top-4 bottom-0 w-0.5 bg-slate-200 -z-0" />
      )}

      {/* Dot */}
      <div
        className={[
          "w-3 h-3 rounded-full flex-shrink-0 mt-1 z-10 ring-2 ring-white",
          activity.dotColor,
        ].join(" ")}
      />

      {/* Content */}
      <div className={["flex-1 pb-5", isLast ? "" : ""].join(" ")}>
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold text-blue-700 leading-snug flex items-center gap-1.5 flex-wrap">
            {activity.icon && <span className="text-base">{activity.icon}</span>}
            {activity.title}
          </p>
          <div className="text-right flex-shrink-0">
            {activity.xp && (
              <p className="text-xs font-extrabold text-emerald-600 whitespace-nowrap">
                {activity.xp}
              </p>
            )}
            <p className="text-xs text-slate-400 whitespace-nowrap mt-0.5">
              {activity.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ──────────────────────────────────────────────────────────────

export default function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-5 pb-8">
      {/* ── Identity Card ── */}
      <SectionCard>
        {/* User header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
              <span className="text-lg font-extrabold text-blue-600">
                {USER.initials}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-800">{USER.name}</h2>
              <p className="text-sm text-slate-400">
                Bergabung sejak {USER.joinedSince}
              </p>
            </div>
          </div>

          {/* Edit button */}
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150"
          >
            <Edit3 size={14} />
            Edit Profil
          </button>
        </div>

        {/* Identity section title */}
        <h3 className="text-sm font-extrabold text-slate-800 mb-1">
          Identitas Diri
        </h3>

        {/* Identity rows */}
        <div>
          {IDENTITY_ROWS.map((row, i) => (
            <IdentityRow
              key={row.label}
              label={row.label}
              value={row.value}
              isLast={i === IDENTITY_ROWS.length - 1}
            />
          ))}
        </div>
      </SectionCard>

      {/* ── Bottom two-column layout ── */}
      <div className="grid grid-cols-2 gap-5">
        {/* Badge & Pencapaian */}
        <SectionCard>
          <SectionTitle>Badge &amp; Pencapaian</SectionTitle>
          <div className="grid grid-cols-4 gap-x-4 gap-y-5">
            {BADGES.map((badge) => (
              <BadgeCircle key={badge.id} {...badge} />
            ))}
          </div>
        </SectionCard>

        {/* Aktivitas Terbaru */}
        <SectionCard>
          <SectionTitle>Aktivitas Terbaru</SectionTitle>
          <div>
            {ACTIVITIES.map((act, i) => (
              <ActivityItem
                key={act.id}
                activity={act}
                isLast={i === ACTIVITIES.length - 1}
              />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
