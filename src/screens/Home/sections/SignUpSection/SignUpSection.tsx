// ==============================
// SignUpSection_with_visitors.tsx
// ==============================

import '../../../../index.css'
import React, { useState, useEffect } from 'react';
import {
  AlbumIcon,
  ClockIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  ListIcon,
  PlusIcon,
  TrendingUpIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../context/AuthContext";
import { useFavorites } from "../../../../context/FavoritesContext";

const menuItems = [
  { icon: <HomeIcon className="w-4 h-4" />, label: "Home", path: "/" },
  { icon: <CompassIcon className="w-4 h-4" />, label: "Discover", path: "/discover" },
  { icon: <AlbumIcon className="w-4 h-4" />, label: "Albums", path: "/albums" },
  { icon: <UserIcon className="w-4 h-4" />, label: "Artists", path: "/artists" },
];

const libraryItems = [
  { icon: <ClockIcon className="w-4 h-4" />, label: "Recently Added", path: "/recent" },
  { icon: <TrendingUpIcon className="w-4 h-4" />, label: "Most played", path: "/most-played" },
];

const playlistItems = [
  { icon: <HeartIcon className="w-4 h-4" />, label: "Favorites", path: "/favorites" },
  { icon: <ListIcon className="w-4 h-4" />, label: "Playlists", path: "/playlists" },
  { icon: <PlusIcon className="w-4 h-4" />, label: "Add playlist", path: "/playlists/create", isSpecial: true },
];

const extraItems = [
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" }
];

export const SignUpSection = (): JSX.Element => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // visitors counter
  const [visitors, setVisitors] = useState<number>(() => {
    const saved = localStorage.getItem("visitors");
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    const newCount = visitors + 1;
    setVisitors(newCount);
    localStorage.setItem("visitors", newCount.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full h-full absolute pb-16">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-black/95 border-b border-white/10 backdrop-blur z-50">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <img
              className="w-8 h-8 object-cover rounded-lg"
              alt="SoundBlast Logo"
              src="https://c.animaapp.com/mecm5afmnFTEcQ/img/picsart-25-08-07-15-22-00-238--1--1.png"
            />
            <Link to="/" className="block">
              <h3 className="bg-gradient-to-r from-[#ee10b0] to-[#0e9eef] bg-clip-text text-transparent text-sm sm:text-base font-bold hover:scale-105 transition-transform duration-200">
                SoundBlast
              </h3>
            </Link>
          </motion.div>

          {/* Center Icons */}
          <nav className="hidden md:flex items-center justify-center gap-3 flex-1">
            {[...libraryItems, ...playlistItems, ...menuItems].map((item) => (
              <div key={item.path} className="relative group flex flex-col items-center">
                <Link to={item.path}>
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-white bg-[#1a0b22] rounded-full transition duration-300 group-hover:translate-y-[-3px] hover:bg-[#ee0faf]/20 ${
                      isActive(item.path) ? "border-b-2 border-[#ee0faf]" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                </Link>
                <span className="absolute top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] whitespace-nowrap text-center">
                  {item.label}
                  {item.label === "Favorites" && favorites.length > 0 && (
                    <span className="ml-1 bg-[#ee0faf] text-white text-[9px] px-1 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </span>
              </div>
            ))}

            {/* About & Contact */}
            {extraItems.map((item) => (
              <div key={item.path} className="relative group flex flex-col items-center">
                <Link to={item.path}>
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-white bg-[#1a0b22] rounded-full transition duration-300 group-hover:translate-y-[-3px] hover:bg-[#ee0faf]/20 ${
                      isActive(item.path) ? "border-b-2 border-[#ee0faf]" : ""
                    }`}
                  >
                    <span className="text-xs font-bold">{item.label.charAt(0)}</span>
                  </div>
                </Link>
                <span className="absolute top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] whitespace-nowrap text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </nav>

          {/* Right Auth Buttons */}
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 sm:h-8 bg-transparent border-[#ee0faf] text-[#ee0faf] hover:text-white hover:bg-[#ee0faf]/90 text-[11px] sm:text-xs transition-all duration-200 px-2 sm:px-3"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="h-7 sm:h-8 bg-[#ee0faf] hover-border-[#ee0faf] hover:bg-transparent text-white text-[11px] sm:text-xs transition-all duration-200 px-2 sm:px-3"
                  >
                    Sign Up
                  </Button>
                </Link>
                <div className="absolute bg-[#000000]/80 text-white text-[11px] sm:text-xs transition-all duration-200 px-2 sm:px-3 right-[1rem] bottom-[-100%] hover:bg-[#ee0faf]/90 w-9 h-[50px] flex flex-col items-center justify-center rounded-md">
                  <UserIcon className="w-4 h-4" />
                  <p className="bg-gradient-to-r from-[#ee10b0] to-[#0e9eef] bg-clip-text text-transparent text-xs font-bold">
                    {visitors}
                  </p>
                </div>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="hidden md:flex items-center gap-1 h-8 px-2 py-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs"
              >
                <LogOutIcon className="w-3.5 h-3.5" />
                <span className="font-medium">Logout</span>
              </Button>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <div className="flex flex-col items-center gap-1 md:hidden">
            <button
              id="hamburger-button"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#ee0faf]/70 text-white shadow-lg hover:bg-[#ee0faf]/90 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <XIcon className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <MenuIcon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar: starts under header (top-14) so scroll area excludes header */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed mt-[1re] top-14 bottom-0 left-0 w-[50%] max-w-full bg-gradient-to-b from-[#0e0e0e] via-[#1a0b22] to-black/95 z-40 border-r border-white/10 p-4 flex flex-col overflow-y-auto"
              // ensure smooth touch scrolling on mobile
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end mb-2 text-white hover:text-[#ee0faf] transition"
                aria-label="Close sidebar"
              >
                <XIcon className="w-5 h-5" />
              </button>

              {/* Content (scrollable) */}
              <div className="w-full flex-1 space-y-2">
                {[...menuItems, ...libraryItems, ...playlistItems].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-[#ee0faf]/20 transition ${
                      isActive(item.path) ? "bg-[#ee0faf]/30" : ""
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {item.label === "Favorites" && favorites.length > 0 && (
                      <span className="ml-auto bg-[#ee0faf] text-black text-[11px] px-2 py-0.5 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                ))}

                {/* About & Contact */}
                <div className="mt-2 border-t border-white/5 pt-3 space-y-1">
                  {extraItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-[#ee0faf]/20 transition ${
                        isActive(item.path) ? "bg-[#ee0faf]/30" : ""
                      }`}
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer area inside sidebar */}
              <div className="mt-4 pt-2 border-t border-white/5">
                {/* Visitors (optional) */}
                <div className="flex items-center justify-between text-[13px] text-white/80 mb-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Visitors</span>
                  </div>
                  <span className="font-semibold">{visitors}</span>
                </div>

                {/* Logout inside sidebar */}
                {user && (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    variant="ghost"
                    className="w-full flex items-center gap-2 justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
