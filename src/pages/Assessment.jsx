import { useState } from "react";
import { Brain, Gamepad2, Lock, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Data ──────────────────────────────────────────────────────────────────────

const ASSESSMENT_UMUM_FEATURES = [
  "Tes minat bakat FACT",
  "Analisis kemampuan akademik",
  "Analisis gaya belajar",
  "Rekomendasi 10 jurusan teratas",
  "Gratis untuk semua user",
];

const ASSESSMENT_JURUSAN_FEATURES = [
  "Simulasi berbasis game",
  "Kategori Saintek & Soshum",
  "30+ pilihan jurusan",
  "Reward XP",
  "Beberapa quest premium",
];

const DAFTAR_JURUSAN = [
  { id: "kedokteran", label: "Kedokteran", premium: true },
  { id: "manajemen", label: "Manajemen", premium: false },
  { id: "ilmu-komunikasi", label: "Ilmu Komunikasi", premium: false },
  { id: "teknik-sipil", label: "Teknik Sipil", premium: false },
  { id: "teknik-elektro", label: "Teknik Elektro", premium: false },
  { id: "teknik-informatika", label: "Teknik Informatika", premium: true },
  { id: "hubungan-intl", label: "Hubungan Internasional", premium: false },
  { id: "akuntansi", label: "Akuntansi", premium: false },
  { id: "ilmu-hukum", label: "Ilmu Hukum", premium: false },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FeatureCheck({ text }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-500">
      <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-black">
        ✓
      </span>
      {text}
    </li>
  );
}

function AssessmentTypeCard({
  icon: Icon,
  title,
  subtitle,
  features,
  onStart,
  iconBg,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${iconBg}`}
      >
        <Icon size={24} className={iconColor} strokeWidth={1.8} />
      </div>

      {/* Title + subtitle */}
      <h2 className="text-xl font-extrabold text-slate-800 mb-1">{title}</h2>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{subtitle}</p>

      {/* Feature list */}
      <ul className="space-y-2.5 flex-1 mb-6">
        {features.map((f) => (
          <FeatureCheck key={f} text={f} />
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full py-3 rounded-xl bg-linear-to-r from-[#3E799E] to-[#284E65] hover:bg-slate-900 text-white text-sm font-bold tracking-wide transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        Mulai Asesmen
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

function JurusanRow({ label, premium, onStart, index }) {
  return (
    <div
      className="flex items-center justify-between bg-slate-50 hover:bg-blue-50/50 border border-slate-100 rounded-2xl px-5 py-4 transition-all duration-150 group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-slate-800">{label}</span>
        {premium && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-700 text-white">
            <Lock size={9} strokeWidth={2.5} />
            Premium
          </span>
        )}
      </div>
      <button
        onClick={onStart}
        className="px-5 py-2 rounded-xl bg-linear-to-r from-[#3E799E] to-[#284E65] hover:bg-slate-900 text-white text-xs font-bold tracking-wide transition-all duration-150 active:scale-[0.97] flex items-center gap-1.5 group-hover:gap-2.5"
      >
        Mulai Assesment
        <ChevronRight size={13} />
      </button>
    </div>
  );
}

// ─── Assessment Page ───────────────────────────────────────────────────────────

export default function Assessment() {
  const [starting, setStarting] = useState(null);

  const handleStart = (id) => {
    setStarting(id);
    setTimeout(() => setStarting(null), 1500);
    alert(`Memulai asesmen: ${id}`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ── Top Feature Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AssessmentTypeCard
          icon={Brain}
          title="Assessment Umum"
          subtitle="Temukan minat, bakat, dan kepribadian kamu melalui assessment komprehensif yang akan memberikan rekomendasi jurusan yang paling sesuai."
          features={ASSESSMENT_UMUM_FEATURES}
          onStart={() => handleStart("umum")}
          iconBg="bg-rose-50"
          iconColor="text-rose-500"
        />
        <AssessmentTypeCard
          icon={Gamepad2}
          title="Assessment Jurusan"
          subtitle="Eksplorasi mendalam setiap jurusan melalui simulasi interaktif dan gamified learning. Rasakan langsung seperti apa kuliah di jurusan impianmu!"
          features={ASSESSMENT_JURUSAN_FEATURES}
          onStart={() => handleStart("jurusan")}
          iconBg="bg-slate-100"
          iconColor="text-slate-600"
        />
      </div>

      {/* ── Daftar Assessment Jurusan ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="relative flex items-center justify-between mb-5">
          <h2 className="absolute left-1/2 -translate-x-1/2 sm:text-xl lg:text-2xl font-extrabold text-slate-700 tracking-wide">
            Daftar Asesmen Jurusan
          </h2>
          <div></div>
          <Link
            to="/product"
            className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            Lihat Semua <ArrowRight size={13} />
          </Link>
        </div>

        <div className="space-y-3">
          {DAFTAR_JURUSAN.map((item, i) => (
            <JurusanRow
              key={item.id}
              label={item.label}
              premium={item.premium}
              index={i}
              onStart={() => handleStart(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
