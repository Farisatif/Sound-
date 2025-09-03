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
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../context/AuthContext";
import { useFavorites } from "../../../../context/FavoritesContext";
import { useState } from "react";

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

  return (
    <>
      {/* Hamburger for small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#ee0faf] rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <motion.nav 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`sidebar-scroll flex flex-col w-full max-w-[30%] lg:max-w-[320px] items-start gap-6 pl-4 lg:pl-16 pr-4 lg:pr-8 pt-12 pb-12 bg-[#0e010b] border-r-2 [border-right-style:solid] border-[#ee0faf] shadow-[8px_0px_24.2px_#ee0faf26] h-screen fixed top-0 z-50 overflow-y-auto
          ${isOpen ? "left-0" : "-left-full"} transition-all duration-300 lg:left-0`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            className="w-[4rem] h-[4rem] object-cover"
            alt="Picsart"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/picsart-25-08-07-15-22-00-238--1--1.png"
          />
        </motion.div>

        <motion.div 
          className="flex items-center gap-2.5 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/" className="flex-1">
            <h1 className="bg-[linear-gradient(91deg,rgba(238,16,176,1)_0%,rgba(14,158,239,0.92)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-[length:var(--h2-font-size)] tracking-[var(--h1-letter-spacing)] flex-1 mt-[-1.00px] font-h1 font-[number:var(--h2-font-weight)] text-transparent leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)] hover:scale-105 transition-transform duration-200">
              SoundBlast
            </h1>
          </Link>
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full p-3 bg-[#ee0fa]/10 rounded-lg border border-[#ee0faf]/20"
          >
            <p className="text-white text-sm">Welcome back,</p>
            <p className="text-[#ee0faf] font-medium truncate">{user.name}</p>
          </motion.div>
        )}

        {/* Menu Section */}
        <div className="flex items-center gap-2.5 w-full">
          <div className="w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
            Menu
          </div>
        </div>

        <motion.div 
          className="flex flex-col items-start gap-2.5 w-full"
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
                  className={`flex h-10 items-center justify-start gap-2 px-2 py-0.5 w-full transition-all duration-200 hover:scale-105 ${
                    isActive(item.path)
                      ? "bg-[#ee0faf] hover:bg-[#ee0faf] rounded-[9px]"
                      : "bg-transparent hover:bg-[#ee0faf]/10"
                  }`}
                >
                  {item.label === "Home" ? (
                    <img
                      className="w-[25.5px] h-[25.5px] ml-[-0.75px]"
                      alt="Group"
                      src="https://c.animaapp.com/mecm5afmnFTEcQ/img/group.png"
                    />
                  ) : (
                    item.icon
                  )}
                  <span className={`flex-1 h-7 font-[number:var(--h3-font-weight)] text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] mt-[-1.00px] font-h3 leading-[var(--h3-line-height)] [font-style:var(--h3-font-style)] text-left text-white`}>
                    {item.label}
                  </span>
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Library & Playlist Sections */}
        <div className="flex flex-col gap-1.5 w-full">
          {/* Library */}
          <div className="mt-4 flex items-center gap-2.5 w-full">
            <div className="w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
              Library
            </div>
          </div>
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
                  className="gap-2 flex items-center w-full justify-start bg-transparent hover:bg-[#ee0faf]/10 h-auto p-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  {item.icon}
                  <span className="flex-1 h-[23px] mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-left">
                    {item.label}
                  </span>
                </Button>
              </Link>
            </motion.div>
          ))}

          {/* Playlist */}
          <div className="mt-4 flex items-center gap-2.5 w-full">
            <div className="w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
              Playlist and favorite
            </div>
          </div>
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
                  className="flex items-center gap-2 w-full justify-start bg-transparent hover:bg-[#ee0faf]/10 h-auto p-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  {item.icon}
                  <span className={`flex-1 h-[23px] mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-left ${item.isSpecial ? "text-[#0d9eef]" : "text-white"}`}>
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

        {/* Logout */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-auto w-full"
          >
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center gap-2 w-full justify-start bg-transparent hover:bg-red-500/10 h-auto p-2 rounded-lg transition-all duration-200 hover:scale-105 text-red-400 hover:text-red-300"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="flex-1 h-[23px] mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-left">
                Logout
              </span>
            </Button>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};
