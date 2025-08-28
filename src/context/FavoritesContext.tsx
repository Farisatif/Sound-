import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song } from '../hooks/useData';

interface FavoritesContextType {
  favorites: Song[];
  addToFavorites: (song: Song) => void;
  removeFromFavorites: (songId: number) => void;
  isFavorite: (songId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Song[]>([]);

  const addToFavorites = (song: Song) => {
    setFavorites(prev => {
      if (prev.find(fav => fav.id === song.id)) {
        return prev;
      }
      return [...prev, song];
    });
  };

  const removeFromFavorites = (songId: number) => {
    setFavorites(prev => prev.filter(song => song.id !== songId));
  };

  const isFavorite = (songId: number) => {
    return favorites.some(song => song.id === songId);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
