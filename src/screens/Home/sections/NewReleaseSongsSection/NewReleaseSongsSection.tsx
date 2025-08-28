import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useSongs } from "../../../../hooks/useData";

export const NewReleaseSongsSection = (): JSX.Element => {
  const { songs, loading } = useSongs();

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
        <div className="flex flex-wrap items-center gap-[10px_10px] p-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative w-fit mt-[-1.00px] font-h1 font-[number:var(--h1-font-weight)] text-transparent text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
            <span className="text-white font-h1 [font-style:var(--h1-font-style)] font-[number:var(--h1-font-weight)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] text-[length:var(--h1-font-size)]">
              New Release{" "}
            </span>
            <span className="text-[#ee0faf] font-h1 [font-style:var(--h1-font-style)] font-[number:var(--h1-font-weight)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] text-[length:var(--h1-font-size)]">
              Songs
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-[24px_24px] px-1 py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-6 relative flex-1 grow">
            {songs.newReleaseSongs.map((song, index) => (
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
                <CardContent className="flex flex-col items-start gap-2 p-[15px] pt-1">
                  <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <motion.img
                      className="relative flex-1 grow h-[150px] rounded-[10px] object-cover"
                      alt="Album cover"
                      src={song.image}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex flex-col w-[150px] h-12 items-start gap-1 relative mr-[-5.60px]">
                    <h3 className="relative self-stretch mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                      {song.title}
                    </h3>
                    <p className="relative self-stretch opacity-80 font-text-small font-[number:var(--text-small-font-weight)] text-white text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
                      {song.artist}
                    </p>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap max-w-[62px] items-start justify-center gap-[4px_4px] relative flex-1 grow">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 p-0 h-auto bg-transparent hover:bg-transparent"
            >
              <img
                className="relative flex-1 grow h-[62px]"
                alt="View all arrow"
                src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-170.svg"
              />
              <span className="relative w-fit font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                View All
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
