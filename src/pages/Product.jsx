import { useState } from "react";
import ProductCard from "../components/layout/ProductCard";

// ─── Dummy Product Data ────────────────────────────────────────────────────────

const PRODUCTS = [
  // ── Langganan ──────────────────────────────────────────────────────────────
  {
    id: "premium-monthly",
    type: "langganan",
    icon: "⭐",
    title: "Premium Plan - 1 Bulan",
    description: [],
    price: "Rp 49.000",
    priceSuffix: "/bulan",
    features: [
      "Akses unlimited semua fitur premium",
      "Tryout SNBT lengkap",
      "Assessment jurusan tanpa batas",
    ],
    featured: true,
    order: 1,
  },
  {
    id: "premium-yearly",
    type: "langganan",
    icon: "⭐",
    title: "Premium Plan - 1 Tahun",
    description: [],
    price: "Rp 470.400",
    priceSuffix: "",
    features: [
      "Akses unlimited semua fitur premium",
      "Tryout SNBT lengkap",
      "Asesmen urusan tanpa batas",
    ],
    featured: true,
    order: 2,
  },

  // ── Asesmen Jurusan ────────────────────────────────────────────────────────
  {
    id: "asesmen-manajemen",
    type: "asesmen",
    icon: "💼",
    title: "Asesmen Manajemen",
    description: "Quest premium Manajemen.",
    price: "Rp 25.000",
    priceSuffix: "",
    features: [],
    featured: false,
    order: 3,
  },
  {
    id: "asesmen-kedokteran",
    type: "asesmen",
    icon: "🩺",
    title: "Asesmen Kedokteran",
    description: "Quest premium kedokteran.",
    price: "Rp 25.000",
    priceSuffix: "",
    features: [],
    featured: false,
    order: 4,
  },
  {
    id: "asesmen-hub-internasional",
    type: "asesmen",
    icon: "🌐",
    title: "Asesmen Hubungan Internasional",
    description: "Quest premium Hubungan Internasional.",
    price: "Rp 25.000",
    priceSuffix: "",
    features: [],
    featured: false,
    order: 5,
  },
  {
    id: "asesmen-ilmu-komunikasi",
    type: "asesmen",
    icon: "📄",
    title: "Asesmen Ilmu Komunikasi",
    description: "Quest premium Ilmu Komunikasi.",
    price: "Rp 25.000",
    priceSuffix: "",
    features: [],
    featured: false,
    order: 6,
  },
  {
    id: "asesmen-ilmu-hukum",
    type: "asesmen",
    icon: "🏛️",
    title: "Asesmen Ilmu Hukum",
    description: "Quest premium Ilmu Hukum.",
    price: "Rp 25.000",
    priceSuffix: "",
    features: [],
    featured: false,
    order: 7,
  },

  // ── Try Out SNBT ───────────────────────────────────────────────────────────
  {
    id: "tryout-oktober",
    type: "tryout",
    icon: "📖",
    title: "2x Paket Try Out SNBT Bulan Oktober",
    description:
      "Satu kali akses tryout SNBT lengkap dengan pembahasan detail dan analisis performa.",
    price: "Rp 35.000",
    priceSuffix: "",
    features: [],
    featured: false,
    order: 8,
  },
  {
    id: "tryout-april",
    type: "tryout",
    icon: "📖",
    title: "2x Paket Try Out SNBT Bulan April",
    description:
      "Satu kali akses tryout SNBT lengkap dengan pembahasan detail dan analisis performa.",
    price: "Rp 35.000",
    priceSuffix: "",
    features: [],
    featured: false,
    order: 9,
  },
];

// ─── Tab Definitions ───────────────────────────────────────────────────────────

const TABS = [
  { id: "all", label: "Semua Produk" },
  { id: "langganan", label: "Langganan" },
  { id: "asesmen", label: "Asesmen Jurusan" },
  { id: "tryout", label: "Try Out SNBT" },
];

// ─── Helper: filter products by active tab ─────────────────────────────────────

function filterProducts(tab) {
  if (tab === "all") return [...PRODUCTS].sort((a, b) => a.order - b.order);
  return PRODUCTS.filter((p) => p.type === tab).sort(
    (a, b) => a.order - b.order,
  );
}

// ─── Grid wrapper ──────────────────────────────────────────────────────────────
function ProductGrid({ tab, items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((p, i) => (
        <div
          key={p.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <ProductCard {...p} />
        </div>
      ))}
    </div>
  );
}

// ─── Product Page ──────────────────────────────────────────────────────────────

export default function Product() {
  const [activeTab, setActiveTab] = useState("all");

  const visibleProducts = filterProducts(activeTab);

  return (
    <div className="pb-8">
      {/* ── Tab Navigation ── */}
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                isActive
                  ? "bg-[#4585AC] text-white shadow-md shadow-slate-200 scale-[1.03]"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:shadow-sm",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Product Grid ── */}
      <ProductGrid tab={activeTab} items={visibleProducts} />

      {/* Empty state (safety net) */}
      {visibleProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <span className="text-5xl mb-4">📦</span>
          <p className="font-semibold text-slate-500">Produk tidak ditemukan</p>
          <p className="text-sm mt-1">Coba pilih kategori lain</p>
        </div>
      )}
    </div>
  );
}
