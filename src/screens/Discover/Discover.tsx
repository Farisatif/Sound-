import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { SearchIcon, FilterIcon, PlayIcon } from 'lucide-react';
import { useSongs, useGenres } from '../../hooks/useData';
import { FooterSection } from '../Home/sections/FooterSection/FooterSection';

export const Discover: React.FC = () => {
  const { songs, loading: songsLoading } = useSongs();
  const { genres, loading: genresLoading } = useGenres();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState<string>('all');

  if (songsLoading || genresLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const allSongs = [
    ...songs.weeklyTopSongs,
    ...songs.newReleaseSongs,
    ...songs.trendingSongs
  ];

  const filteredSongs = allSongs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || song.genre?.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Discover </span>
            <span className="text-[#ee0faf]">Music</span>
          </h1>
          <p className="text-white/70 text-lg">Explore new songs and artists</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for songs, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1e1e1e] border-[#ee0faf]/30 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FilterIcon className="text-white/50 w-5 h-5" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[#1e1e1e] border border-[#ee0faf]/30 text-white rounded-md px-3 py-2"
            >
              <option value="all">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Genres Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedGenre(genre.name)}
              >
                <Card 
                  className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] border-none hover:from-[#ee0faf]/20 hover:to-[#0d9eef]/20 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${genre.color}20, ${genre.color}10)` }}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-white">{genre.name}</h3>
                    <p className="text-sm text-white/70 mt-2">{genre.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Songs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery ? `Search Results (${filteredSongs.length})` : 'All Songs'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={song.image}
                        alt={song.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 bg-[#ee0faf] hover:bg-[#ee0faf]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <PlayIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-white truncate">{song.title}</h3>
                    <p className="text-white/70 text-sm truncate">{song.artist}</p>
                    <p className="text-white/50 text-xs mt-1">{song.genre}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <FooterSection />
    </motion.div>
    
  );
};
