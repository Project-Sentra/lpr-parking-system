import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// [අවධානයට]: මෙම පරිසරයේ පින්තූර නොමැති නිසා පහත import එක comment කර ඇත.
// ඔබේ VS Code හිදී පහත පේළිය uncomment කරන්න.
import LogoMain from "../assets/logo_notext.png";

// [අවධානයට]: ඉහත import එක uncomment කළ පසු, මෙම තාවකාලික පේළිය මකා දමන්න.
//const LogoMain = "";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const linkCls = ({ isActive }) =>
    "px-3 py-2 rounded-md text-sm font-medium " +
    (isActive ? "text-black bg-sentraYellow" : "text-gray-300 hover:text-white hover:bg-[#1b1b1b]");

  return (
    <header className="sticky top-0 z-40 border-b border-[#232323] bg-[#121212]/80 backdrop-blur supports-backdrop-filter:bg-[#121212]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white font-semibold">
            <img src={LogoMain} alt="Sentra" className="w-8 h-8" />
            <span className="text-xl">Sentra</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/admin" className={linkCls}>Facilities</NavLink>
            
            {!isLoggedIn ? (
              <>
                <NavLink to="/signin" className={linkCls}>Sign in</NavLink>
                <NavLink to="/signup" className={linkCls}>Sign up</NavLink>
              </>
            ) : (
              <button 
                onClick={handleLogout} 
                className="px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-[#1b1b1b]"
              >
                Logout
              </button>
            )}
          </nav>

          <button
            className="md:hidden w-10 h-10 grid place-items-center rounded-md text-gray-300 hover:text-white hover:bg-[#1b1b1b]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#232323] bg-[#121212]">
          <div className="px-4 py-3 flex flex-col">
            <NavLink to="/admin" className={({isActive}) => "py-2 " + (isActive?"text-sentraYellow":"text-gray-300")} onClick={() => setOpen(false)}>Facilities</NavLink>
            
            {!isLoggedIn ? (
              <>
                <NavLink to="/signin" className={({isActive}) => "py-2 " + (isActive?"text-sentraYellow":"text-gray-300")} onClick={() => setOpen(false)}>Sign in</NavLink>
                <NavLink to="/signup" className={({isActive}) => "py-2 " + (isActive?"text-sentraYellow":"text-gray-300")} onClick={() => setOpen(false)}>Sign up</NavLink>
              </>
            ) : (
              <button onClick={() => { handleLogout(); setOpen(false); }} className="py-2 text-left text-red-400">Logout</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}