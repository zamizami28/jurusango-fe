import Sidebar from "./Sidebar";

/**
 * Layout wraps every page.
 * ┌──────────┬──────────────────────────────┐
 * │ Sidebar  │     Main content (scrollable) │
 * │ (fixed)  │                              │
 * └──────────┴──────────────────────────────┘
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-blue-100/60 flex">
      {/* Fixed left sidebar — 224px (w-56) */}
      <Sidebar />

      {/* Main scrollable area offset by sidebar width */}
      <main className="ml-56 flex-1 min-h-screen overflow-y-auto">
        <div className="p-6 max-w-[1200px]">{children}</div>
      </main>
    </div>
  );
}
