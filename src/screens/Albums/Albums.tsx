import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { PlayIcon, HeartIcon, MoreHorizontalIcon } from 'lucide-react';
import { useAlbums } from '../../hooks/useData';

export const Albums: React.FC = () => {
  const { albums, loading } = useAlbums();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:text-left"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-white">Top </span>
            <span className="text-[#ee0faf]">Albums</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-lg">
            Discover the most popular albums
          </p>
        </motion.div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="relative mb-4 sm:mb-6">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-52 sm:h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Button
                        size="icon"
                        className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 w-12 h-12 sm:w-16 sm:h-16"
                      >
                        <PlayIcon className="w-5 h-5 sm:w-8 sm:h-8" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white truncate">{album.title}</h3>
                    <p className="text-[#ee0faf] font-medium truncate">{album.artist}</p>

                    <div className="flex flex-wrap justify-between text-white/70 text-xs sm:text-sm">
                      <span>{album.tracks} tracks</span>
                      <span>{album.duration}</span>
                    </div>

                    <div className="flex flex-wrap justify-between text-white/70 text-xs sm:text-sm">
                      <span>{album.genre}</span>
                      <span>★ {album.rating}</span>
                    </div>

                    <p className="text-white/50 text-xs sm:text-sm">
                      Released: {new Date(album.releaseDate).getFullYear()}
                    </p>

                    <div className="flex items-center justify-between pt-2 sm:pt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white/70 hover:text-[#ee0faf]"
                        >
                          <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white/70 hover:text-white"
                        >
                          <MoreHorizontalIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                      <p className="text-white/50 text-xs sm:text-sm">
                        {(album.sales / 1000000).toFixed(1)}M sales
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button
            variant="outline"
            className="border-[#ee0faf] text-[#ee0faf] hover:bg-[#ee0faf]/10 px-6 sm:px-8 py-2 sm:py-3"
          >
            Load More Albums
          </Button>
        </motion.div>

      </div>
    </motion.div>
  );
};