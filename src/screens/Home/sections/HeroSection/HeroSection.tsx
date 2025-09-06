import React from 'react';
import { HeartIcon, MusicIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../context/AuthContext";
import { useSongs, useGenres } from '../../../../hooks/useData';

export const HeroSection = (): JSX.Element => {
  const { user } = useAuth();
    const { loading: songsLoading } = useSongs();
    const { loading: genresLoading } = useGenres();
    if (songsLoading || genresLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  const userAvatars = [
    { src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-2.png", className: "w-8 h-8 sm:w-10 sm:h-10 relative" },
    { src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-3.png", className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3" },
    { src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-4.png", className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3" },
    { src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-5.png", className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3" },
    { src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-6.png", className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3" },
  ];
  


  return (
    <section className=" relative w-full h-[30rem] sm:h-[600px] md:h-[700px] lg:h-[595px] bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png)] bg-cover bg-center">
      <div className="flex flex-col w-full max-w-[1031px] mx-auto h-full gap-6 sm:gap-8 md:gap-12 lg:gap-[114px] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-7 pb-8 sm:pb-12 lg:pb-16">
        
        {/* Header */}
        <motion.header 
          className="mt-[5%] flex flex-wrap lg:flex-nowrap items-center gap-3 sm:gap-4 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        > 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 flex flex-col md:flex-row gap-4"
          >
            <div className="zitems-center gap-2">

            </div>
          </motion.div>
        </motion.header>


        {/* Main Content */}
        <motion.main 
          className="flex flex-col w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[352px] items-center gap-4 sm:gap-6 mx-auto lg:mx-0 lg:self-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.img
            className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-full"
            alt="All the Best Songs"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-181.svg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            className="w-full bg-[black]/70 br-4rem max-w-[300px] sm:max-w-[400px] lg:max-w-full"
            alt="in One Place"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-180.svg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-nowrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 w-[50%] sm:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button className="h-10 sm:h-11 lg:h-10 w-full sm:w-auto bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white font-medium text-sm sm:text-base lg:text-sm px-4 sm:px-6 lg:px-4 py-2">
                Discover Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-10 sm:h-11 lg:h-10 w-full sm:w-auto text-[#ee0faf] hover:bg-[#777777]/70 font-medium text-sm sm:text-base lg:text-sm px-4 sm:px-6 lg:px-4 py-2"
              >
                Create Playlist
              </Button>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 sm:bottom-16 lg:bottom-20 right-4 sm:right-8 lg:right-16 flex items-center gap-2 sm:gap-3 lg:gap-[13.6px] flex-wrap sm:flex-nowrap">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <MusicIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[29px] lg:h-[31px] text-white" />
        </motion.div>
        <div className="font-quicksand font-normal text-white text-sm sm:text-lg lg:text-[23.8px] whitespace-nowrap">
          <span className="font-bold text-[#ee0faf]">50M+</span> <span className="font-bold">Songs</span>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-16 lg:bottom-20 left-4 sm:left-8 lg:left-16 flex items-center gap-2 sm:gap-3 lg:gap-[13.6px] flex-wrap sm:flex-nowrap">
        <div className="flex items-center relative">
          {userAvatars.map((avatar, index) => (
            <motion.div key={index} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 + index * 0.1, duration: 0.3 }} className={`${index !== 0 ? '-ml-2 sm:-ml-3' : ''}`}>
              <Avatar className={avatar.className}>
                <AvatarImage src={avatar.src} alt="User avatar" className="object-cover" />
              </Avatar>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[27.2px] lg:h-[27.2px] text-[#ee0faf] fill-current" />
          </motion.div>
          <div className="font-quicksand font-normal text-white text-sm sm:text-lg lg:text-[23.8px] whitespace-nowrap">
            <span className="font-bold text-[#ee0faf]">33k</span> <span className="font-bold">Likes</span>
          </div>
        </div>
      </div>
    </section>
  );
};