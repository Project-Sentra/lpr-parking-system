import React from "react";

export default function CameraTile({ title = "Cam 01" }) {
  return (
    <div className="relative rounded-xl bg-[#161616] border border-[#232323] h-48 flex items-center justify-center overflow-hidden group">
      <div className="absolute top-3 left-3 bg-black/50 px-2 py-1 rounded text-xs text-white z-10">
        {title}
      </div>
      <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full animate-pulse z-10"></div>
      
      {/* Placeholder for video stream */}
      <div className="text-gray-600 group-hover:text-gray-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
          <circle cx="12" cy="13" r="3"/>
        </svg>
      </div>
    </div>
  );
}