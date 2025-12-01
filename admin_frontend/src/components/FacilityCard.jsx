import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function FacilityCard({ facility }) {
  const { id, name, revenueLKR, capacityPct = 0, status = "Active" } = facility;
  
  return (
    <Link
      to={`/admin/${id}`}
      className="group block bg-[#171717] rounded-2xl p-6 border border-[#232323] hover:border-[#e2e600]/50 transition"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl text-white font-semibold">{name}</h3>
          <p className="text-xs text-gray-500 mt-1">ID #{String(id).padStart(3, "0")}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${status==='Active' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
          {status}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Capacity</span>
          <span>{capacityPct}%</span>
        </div>
        <ProgressBar value={capacityPct} />
      </div>

      <div className="mt-6 pt-4 border-t border-[#232323] flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-500">Revenue (Today)</p>
          <p className="text-[#e2e600] font-medium mt-1">LKR {revenueLKR.toLocaleString()}</p>
        </div>
        <span className="text-gray-600 group-hover:text-white transition">View →</span>
      </div>
    </Link>
  );
}