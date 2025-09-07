import { ChevronRightIcon, PlayIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useSongs } from "../../../../hooks/useData";

export const WeeklyTopSongsSection = (): JSX.Element => {
  const { songs, loading } = useSongs();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-white text-sm sm:text-base">Loading ...</div>
      </div>
    );
  }

  return (
    <motion.section 
      className="flex flex-col w-full m-3 items-start relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-start gap-2 sm:gap-4 relative w-full">
        <motion.div 
          className="flex flex-wrap items-center gap-2 sm:gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            <span className="text-white">Weekly Top </span>
            <span className="text-[#ee0faf]">Songs</span>
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
          {/* Songs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 flex-1 w-full">
            {songs.weeklyTopSongs.slice(0, 5).map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="w-full"
              >
                <Card className="w-full bg-[#1e1e1e] rounded-lg border-none hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer group">
                  <CardContent className="flex flex-col items-start gap-2 p-2 sm:p-3">
                    <div className="relative w-full aspect-square group">
                      <motion.img
                        className="w-full h-full rounded-lg object-cover"
                        alt={song.title}
                        src={song.image}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Button
                        onClick={() => navigate(`/player/${song.id}`)}
                        size="icon"
                        className="absolute bottom-1 right-1 bg-[#ee0faf] hover:bg-[#ee0faf]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 shadow-md hover:scale-105"
                      >
                        <PlayIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      </Button>
                    </div>

                    <div className="flex flex-col w-full gap-0.5">
                      <div className="text-white text-xs sm:text-sm lg:text-sm font-medium truncate">
                        {song.title}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-xs truncate">
                        {song.artist}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div 
            className="flex sm:flex-col items-center justify-center gap-2 w-full sm:w-auto mt-3 sm:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/discover')}
              className="flex flex-row sm:flex-col items-center gap-1 sm:gap-1.5 p-2 sm:p-3 h-auto bg-transparent hover:bg-[#ee0faf]/10 transition-all duration-200 hover:scale-105 group"
            >
              <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white group-hover:text-[#ee0faf] transition-colors" />
              <span className="text-white text-xs sm:text-sm font-medium group-hover:text-[#ee0faf] transition-colors">
                View All
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
