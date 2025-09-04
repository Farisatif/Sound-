import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song } from '../hooks/useData';

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: Song[];
  currentIndex: number;
  playSong: (song: Song, playlist?: Song[]) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  togglePlayPause: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

// Sample audio URLs for demo purposes
const getSampleAudioUrl = (songId: number): string => {
  // Using free sample audio files for demo
  const sampleUrls = [
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav',
    'https://www.soundjay.com/misc/sounds/bell-ringing-03.wav',
    'https://www.soundjay.com/misc/sounds/bell-ringing-02.wav',
    'https://www.soundjay.com/misc/sounds/bell-ringing-01.wav',
  ];
  
  // For demo, we'll use a placeholder audio or generate a simple tone
  return `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT`;
};

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        nextSong();
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playSong = (song: Song, newPlaylist?: Song[]) => {
    if (newPlaylist) {
      setPlaylist(newPlaylist);
      const index = newPlaylist.findIndex(s => s.id === song.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }
    
    setCurrentSong(song);
    
    if (audioRef.current) {
      // For demo purposes, we'll use a sample audio URL
      audioRef.current.src = getSampleAudioUrl(song.id);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
        // Fallback: just update the UI without actual audio
        setIsPlaying(true);
      });
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const resumeSong = () => {
    if (audioRef.current && currentSong) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error resuming audio:', error);
        setIsPlaying(true);
      });
    }
  };

  const nextSong = () => {
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(nextIndex);
      playSong(playlist[nextIndex]);
    }
  };

  const previousSong = () => {
    if (playlist.length > 0) {
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      playSong(playlist[prevIndex]);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const value: MusicPlayerContextType = {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    playlist,
    currentIndex,
    playSong,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
    setVolume,
    seekTo,
    togglePlayPause,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

