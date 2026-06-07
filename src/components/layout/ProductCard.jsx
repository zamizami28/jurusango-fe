/**
 * ProductCard.jsx
 *
 * Props:
 *  - icon        {string}  emoji or icon character
 *  - title       {string}  product name
 *  - description {string}  short description
 *  - price       {string}  formatted price string e.g. "Rp 25.000"
 *  - priceSuffix {string?} optional suffix e.g. "/bulan"
 *  - type        {string}  "langganan" | "asesmen" | "tryout"
 *  - features    {string[]} optional bullet list (for langganan cards)
 *  - featured    {boolean} render a subtle highlight ring for premium cards
 */

export default function ProductCard({
  icon,
  title,
  description,
  price,
  priceSuffix = "",
  type = "asesmen",
  features = [],
  featured = false,
}) {
  const isSubscription = type === "langganan";
  const buttonLabel = isSubscription ? "Berlangganan" : "Beli Sekarang";

  return (
    <div
      className={[
        "bg-white rounded-2xl border transition-all duration-200 flex flex-col h-full",
        "hover:shadow-md hover:-translate-y-0.5",
        featured ? "border-slate-300 shadow-sm" : "border-slate-100 shadow-sm",
      ].join(" ")}
    >
      {/* ── Card Body ── */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Icon + Price row */}
        <div className="flex items-start justify-between mb-3">
          <span
            className={[
              "flex items-center justify-center rounded-xl text-3xl",
              isSubscription
                ? "w-10 h-10 bg-amber-50"
                : "w-10 h-10 bg-slate-50",
            ].join(" ")}
            role="img"
            aria-label={title}
          >
            {icon}
          </span>

          <div className="text-right">
            <span className="text-lg font-extrabold text-[#4585AC] leading-none tracking-tight">
              {price}
            </span>
            {priceSuffix && (
              <span className="text-sm font-semibold text-[#8E969B]">
                {priceSuffix}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={[
            "font-extrabold text-[#25485E] leading-snug mb-1 text-xl",
          ].join(" ")}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-slate-400 leading-relaxed mb-3 flex-1">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-1.5 text-base text-slate-500"
              >
                <span className="text-emerald-500 font-bold mt-px leading-tight">
                  ✓
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── CTA Button ── */}
      <div className="px-5 pb-5">
        <button
          className={[
            "w-full py-2.5 rounded-xl text-base font-bold tracking-wide",
            "transition-all duration-150 active:scale-[0.98]",
            "bg-linear-to-r from-[#3E799E] to-[#284E65] hover:bg-slate-800 text-white",
          ].join(" ")}
          onClick={() => alert(`Membeli: ${title}`)}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
