import React from 'react';
import { HeartIcon, MusicIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../context/AuthContext";
import { useSongs, useGenres } from '../../../../hooks/useData';

export const HeroSection = (): JSX.Element => {
  const { user } = useAuth();
  const { loading: songsLoading } = useSongs();
  const { loading: genresLoading } = useGenres();

  if (songsLoading || genresLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[90vh] sm:h-[80vh] md:h-[70vh] bg-black flex justify-center items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" 
           style={{ backgroundImage: `url('https://c.animaapp.com/mecm5afmnFTEcQ/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png')` }}>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-3 sm:gap-4 lg:gap-6 w-full max-w-[400px] sm:max-w-[450px]">

        {/* Main Image */}
        <motion.img
          src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-181.svg"
          alt="All the Best Songs"
          className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] rounded-xl"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />

        {/* Secondary Image */}
        <motion.img
          src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-180.svg"
          alt="In One Place"
          className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] rounded-xl bg-black/70 mt-2"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 sm:gap-3 mt-3 w-full">
          <Button className="bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white font-medium text-xs sm:text-sm px-4 py-1.5 rounded-md  sm:w-auto">
            Discover Now
          </Button>
          <Button className="border border-[#ee0faf] text-[#ee0faf] hover:bg-white/10 font-medium text-xs sm:text-sm px-4 py-1.5 rounded-md sm:w-auto" variant="outline">
            Create Playlist
          </Button>
        </div>
      </div>

      {/* Stats Right */}
      <div className="absolute bottom-1 sm:bottom-16 lg:bottom-20 right-4 sm:right-8 lg:right-16 flex items-center gap-2 sm:gap-3 lg:gap-5">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <MusicIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </motion.div>
        <div className="text-white font-bold text-xs sm:text-sm lg:text-base">
          <span className="text-[#ee0faf]">50M+</span> Songs
        </div>
      </div>

      {/* Likes Left */}
      <div className="absolute bottom-1 sm:bottom-16 lg:bottom-20 left-4 sm:left-8 lg:left-16 flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-[#ee0faf] fill-current" />
          </motion.div>
          <div className="text-white font-bold text-xs sm:text-sm lg:text-base">
            <span className="text-[#ee0faf]">33k</span> Likes
          </div>
        </div>
      </div>
    </section>
  );
};
