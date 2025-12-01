import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";

export default function Sidebar({ facilityName = "Downtown Parking" }) {
  const { facilityId } = useParams();
  // Default to ID 1 if not present
  const fId = facilityId || 1;
  const linkBase = `/admin/${fId}`;
  
  const linkClass = ({ isActive }) =>
    "block px-4 py-2 rounded-md mt-2 transition " +
    (isActive
      ? "bg-[#e2e600] text-black font-semibold"
      : "text-gray-400 hover:text-white hover:bg-[#1f1f1f]");

  return (
    <aside className="w-64 shrink-0 bg-[#121212] border-r border-[#232323] flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link to="/admin" className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#1e1e1e] text-gray-400 hover:text-white mb-6">
          ←
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center text-[#e2e600] font-bold">
            A
          </div>
          <div className="text-sm text-gray-300">Admin One</div>
        </div>

        <h2 className="text-2xl font-bold text-white leading-tight">
          {facilityName}
        </h2>

        <nav className="mt-8 space-y-1">
          <NavLink to={linkBase} end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to={`${linkBase}/inout`} className={linkClass}>
            In & Out
          </NavLink>
          <NavLink to={`${linkBase}/live`} className={linkClass}>
            Live feed
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-[#232323]">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition">
          <span>⚙️</span> Settings
        </button>
      </div>
    </aside>
  );
}