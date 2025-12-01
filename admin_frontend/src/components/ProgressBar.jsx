import React from "react";

export default function ProgressBar({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full h-2 rounded-full bg-[#2a2a2a] overflow-hidden">
      <div
        className="h-full bg-[#e2e600] rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}