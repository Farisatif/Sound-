import '../../../../index.css'
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
import { useState, useEffect } from "react";

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  // إغلاق السايدبار عند الضغط برة
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const hamburger = document.getElementById('hamburger-button');
      if (isOpen && sidebar && !sidebar.contains(event.target as Node) &&
          hamburger && !hamburger.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // إغلاق السايدبار عند تغيير الصفحة
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="w-full h-full absolute pb-16"> {/* margin-bottom */}
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-1 pb-1 border-b-2 transition ${
                  isActive(item.path)
                    ? "border-[#ee0faf] text-[#ee0faf]"
                    : "border-transparent text-white hover:text-[#ee0faf] hover:border-[#ee0faf]"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition"
                title="Logout"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Hamburger */}
          <button
            id="hamburger-button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#ee0faf]/70 text-white shadow-lg hover:bg-[#ee0faf]/90 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XIcon className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.nav
        id="mobile-sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: isOpen ? 0 : -300,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.45 }}
        className="sidebar-scroll flex flex-col w-[280px] sm:w-[320px] items-start gap-4 px-4 pt-4 pb-6
                   bg-[#0e010b] border-r-2 border-[#ee0faf] shadow-[8px_0px_24.2px_#ee0faf26]
                   fixed left-0 top-14 h-[calc(100vh-56px)] z-50 overflow-y-auto"
      >
        {user && (
          <div className="w-full p-3 bg-[#ee0faf]/10 rounded-lg border border-[#ee0faf]/20">
            <p className="text-white text-sm">Welcome back,</p>
            <p className="text-[#ee0faf] font-medium truncate">{user.name}</p>
          </div>
        )}

        {/* Menu */}
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="w-full">
            <Button
              variant="ghost"
              className={`flex items-center gap-3 w-full justify-start h-11 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-[#ee0faf]/20 text-[#ee0faf] border-b-2 border-[#ee0faf]"
                  : "text-white hover:bg-[#ee0faf]/10"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          </Link>
        ))}

        {/* Library */}
        {libraryItems.map((item) => (
          <Link key={item.path} to={item.path} className="w-full">
            <Button
              variant="ghost"
              className={`flex items-center gap-3 w-full justify-start h-11 px-3 py-2 rounded-lg ${
                isActive(item.path)
                  ? "bg-[#ee0faf]/20 text-[#ee0faf] border-b-2 border-[#ee0faf]"
                  : "text-white hover:bg-[#ee0faf]/10"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          </Link>
        ))}

        {/* Playlists */}
        {playlistItems.map((item) => (
          <Link key={item.path} to={item.path} className="w-full">
            <Button
              variant="ghost"
              className={`flex items-center gap-3 w-full justify-start h-11 px-3 py-2 rounded-lg ${
                isActive(item.path)
                  ? "bg-[#ee0faf]/20 text-[#ee0faf] border-b-2 border-[#ee0faf]"
                  : "text-white hover:bg-[#ee0faf]/10"
              }`}
            >
              {item.icon}
              <span
                className={`text-sm font-medium ${
                  item.isSpecial ? "text-[#0d9eef]" : ""
                }`}
              >
                {item.label}
                {item.label === "Favorites" && favorites.length > 0 && (
                  <span className="ml-2 bg-[#ee0faf] text-white text-xs px-2 py-1 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </span>
            </Button>
          </Link>
        ))}

        {/* Logout */}
        {user && (
          <div className="mt-auto w-full pt-4 border-t border-[#ee0faf]/20">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center gap-3 w-full justify-start h-11 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </Button>
          </div>
        )}
      </motion.nav>
    </div>
  );
};
