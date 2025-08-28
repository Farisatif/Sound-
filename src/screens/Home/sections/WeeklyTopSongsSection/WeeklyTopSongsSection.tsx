import { ChevronRightIcon, PlayIcon } from "lucide-react";
import React from "react";
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
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  return (
    <motion.section 
      className="flex flex-col w-full items-start relative px-4 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
        <motion.div 
          className="flex flex-wrap items-center gap-[10px_10px] p-2.5 relative self-stretch w-full flex-[0_0_auto]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="relative w-fit mt-[-1.00px] font-h1 font-[number:var(--h1-font-weight)] text-transparent text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
            <span className="text-white font-h1 [font-style:var(--h1-font-style)] font-[number:var(--h1-font-weight)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] text-[length:var(--h1-font-size)]">
              Weekly Top{" "}
            </span>
            <span className="text-[#ee0faf] font-h1 [font-style:var(--h1-font-style)] font-[number:var(--h1-font-weight)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] text-[length:var(--h1-font-size)]">
              Songs
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center gap-[24px_24px] px-1 py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-3 md:gap-6 relative flex-1 grow overflow-x-auto">
            {songs.weeklyTopSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="flex-shrink-0"
              >
                <Card className="w-[180px] bg-[#1e1e1e] rounded-[10px] border-none hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer">
                  <CardContent className="flex flex-col items-start gap-2 p-[15px_15px_4px_15px]">
                    <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] group">
                      <motion.img
                        className="relative flex-1 grow h-[150px] rounded-[10px] object-cover"
                        alt="Album cover"
                        src={song.image}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Button
                        onClick={() => navigate(`/player/${song.id}`)}
                        size="icon"
                        className="absolute bottom-2 right-2 bg-[#ee0faf] hover:bg-[#ee0faf]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12"
                      >
                        <PlayIcon className="w-6 h-6" />
                      </Button>
                    </div>

                    <div className="flex flex-col w-full h-12 items-start gap-1 relative">
                      <div className="relative self-stretch mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] truncate">
                        {song.title}
                      </div>

                      <div className="relative self-stretch opacity-80 font-text-small font-[number:var(--text-small-font-weight)] text-white text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)] truncate">
                        {song.artist}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex flex-wrap max-w-[62px] items-start justify-center gap-[4px_4px] relative flex-1 grow"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 p-0 h-auto bg-transparent hover:bg-transparent transition-all duration-200 hover:scale-110"
            >
              <ChevronRightIcon className="w-[62px] h-[62px] text-white" />
              <span className="font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                View All
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
