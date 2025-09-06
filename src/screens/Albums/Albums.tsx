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
          className="mt-[10%] mb-8 text-center sm:text-left"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="text-white">Top </span>
            <span className="text-[#ee0faf]">Albums</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base lg:text-lg">
            Discover the most popular albums
          </p>
        </motion.div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {albums?.map((album, index) => (
            <motion.div
              key={album.id ?? index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="group"
            >
              <Card className="bg-[#1e1e1e] border-none hover:bg-[#2a2a2a] transition-all duration-300">
                <CardContent className="p-3 sm:p-4">
                  <div className="relative mb-3 sm:mb-4">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-40 sm:h-48 lg:h-52 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Button
                        size="icon"
                        className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 w-10 h-10 sm:w-12 sm:h-12"
                      >
                        <PlayIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-base lg:text-sm font-bold text-white truncate">{album.title}</h3>
                    <p className="text-[#ee0faf] text-xs sm:text-sm truncate">{album.artist}</p>

                    <div className="flex flex-wrap justify-between text-white/70 text-xs">
                      <span>{album.tracks ?? 0} tracks</span>
                      <span>{album.duration ?? 'N/A'}</span>
                    </div>

                    <div className="flex flex-wrap justify-between text-white/70 text-xs">
                      <span>{album.genre ?? 'Unknown'}</span>
                      <span>★ {album.rating ?? '0.0'}</span>
                    </div>

                    <p className="text-white/50 text-xs">
                      Released: {album.releaseDate ? new Date(album.releaseDate).getFullYear() : 'Unknown'}
                    </p>

                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white/70 hover:text-[#ee0faf]"
                        >
                          <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white/70 hover:text-white"
                        >
                          <MoreHorizontalIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                      <p className="text-white/50 text-xs sm:text-sm">
                        {album.sales ? (album.sales / 1000000).toFixed(1) + 'M' : '0M'} sales
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
          className="text-center mt-6 sm:mt-8 lg:mt-10"
        >
          <Button
            variant="outline"
            className="border-[#ee0faf] bg-[#ee0faf]/70 hover:bg-[#ee0faf]/50 px-4 sm:px-6 py-1 sm:py-2 hover:t"
          >
            Load More Albums
          </Button>
        </motion.div>

      </div>
    </motion.div>
  );
};
