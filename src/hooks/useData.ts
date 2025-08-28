import { useState, useEffect } from 'react';

// Import JSON data
import songsData from '../data/songs.json';
import artistsData from '../data/artists.json';
import albumsData from '../data/albums.json';
import playlistsData from '../data/playlists.json';
import genresData from '../data/genres.json';

// Types
export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  genre?: string;
  duration: string;
  releaseDate: string;
  rank?: string;
  album?: string;
  plays?: number;
}

export interface Artist {
  id: number;
  name: string;
  image: string;
  genre: string;
  followers: number;
  verified: boolean;
  monthlyListeners: number;
  topSongs: string[];
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  image: string;
  releaseDate: string;
  genre: string;
  tracks: number;
  duration: string;
  label: string;
  sales: number;
  rating: number;
}

export interface Playlist {
  id: number;
  title: string;
  image?: string;
  description: string;
  mood?: string;
  tracks: number;
  duration: string;
  followers?: number;
  tags?: string[];
  color?: string;
  isPrivate?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Genre {
  id: number;
  name: string;
  description: string;
  color: string;
  popularArtists: string[];
  subgenres: string[];
}

// Custom hooks
export const useSongs = () => {
  const [songs, setSongs] = useState({
    weeklyTopSongs: [] as Song[],
    newReleaseSongs: [] as Song[],
    trendingSongs: [] as Song[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setSongs({
        weeklyTopSongs: songsData.weeklyTopSongs,
        newReleaseSongs: songsData.newReleaseSongs,
        trendingSongs: songsData.trendingSongs,
      });
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { songs, loading };
};

export const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArtists(artistsData.popularArtists);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { artists, loading };
};

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlbums(albumsData.topAlbums);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { albums, loading };
};

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState({
    moodPlaylists: [] as Playlist[],
    userPlaylists: [] as Playlist[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlaylists({
        moodPlaylists: playlistsData.moodPlaylists,
        userPlaylists: playlistsData.userPlaylists,
      });
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { playlists, loading };
};

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGenres(genresData.genres);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { genres, loading };
};

// Utility functions
export const searchSongs = (query: string, allSongs: Song[]): Song[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return allSongs.filter(
    song =>
      song.title.toLowerCase().includes(lowercaseQuery) ||
      song.artist.toLowerCase().includes(lowercaseQuery) ||
      song.genre?.toLowerCase().includes(lowercaseQuery)
  );
};

export const getSongsByGenre = (genre: string, allSongs: Song[]): Song[] => {
  return allSongs.filter(song => song.genre?.toLowerCase() === genre.toLowerCase());
};

export const getSongsByArtist = (artist: string, allSongs: Song[]): Song[] => {
  return allSongs.filter(song => song.artist.toLowerCase() === artist.toLowerCase());
};

export const getRandomSongs = (allSongs: Song[], count: number = 10): Song[] => {
  const shuffled = [...allSongs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
