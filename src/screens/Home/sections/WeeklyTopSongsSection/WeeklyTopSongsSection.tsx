import { ChevronRightIcon, PlayIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useSongs } from "../../../../hooks/useData";
import { useMusicPlayer } from "../../../../context/MusicPlayerContext";

export const WeeklyTopSongsSection = (): JSX.Element => {
  const { songs, loading } = useSongs();
  const { playSong } = useMusicPlayer();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-white">Loading ...</div>
      </div>
    );
  }

  const handlePlaySong = (song: any, index: number) => {
    // Map weeklyTopSongs to ensure each song has a 'url' property
    const topSongsWithUrl = songs.weeklyTopSongs.map((s: any) => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      url: s.url ?? "", // Provide a default or actual url
    }));
    playSong(song, topSongsWithUrl);
  };

  return (
    <motion.section 
      className="flex flex-col w-[100%] m-1 items-start relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-start gap-2 sm:gap-4 relative self-stretch w-[100%]">
        <motion.div 
          className="flex flex-wrap items-center gap-2 sm:gap-4 relative self-stretch w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            <span className="text-white">Weekly Top </span>
            <span className="text-[#ee0faf]">Songs</span>
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative self-stretch w-full">
          {/* Songs Grid - Responsive */}
          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 flex-1 w-full">
            {songs.weeklyTopSongs.slice(0, 5).map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="w-full"
              >
                <Card className="w-full bg-[#1e1e1e] rounded-lg border-none hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer group">
                  <CardContent className="flex flex-col items-start gap-2 p-3 sm:p-4">
                    <div className="relative w-full aspect-square group">
                      <motion.img
                        className="w-full h-full rounded-lg object-cover"
                        alt="Album cover"
                        src={song.image}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Button
                        onClick={() => handlePlaySong(song, index)}
                        size="icon"
                        className="absolute bottom-2 right-2 bg-[#ee0faf] hover:bg-[#ee0faf]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shadow-lg hover:scale-110"
                      >
                        <PlayIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-0.5" />
                      </Button>
                    </div>

                    <div className="flex flex-col w-full gap-1">
                      <div className="text-white text-xs sm:text-sm lg:text-base font-medium truncate">
                        {song.title}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm truncate">
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
            className="flex sm:flex-col items-center justify-center gap-2 w-full sm:w-auto"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/discover')}
              className="flex flex-row sm:flex-col items-center gap-2 sm:gap-1 p-3 sm:p-4 h-auto bg-transparent hover:bg-[#ee0faf]/10 transition-all duration-200 hover:scale-105 group"
            >
              <ChevronRightIcon className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white group-hover:text-[#ee0faf] transition-colors" />
              <span className="text-white text-sm sm:text-base font-medium group-hover:text-[#ee0faf] transition-colors">
                View All
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
