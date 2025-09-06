// ==============================
// SignUpSection_with_visitors.tsx
// (React component - مدمج مع عداد الزوار)
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

export const SignUpSection = (): JSX.Element => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // -----------------------------
  // Visitor counter (localStorage, increment once per load)
  // -----------------------------
  const [visitors, setVisitors] = useState<number>(() => {
    const saved = localStorage.getItem("visitors");
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    const newCount = visitors + 1;
    setVisitors(newCount);
    localStorage.setItem("visitors", newCount.toString());
  }, []); // runs only once

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
            className="flex items-center gap-3"
          >
            <img
              className="w-10 h-10 object-cover rounded-lg"
              alt="SoundBlast Logo"
              src="https://c.animaapp.com/mecm5afmnFTEcQ/img/picsart-25-08-07-15-22-00-238--1--1.png"
            />
            <Link to="/" className="block">
              <h1 className="bg-gradient-to-r from-[#ee10b0] to-[#0e9eef] bg-clip-text text-transparent text-lg sm:text-xl font-bold hover:scale-105 transition-transform duration-200">
                SoundBlast
              </h1>
            </Link>
          </motion.div>

          {/* Center Icons */}
          <nav className="hidden md:flex items-center justify-center gap-4 flex-1">
            {[...libraryItems, ...playlistItems, ...menuItems].map((item) => (
              <div key={item.path} className="relative group flex flex-col items-center">
                <Link to={item.path}>
                  <div className={`w-10 h-10 flex items-center justify-center text-white bg-[#1a0b22] rounded-full transition duration-300 group-hover:translate-y-[-4px] hover:bg-[#ee0faf]/20 ${isActive(item.path) ? "border-b-2 border-[#ee0faf]" : ""}`}>
                    {item.icon}
                  </div>
                </Link>
                <span className="absolute top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs whitespace-nowrap text-center">
                  {item.label}
                  {item.label === "Favorites" && favorites.length > 0 && (
                    <span className="ml-1 bg-[#ee0faf] text-white text-[10px] px-1 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
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
                    className="h-8 sm:h-9 bg-transparent border-[#ee0faf] text-[#ee0faf] hover:bg-[#ee0faf]/10 text-xs sm:text-sm transition-all duration-200 px-3 sm:px-4"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="h-8 sm:h-9 bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white text-xs sm:text-sm transition-all duration-200 px-3 sm:px-4"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center gap-2 h-9 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
