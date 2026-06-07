import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-blue-100/60 flex">
      {/* Fixed left sidebar — 240px (w-60) */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main scrollable area offset by sidebar width */}
      <main
        className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? "ml-70" : "ml-50"
        }`}
      >
        <div className="p-6 max-w-340">{children}</div>
      </main>
    </div>
  );
}
