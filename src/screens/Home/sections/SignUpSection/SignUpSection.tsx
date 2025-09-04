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
  { icon: <ClockIcon className="w-4 h-4" />, label: "Recently Added", isActive: false },
  { icon: <TrendingUpIcon className="w-4 h-4" />, label: "Most played", isActive: false },
];

const playlistItems = [
  { icon: <HeartIcon className="w-4 h-4" />, label: "Your favorites", isActive: false },
  { icon: <ListIcon className="w-4 h-4" />, label: "Your playlist", isActive: false },
  { icon: <PlusIcon className="w-4 h-4" />, label: "Add playlist", isActive: false, isSpecial: true },
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

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const hamburger = document.getElementById('hamburger-button');
      
      if (isOpen && sidebar && !sidebar.contains(event.target as Node) && 
          hamburger && !hamburger.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        id="hamburger-button"
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#ee0faf] rounded-lg text-white shadow-lg hover:bg-[#ee0faf]/90 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
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

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.nav 
        id="mobile-sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
        }}
        transition={{ duration: 0.6 }}
        className={`sidebar-scroll flex flex-col w-[280px] sm:w-[320px] lg:w-[320px] items-start gap-4 lg:gap-6 px-4 lg:px-8 pt-16 lg:pt-12 pb-6 lg:pb-12 bg-[#0e010b] border-r-2 [border-right-style:solid] border-[#ee0faf] shadow-[8px_0px_24.2px_#ee0faf26] h-screen fixed top-0 z-40 overflow-y-auto
          ${isOpen ? "left-0" : "-left-full"} lg:left-0 transition-all duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 w-full"
        >
          <img
            className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg"
            alt="SoundBlast Logo"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/picsart-25-08-07-15-22-00-238--1--1.png"
          />
          <Link to="/" className="flex-1">
            <h1 className="bg-[linear-gradient(91deg,rgba(238,16,176,1)_0%,rgba(14,158,239,0.92)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] text-xl lg:text-2xl font-bold hover:scale-105 transition-transform duration-200">
              SoundBlast
            </h1>
          </Link>
        </motion.div>

        {/* User Welcome Section */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full p-3 bg-[#ee0faf]/10 rounded-lg border border-[#ee0faf]/20"
          >
            <p className="text-white text-sm">Welcome back,</p>
            <p className="text-[#ee0faf] font-medium truncate">{user.name}</p>
          </motion.div>
        )}

        {/* Menu Section */}
        <div className="w-full">
          <div className="flex items-center gap-2.5 w-full mb-3">
            <div className="text-xs font-medium opacity-60 text-[#ee0faf] uppercase tracking-wider">
              Menu
            </div>
          </div>

          <motion.div 
            className="flex flex-col items-start gap-1 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                className="w-full"
              >
                <Link to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`flex h-11 items-center justify-start gap-3 px-3 py-2 w-full transition-all duration-200 hover:scale-[1.02] ${
                      isActive(item.path)
                        ? "bg-[#ee0faf] hover:bg-[#ee0faf]/90 rounded-lg text-white"
                        : "bg-transparent hover:bg-[#ee0faf]/10 text-white hover:text-white"
                    }`}
                  >
                    {item.label === "Home" ? (
                      <img
                        className="w-5 h-5"
                        alt="Home"
                        src="https://c.animaapp.com/mecm5afmnFTEcQ/img/group.png"
                      />
                    ) : (
                      item.icon
                    )}
                    <span className="flex-1 text-sm font-medium text-left">
                      {item.label}
                    </span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Library Section */}
        <div className="w-full">
          <div className="flex items-center gap-2.5 w-full mb-3">
            <div className="text-xs font-medium opacity-60 text-[#ee0faf] uppercase tracking-wider">
              Library
            </div>
          </div>
          
          <div className="flex flex-col gap-1 w-full">
            {libraryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
              >
                <Link to={`/${item.label.toLowerCase().replace(' ', '-')}`}>
                  <Button
                    variant="ghost"
                    className="gap-3 flex items-center w-full justify-start bg-transparent hover:bg-[#ee0faf]/10 h-11 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02] text-white hover:text-white"
                  >
                    {item.icon}
                    <span className="flex-1 text-sm font-medium text-left">
                      {item.label}
                    </span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Playlist Section */}
        <div className="w-full">
          <div className="flex items-center gap-2.5 w-full mb-3">
            <div className="text-xs font-medium opacity-60 text-[#ee0faf] uppercase tracking-wider">
              Playlist & Favorites
            </div>
          </div>
          
          <div className="flex flex-col gap-1 w-full">
            {playlistItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
              >
                <Link to={
                  item.label === "Your favorites" ? "/favorites" :
                  item.label === "Your playlist" ? "/playlists" :
                  item.label === "Add playlist" ? "/playlists" : "#"
                }>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 w-full justify-start bg-transparent hover:bg-[#ee0faf]/10 h-11 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  >
                    {item.icon}
                    <span className={`flex-1 text-sm font-medium text-left ${item.isSpecial ? "text-[#0d9eef]" : "text-white"}`}>
                      {item.label}
                      {item.label === "Your favorites" && favorites.length > 0 && (
                        <span className="ml-2 bg-[#ee0faf] text-white text-xs px-2 py-1 rounded-full">
                          {favorites.length}
                        </span>
                      )}
                    </span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-auto w-full pt-4 border-t border-[#ee0faf]/20"
          >
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center gap-3 w-full justify-start bg-transparent hover:bg-red-500/10 h-11 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02] text-red-400 hover:text-red-300"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="flex-1 text-sm font-medium text-left">
                Logout
              </span>
            </Button>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};
