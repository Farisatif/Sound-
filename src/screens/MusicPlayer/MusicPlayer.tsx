import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Slider } from '../../components/ui/slider';
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
  ArrowLeftIcon,
  MoreHorizontalIcon
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSongs } from '../../hooks/useData';
import { useFavorites } from '../../context/FavoritesContext';

export const MusicPlayer: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();
  const { songs, loading } = useSongs();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get all songs from different categories
  const allSongs = [
    ...songs.weeklyTopSongs,
    ...songs.newReleaseSongs,
    ...songs.trendingSongs
  ];

  const currentSong = allSongs.find(song => song.id === parseInt(songId || '1')) || allSongs[0];
  const currentIndex = allSongs.findIndex(song => song.id === currentSong?.id);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const playNext = () => {
    const nextIndex = isShuffle 
      ? Math.floor(Math.random() * allSongs.length)
      : (currentIndex + 1) % allSongs.length;
    navigate(`/player/${allSongs[nextIndex].id}`);
  };

  const playPrevious = () => {
    const prevIndex = isShuffle
      ? Math.floor(Math.random() * allSongs.length)
      : currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1;
    navigate(`/player/${allSongs[prevIndex].id}`);
  };

  const toggleFavorite = () => {
    if (currentSong) {
      if (isFavorite(currentSong.id)) {
        removeFromFavorites(currentSong.id);
      } else {
        addToFavorites(currentSong);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeXIcon className="w-5 h-5" />;
    if (volume < 50) return <Volume1Icon className="w-5 h-5" />;
    return <Volume2Icon className="w-5 h-5" />;
  };

  if (loading || !currentSong) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-full h-full object-cover opacity-20 blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6 flex items-center justify-between"
      >
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="icon"
          className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Button>
        
        <div className="text-center">
          <p className="text-white/70 text-sm">Playing from</p>
          <p className="text-white font-medium">Your Library</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10"
        >
          <MoreHorizontalIcon className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-8 py-12">
        {/* Album Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>

        {/* Song Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-8 max-w-md"
        >
          <h1 className="text-3xl font-bold mb-2">{currentSong.title}</h1>
          <p className="text-xl text-white/70 mb-4">{currentSong.artist}</p>
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
            <span>{currentSong.genre}</span>
            <span>•</span>
            <span>{currentSong.duration}</span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full max-w-md mb-8"
        >
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-white/60 text-sm mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-6 mb-8"
        >
          <Button
            onClick={() => setIsShuffle(!isShuffle)}
            variant="ghost"
            size="icon"
            className={`text-white hover:text-[#ee0faf] ${isShuffle ? 'text-[#ee0faf]' : ''}`}
          >
            <ShuffleIcon className="w-5 h-5" />
          </Button>

          <Button
            onClick={playPrevious}
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#ee0faf]"
          >
            <SkipBackIcon className="w-6 h-6" />
          </Button>

          <Button
            onClick={togglePlay}
            size="icon"
            className="w-16 h-16 bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white"
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8 ml-1" />
            )}
          </Button>

          <Button
            onClick={playNext}
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#ee0faf]"
          >
            <SkipForwardIcon className="w-6 h-6" />
          </Button>

          <Button
            onClick={() => setIsRepeat(!isRepeat)}
            variant="ghost"
            size="icon"
            className={`text-white hover:text-[#ee0faf] ${isRepeat ? 'text-[#ee0faf]' : ''}`}
          >
            <RepeatIcon className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Secondary Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <Button
            onClick={toggleFavorite}
            variant="ghost"
            size="icon"
            className={`hover:text-[#ee0faf] ${
              isFavorite(currentSong.id) ? 'text-[#ee0faf]' : 'text-white'
            }`}
          >
            <HeartIcon className={`w-6 h-6 ${isFavorite(currentSong.id) ? 'fill-current' : ''}`} />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="icon"
              className="text-white hover:text-[#ee0faf]"
            >
              {getVolumeIcon()}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </motion.div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext}
        preload="metadata"
      >
        {/* Note: In a real app, you would have actual audio files */}
        <source src="#" type="audio/mpeg" />
      </audio>
    </motion.div>
  );
};
