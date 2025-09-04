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
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

const menuItems = [
  {
    icon: HomeIcon,
    label: "Home",
    isActive: true,
  },
  {
    icon: CompassIcon,
    label: "Discover",
    isActive: false,
  },
  {
    icon: AlbumIcon,
    label: "Albums",
    isActive: false,
  },
  {
    icon: UserIcon,
    label: "Artists",
    isActive: false,
  },
];

const libraryItems = [
  {
    icon: ClockIcon,
    label: "Recently Added",
    isActive: false,
  },
  {
    icon: TrendingUpIcon,
    label: "Most played",
    isActive: false,
  },
];

const playlistItems = [
  {
    icon: HeartIcon,
    label: "Your favorites",
    isActive: false,
  },
  {
    icon: ListIcon,
    label: "Your playlist",
    isActive: false,
  },
  {
    icon: PlusIcon,
    label: "Add playlist",
    isActive: false,
    isSpecial: true,
  },
];

export const SignUpSection = (): JSX.Element => {
  return (
    <nav className="flex flex-col w-full items-start gap-6 pl-16 pr-8 pt-12 pb-12 bg-[#0e010b] border-r-2 [border-right-style:solid] border-[#ee0faf] shadow-[8px_0px_24.2px_#ee0faf26] min-h-screen">
      <img
        className="relative w-[62px] h-[60px] object-cover"
        alt="Picsart"
        src="https://c.animaapp.com/mecj8w01EfvOiv/img/picsart-25-08-07-15-22-00-238--1--1.png"
      />

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <h1 className="bg-[linear-gradient(91deg,rgba(238,16,176,1)_0%,rgba(14,158,239,0.92)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] relative flex-1 mt-[-1.00px] font-h1 font-[number:var(--h1-font-weight)] text-transparent leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
          SoundBast
        </h1>
      </div>

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
          Menu
        </div>
      </div>

      <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        {menuItems.map((item, index) => (
          <div
            key={`menu-${index}`}
            className={`flex flex-col h-10 items-start justify-center gap-2 px-2 py-0.5 relative self-stretch w-full rounded-[9px] ${item.isActive ? "bg-[#ee0faf]" : ""}`}
          >
            <Button
              variant="ghost"
              className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] h-auto p-0 hover:bg-transparent"
            >
              <item.icon className="relative w-4 h-4 text-white" />
              <span className="flex-1 h-7 font-[number:var(--h3-font-weight)] text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] relative mt-[-1.00px] font-h3 text-white leading-[var(--h3-line-height)] [font-style:var(--h3-font-style)] text-left">
                {item.label}
              </span>
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
          Library
        </div>
      </div>

      {libraryItems.map((item, index) => (
        <Button
          key={`library-${index}`}
          variant="ghost"
          className="gap-2 flex items-center relative self-stretch w-full flex-[0_0_auto] h-auto p-0 hover:bg-transparent justify-start"
        >
          <item.icon className="relative w-4 h-4 text-white" />
          <span className="relative flex-1 h-[22px] mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-left">
            {item.label}
          </span>
        </Button>
      ))}

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
          Playlist and favorite
        </div>
      </div>

      {playlistItems.map((item, index) => (
        <Button
          key={`playlist-${index}`}
          variant="ghost"
          className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] h-auto p-0 hover:bg-transparent justify-start"
        >
          <item.icon className="relative w-4 h-4 text-white" />
          <span
            className={`relative flex-1 h-[23px] mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-left ${item.isSpecial ? "text-[#0d9eef]" : "text-white"}`}
          >
            {item.label}
          </span>
        </Button>
      ))}
    </nav>
  );
};
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 w-full"
        >
          <img
            className="w-12 h-12 object-cover rounded-lg"
            alt="SoundBlast Logo"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/picsart-25-08-07-15-22-00-238--1--1.png"
          />
          <Link to="/" className="flex-1">
            <h1 className="bg-gradient-to-r from-[#ee10b0] to-[#0e9eef] bg-clip-text text-transparent text-xl font-bold hover:scale-105 transition-transform duration-200">
              SoundBlast
            </h1>
          </Link>
        </motion.div>

        {/* User Welcome */}
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

        {/* Menu */}
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

        {/* Library */}
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

        {/* Playlist */}
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

        {/* Logout */}
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
