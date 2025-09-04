import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  PauseIcon, 
  SkipBackIcon, 
  SkipForwardIcon, 
  VolumeXIcon, 
  Volume1Icon, 
  Volume2Icon,
  HeartIcon,
  RepeatIcon,
  ShuffleIcon,
  MinimizeIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { useMusicPlayer } from '../../context/MusicPlayerContext';
import { useFavorites } from '../../context/FavoritesContext';

export const MusicPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlayPause,
    nextSong,
    previousSong,
    setVolume,
    seekTo,
  } = useMusicPlayer();

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  if (!currentSong) return null;

  const isFavorite = favorites.some(fav => fav.id === currentSong.id);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(currentSong.id);
    } else {
      addToFavorites(currentSong);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeXIcon className="w-4 h-4" />;
    if (volume < 0.5) return <Volume1Icon className="w-4 h-4" />;
    return <Volume2Icon className="w-4 h-4" />;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#ee0faf]/20 backdrop-blur-lg z-50"
      >
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-700">
          <motion.div
            className="h-full bg-[#ee0faf]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          {/* Song Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1 lg:flex-initial lg:w-80">
            <motion.img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium text-sm sm:text-base truncate">
                {currentSong.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm truncate">
                {currentSong.artist}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteToggle}
              className={`p-2 ${isFavorite ? 'text-[#ee0faf]' : 'text-gray-400'} hover:text-[#ee0faf] transition-colors`}
            >
              <HeartIcon className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white transition-colors hidden sm:flex"
              >
                <ShuffleIcon className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={previousSong}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipBackIcon className="w-5 h-5" />
              </Button>

              <Button
                onClick={togglePlayPause}
                className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextSong}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipForwardIcon className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white transition-colors hidden sm:flex"
              >
                <RepeatIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar with Time */}
            <div className="hidden sm:flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-gray-400 min-w-[35px]">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={(value) => seekTo(value[0])}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 min-w-[35px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden lg:flex items-center gap-2 w-80 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {getVolumeIcon()}
            </Button>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="w-24"
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MinimizeIcon className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Volume */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {getVolumeIcon()}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

