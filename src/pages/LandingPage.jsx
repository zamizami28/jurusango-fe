import { useState, useEffect, useRef } from "react";
import {
  Brain,
  Trophy,
  ClipboardList,
  Star,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  Zap,
  Users,
  TrendingUp,
  MapPin,
  ArrowRight,
  Shield,
  Gamepad2,
  BookOpen,
  Quote,
} from "lucide-react";

/* ─── Google Font (Montserrat) injected once ─────────────────────────────── */
function useMontserrat() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Montserrat', sans-serif";
    return () => document.head.removeChild(link);
  }, []);
}

/* ─── Intersection Observer hook for scroll-reveal ──────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Try Out", href: "#tryout" },
  { label: "Harga", href: "#harga" },
];

const STATS = [
  { value: "50.000+", label: "Siswa Aktif", icon: Users },
  { value: "30+", label: "Jurusan Tersedia", icon: MapPin },
  { value: "94%", label: "Puas dengan Pilihannya", icon: TrendingUp },
];

const FEATURES = [
  {
    icon: Brain,
    color: "bg-blue-50 text-blue-600",
    accent: "border-blue-100",
    badge: "Gratis",
    badgeColor: "bg-emerald-100 text-emerald-700",
    title: "Asesmen Minat & Bakat",
    desc: "Tes FACT yang tervalidasi secara ilmiah membuatmu kenal diri sendiri lebih dalam — bukan sekadar angket biasa. Hasilnya: 10 jurusan paling cocok untukmu, lengkap dengan alasan kuatnya.",
    checks: ["Tes minat bakat tervalidasi", "Analisis gaya belajar", "Rekomendasi personal 10 jurusan"],
  },
  {
    icon: Gamepad2,
    color: "bg-amber-50 text-amber-600",
    accent: "border-amber-100",
    badge: "Unggulan",
    badgeColor: "bg-amber-100 text-amber-700",
    title: "Quest & Leaderboard",
    desc: "Belajar terasa seperti main game. Selesaikan Quest eksplorasi jurusan, raih XP, dan naiki Liga bersama ribuan siswa lain — dari Liga Perunggu sampai Liga Berlian.",
    checks: ["Simulasi kehidupan kuliah real", "Liga kompetitif antar peserta", "Reward XP & badge eksklusif"],
  },
  {
    icon: ClipboardList,
    color: "bg-violet-50 text-violet-600",
    accent: "border-violet-100",
    badge: "SNBT Ready",
    badgeColor: "bg-violet-100 text-violet-700",
    title: "Try Out SNBT Lengkap",
    desc: "Paket soal Try Out SNBT dengan pembahasan detail, analisis performa per subtes, dan peringkat nasional. Tahu persis di mana posisimu sebelum hari-H.",
    checks: ["185 soal per paket lengkap", "Analisis performa real-time", "Peringkat nasional instan"],
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Brain,
    title: "Ikuti Asesmen",
    desc: "Jawab 60 pertanyaan tes minat bakat FACT. Gratis, tanpa perlu login dulu. Selesai dalam 15 menit.",
  },
  {
    step: "02",
    icon: Gamepad2,
    title: "Eksplorasi Lewat Quest",
    desc: "Pilih jurusan yang masuk daftar rekomendasimu. Jalani simulasi interaktif — rasakan langsung rasanya kuliah di sana.",
  },
  {
    step: "03",
    icon: Trophy,
    title: "Yakin & Daftar Kuliah",
    desc: "Dengan data asesmenmu, kamu punya bukti kuat kenapa jurusan itu tepat untukmu — bukan cuma ikut-ikutan.",
  },
];

const TESTIMONIALS = [
  {
    name: "Alya Putri",
    school: "SMAN 3 Jakarta · Kini di FKG UI",
    quote: "Awalnya mau ikut-ikutan masuk Kedokteran. Setelah asesmen, ternyata skorku jauh lebih cocok ke FKG. Sekarang udah semester 3 dan ga nyesel sama sekali.",
    avatar: "AP",
    avatarBg: "bg-pink-400",
    stars: 5,
  },
  {
    name: "Reza Firmansyah",
    school: "SMAN 1 Surabaya · Kini di Teknik Sipil ITS",
    quote: "Gue kira bakal masuk Manajemen karena tekanan ortu. Jurusanku kasih data yang gue tunjukin ke bokap. Dia akhirnya ngerti kenapa gue harus masuk Teknik.",
    avatar: "RF",
    avatarBg: "bg-blue-500",
    stars: 5,
  },
  {
    name: "Sinta Dewi",
    school: "SMAN 7 Bandung · Kini di Ilmu Komunikasi Unpad",
    quote: "Try Out SNBT-nya bantu banget. Analisis per subtesnya detail, jadi tau persis harus fokus latihan di bagian mana. Masuk SNBT pertama kali.",
    avatar: "SD",
    avatarBg: "bg-emerald-500",
    stars: 5,
  },
];

const PRICING = [
  {
    name: "Gratis",
    price: "Rp 0",
    period: "",
    desc: "Mulai kenali dirimu tanpa keluar biaya sepeser pun.",
    cta: "Daftar Gratis",
    ctaStyle: "border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600",
    features: ["Asesmen Umum (1x)", "Lihat 3 rekomendasi jurusan", "Try Out SNBT gratis (2 paket)", "Dashboard dasar"],
    highlight: false,
  },
  {
    name: "Premium",
    price: "Rp 49.000",
    period: "/bulan",
    desc: "Untuk siswa yang serius tidak mau salah jurusan.",
    cta: "Coba 7 Hari Gratis",
    ctaStyle: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200",
    features: [
      "Asesmen Jurusan Unlimited",
      "Semua rekomendasi jurusan",
      "Try Out SNBT Unlimited",
      "Quest & Liga kompetitif",
      "Analisis performa detail",
      "Badge & sertifikat eksklusif",
    ],
    highlight: true,
    badge: "Paling Populer",
  },
  {
    name: "Premium Tahunan",
    price: "Rp 470.400",
    period: "/tahun",
    desc: "Hemat 20% dibanding bulanan. Cocok untuk persiapan SNBT panjang.",
    cta: "Pilih Tahunan",
    ctaStyle: "border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600",
    features: [
      "Semua fitur Premium",
      "Hemat Rp 117.600/tahun",
      "Akses prioritas fitur baru",
      "Konsultasi jurusan 1x/bulan",
    ],
    highlight: false,
  },
];

/* ─── Animated Path-Fork Illustration (SVG) ──────────────────────────────── */
function PathForkIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none" aria-hidden="true">
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-100/60 via-transparent to-transparent rounded-full blur-3xl scale-110" />

      <svg
        viewBox="0 0 400 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        {/* ── Background card ── */}
        <rect x="20" y="20" width="360" height="380" rx="28" fill="#F0F7FF" stroke="#BFDBFE" strokeWidth="1.5" />

        {/* ── Subtitle label ── */}
        <rect x="130" y="42" width="140" height="26" rx="13" fill="#DBEAFE" />
        <text x="200" y="59" textAnchor="middle" fill="#1D4ED8" fontSize="11" fontWeight="700" fontFamily="Montserrat, sans-serif">
          Pilih Jalanmu
        </text>

        {/* ── STEM path (single road coming up) ── */}
        <path d="M200 350 L200 240" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />

        {/* ── WRONG path (left, faded/dashed) ── */}
        <path
          d="M200 240 Q160 200 120 160 Q100 140 90 110"
          stroke="#FCA5A5"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="10 6"
          opacity="0.7"
        />
        {/* Wrong path X marker */}
        <circle cx="90" cy="98" r="18" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="2" />
        <text x="90" y="104" textAnchor="middle" fill="#EF4444" fontSize="18" fontWeight="900">✕</text>
        <rect x="36" y="72" width="90" height="20" rx="10" fill="#FEE2E2" />
        <text x="81" y="86" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="700" fontFamily="Montserrat, sans-serif">Salah Jurusan 😓</text>

        {/* ── RIGHT path (animated glow line) ── */}
        <path
          d="M200 240 Q240 200 280 160 Q300 140 310 110"
          stroke="#93C5FD"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Animated glowing correct path on top */}
        <path
          d="M200 240 Q240 200 280 160 Q300 140 310 110"
          stroke="url(#blueGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="0"
            dur="1.8s"
            repeatCount="indefinite"
            calcMode="ease"
          />
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Right path destination — success badge */}
        <circle cx="310" cy="98" r="22" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2.5" />
        <text x="310" y="106" textAnchor="middle" fill="#1D4ED8" fontSize="22">🎓</text>
        <rect x="264" y="68" width="100" height="20" rx="10" fill="#DBEAFE" />
        <text x="314" y="82" textAnchor="middle" fill="#1E40AF" fontSize="9" fontWeight="700" fontFamily="Montserrat, sans-serif">Jurusan Impian ✨</text>

        {/* ── Fork junction dot (pulsing) ── */}
        <circle cx="200" cy="240" r="12" fill="#2563EB">
          <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="240" r="6" fill="white" />

        {/* ── Floating XP badge ── */}
        <g transform="translate(148,170)">
          <rect width="64" height="26" rx="13" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
          <text x="32" y="17" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="800" fontFamily="Montserrat, sans-serif">⭐ +250 XP</text>
        </g>

        {/* ── Floating rank badge ── */}
        <g transform="translate(220,290)">
          <rect width="80" height="26" rx="13" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1.5" />
          <text x="40" y="17" textAnchor="middle" fill="#5B21B6" fontSize="10" fontWeight="700" fontFamily="Montserrat, sans-serif">🏆 Liga Emas</text>
        </g>

        {/* ── Character (you) at bottom ── */}
        <circle cx="200" cy="370" r="20" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="2" />
        <text x="200" y="378" textAnchor="middle" fontSize="22">🧑‍🎓</text>

        <defs>
          <linearGradient id="blueGrad" x1="200" y1="240" x2="310" y2="98" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating stat cards */}
      <div className="absolute top-8 -left-2 bg-white rounded-xl px-3 py-2 shadow-md border border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 animate-bounce-slow">
        <span className="text-base">🔥</span> Streak 14 Hari
      </div>
      <div className="absolute bottom-16 -right-2 bg-white rounded-xl px-3 py-2 shadow-md border border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5">
        <span className="text-green-500 font-black">✓</span> 3 Quest Selesai
      </div>
    </div>
  );
}

