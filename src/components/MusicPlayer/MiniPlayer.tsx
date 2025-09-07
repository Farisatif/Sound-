
import { motion, AnimatePresence } from "framer-motion";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { PlayIcon, PauseIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MiniPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, playNext } = useMusicPlayer();
  const navigate = useNavigate();

  if (!currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 z-50"
      >
        <div
          onClick={() => navigate(`/player/${currentSong.id}`)}
          className="bg-[#0b0b0b] border border-white/5 rounded-xl shadow-lg p-2 flex items-center gap-3 cursor-pointer"
        >
          <img
            src={currentSong.image ?? "https://via.placeholder.com/80"}
            alt={currentSong.title}
            className="w-12 h-12 rounded-md object-cover"
          />

          <div className="flex-1 min-w-0">
            <div className="text-white truncate font-medium">{currentSong.title}</div>
            <div className="text-white/60 text-sm truncate">{currentSong.artist}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-2 rounded-md bg-white/5"
            >
              {isPlaying ? <PauseIcon className="w-5 h-5 text-white" /> : <PlayIcon className="w-5 h-5 text-white" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playNext();
              }}
              className="p-2 rounded-md bg-white/5"
            >
              {/* next icon simple triangle */}
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
                <path fill="currentColor" d="M6 5v14l11-7zM19 5v14h2V5z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MiniPlayer;

// context/MusicPlayerContext.tsx
import React, { useState, useContext } from "react";

type MusicPlayerContextType = {
  currentSong: any;
  isPlaying: boolean;
  playNext: () => void;
  togglePlay: () => void;
};

export const MusicPlayerContext = React.createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playNext = () => {
    // implementation
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playNext,
        togglePlay,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
