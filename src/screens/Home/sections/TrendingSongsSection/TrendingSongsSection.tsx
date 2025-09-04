import { HeartIcon, PlusIcon, PlayIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useSongs } from "../../../../hooks/useData";
import { useFavorites } from "../../../../context/FavoritesContext";

export const TrendingSongsSection = (): JSX.Element => {
  const { songs, loading } = useSongs();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const toggleFavorite = (song: any) => {
    if (isFavorite(song.id)) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <motion.section 
      className="w-full relative px-4 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <div className="flex items-center justify-center gap-2.5 p-2.5 mb-4">
        <h1 className="font-h1 text-white text-2xl sm:text-3xl md:text-4xl">
          <span className="text-white">Trending</span>
          <span className="text-[#ee0faf]"> Songs</span>
        </h1>
      </div>

      {/* Table Header (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center mb-4 px-4 sm:px-7">
        <div></div>
        <div></div>
        <div className="text-white font-text-big">Release Date</div>
        <div className="text-white font-text-big">Album</div>
        <div className="text-white font-text-big">Time</div>
      </div>

      {/* Songs List */}
      <div className="space-y-4">
        {songs.trendingSongs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="
              grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto_auto] 
              gap-4 items-center hover:bg-[#1a1a1a] p-3 rounded-lg transition-all duration-200
            "
          >
            {/* Rank */}
            <div className="text-white font-h2 w-7">{song.rank}</div>

            {/* Song Card */}
            <Card className=" border-none bg-[#2a2a2a] transition-colors duration-200">
              
              <CardContent className="flex items-center gap-4 p-2 h-[60px]">
                
                <div className="relative group">
                                  <Button
                                      onClick={() => navigate(`/player/${song.id}`)}
                                      size="icon"
                                      className="absolute inset-0  opacity-0  transition-opacity duration-300 rounded-[5px] w-full h-full"
                                    >
                                      
                                    </Button>
                  <motion.img
                    className="w-[100%] h-[3rem] rounded-[5px] object-cover"
                    alt="Album cover"
                    src={song.image}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
         
                </div>

                <div className="flex flex-col justify-center min-w-0">
                  <div className="text-white font-h3 truncate">{song.title}</div>
                  <div className="text-white font-text-small truncate">{song.artist}</div>
                </div>
              </CardContent>
            </Card>

            {/* Release Date (hidden on mobile) */}
            <div className="hidden md:block text-white font-text-medium">
              {song.releaseDate}
            </div>

            {/* Album (hidden on mobile) */}
            <div className="hidden md:block text-white font-text-medium max-w-[200px] truncate">
              {song.album}
            </div>

            {/* Time + Favorite */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <HeartIcon
                  className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                    isFavorite(song.id) ? "text-[#ee0faf] fill-current" : "text-white hover:text-[#ee0faf]"
                  }`}
                  onClick={() => toggleFavorite(song)}
                />
              </motion.div>
              <div className="text-white font-text-medium">{song.duration}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Button
          variant="secondary"
          className="bg-[#1e1e1e] text-white border-none rounded-[5px] h-auto px-4 py-1 hover:bg-[#2a2a2a] transition-all duration-200 hover:scale-105"
        >
          <PlusIcon className="w-6 h-6 mr-1" />
          <span className="font-h4">View All</span>
        </Button>
      </motion.div>
    </motion.section>
  );
};