/* ─── Star Rating ─────────────────────────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-lg font-extrabold text-slate-800 tracking-tight">
              Jurusan<span className="text-blue-600">ku</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50">
              Masuk
            </button>
            <button className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-200 active:scale-95">
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} className="text-slate-700" /> : <Menu size={20} className="text-slate-700" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block px-2 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Masuk
              </button>
              <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                Daftar Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <Zap size={13} className="text-blue-600 fill-blue-600" />
              <span className="text-xs font-bold text-blue-700 tracking-wide uppercase">Platform #1 Eksplorasi Jurusan</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 leading-[1.1] tracking-tight mb-5">
              Jangan Sampai{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">Salah Jurusan!</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 right-0 h-3 bg-amber-200/60 rounded-sm -z-0"
                />
              </span>
              <br />
              Temukan Masa Depanmu di Sini.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Platform gamifikasi yang membantu siswa SMA eksplorasi jurusan kuliah lewat asesmen ilmiah, simulasi interaktif, dan try out SNBT — supaya kamu yakin sebelum daftar.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button className="flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-200/70 hover:shadow-lg hover:shadow-blue-300/50 hover:-translate-y-0.5 active:scale-95">
                Mulai Asesmen Gratis
                <ArrowRight size={16} />
              </button>
              <button className="flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-slate-50 active:scale-95">
                Pelajari Lebih Lanjut
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Social proof micro */}
            <div className="flex items-center gap-3">
              {/* Stacked avatars */}
              <div className="flex -space-x-2">
                {["bg-blue-400", "bg-pink-400", "bg-amber-400", "bg-emerald-400"].map((c, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["A", "R", "S", "D"][i]}
                  </div>
                ))}
              </div>
              <div>
                <Stars />
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-bold text-slate-700">50.000+ siswa</span> sudah pakai Jurusanku
                </p>
              </div>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="hidden md:block">
            <PathForkIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Strip ────────────────────────────────────────────────────────── */
function StatsStrip() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      className={`py-10 bg-slate-50 border-y border-slate-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-6 divide-x divide-slate-200">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center text-center px-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">{value}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Icon size={13} className="text-blue-500" />
                <p className="text-xs sm:text-sm font-semibold text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ───────────────────────────────────────────────────── */
function FeaturesSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="fitur" ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            Fitur Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Satu Platform, Semua yang Kamu Butuhkan
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
            Dari kenali diri, eksplorasi jurusan, sampai latihan SNBT — semua ada, semua terintegrasi, semua bikin belajar terasa menyenangkan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${f.accent} transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${f.color}`}>
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${f.badgeColor}`}>
                    {f.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-slate-800 mb-2">{f.title}</h3>

                {/* Desc */}
                <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">{f.desc}</p>

                {/* Checklist */}
                <ul className="space-y-2">
                  {f.checks.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="cara-kerja" ref={ref} className="py-20 bg-[#F0F7FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 bg-blue-100 px-4 py-1.5 rounded-full">
            Cara Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Tiga Langkah Menuju Jurusan yang Tepat
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-base">
            Tidak perlu bingung mulai dari mana. Ikuti alurnya — dalam 30 menit kamu sudah punya gambaran jelas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-10 left-[calc(16.5%+1rem)] right-[calc(16.5%+1rem)] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"
          />

          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={`relative flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-slate-100 shadow-sm transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Step number */}
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-extrabold text-lg shadow-md shadow-blue-200 z-10">
                  {step.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-blue-600" strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-extrabold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────── */
function TestimonialsSection() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">
            Cerita Nyata
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Mereka Sudah Buktikan Sendiri
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-base">
            Bukan janji marketing. Ini cerita dari siswa yang sudah pakai Jurusanku dan sekarang kuliah di tempat yang tepat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote size={22} className="text-blue-200 mb-3 fill-blue-100" />
              <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.school}</p>
                  <Stars count={t.stars} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ────────────────────────────────────────────────────── */
function PricingSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="harga" ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            Harga
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Harga Lebih Murah dari Biaya Salah Jurusan
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-base">
            Bayangkan bikin keputusan besar — kuliah 4 tahun — tanpa informasi yang cukup. Kami bantu kamu memastikan pilihanmu tepat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PRICING.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-700 ${
                plan.highlight
                  ? "bg-blue-600 border-2 border-blue-500 shadow-xl shadow-blue-200"
                  : "bg-white border border-slate-100 shadow-sm"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-900 text-xs font-extrabold px-4 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-3xl font-extrabold tracking-tight ${plan.highlight ? "text-white" : "text-slate-800"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${plan.highlight ? "text-blue-100" : "text-slate-500"}`}>{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2
                      size={15}
                      className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-blue-200" : "text-emerald-500"}`}
                    />
                    <span className={`text-sm ${plan.highlight ? "text-blue-50" : "text-slate-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA Section ──────────────────────────────────────────────────── */
function CtaSection() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      className={`py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 relative overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Decorative circles */}
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/30 blur-2xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-800/50 blur-2xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Trophy icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
          <Trophy size={28} className="text-amber-400 fill-amber-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
          Satu Keputusan yang Mengubah{" "}
          <span className="text-amber-300">4 Tahun ke Depan</span>
        </h2>
        <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Ribuan siswa SMA sudah mulai perjalanannya di Jurusanku hari ini. Kapan giliranmu? Asesmen pertama gratis, tanpa syarat, tanpa kartu kredit.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-blue-700 text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
            Mulai Asesmen Gratis
            <ArrowRight size={16} />
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
            Lihat Demo
            <BookOpen size={16} />
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-blue-200 text-xs font-semibold">
          <span className="flex items-center gap-1.5"><Shield size={13} /> Gratis untuk mulai</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={13} /> Tanpa kartu kredit</span>
          <span className="flex items-center gap-1.5"><Star size={13} className="fill-blue-300 text-blue-300" /> Rating 4.9/5</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" /><path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">
              Jurusan<span className="text-blue-400">ku</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-center">
            © {new Date().getFullYear()} Jurusanku. Hak Cipta Dilindungi.
          </p>

          {/* Links */}
          <div className="flex items-center gap-5 text-xs">
            {["Tentang Kami", "Kebijakan Privasi", "Syarat & Ketentuan", "Bantuan"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors duration-200">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root Component ─────────────────────────────────────────────────────── */
export default function LandingPage() {
  useMontserrat();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
