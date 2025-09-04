import { HeartIcon, MusicIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../context/AuthContext";

export const HeroSection = (): JSX.Element => {
  const { user } = useAuth();
  
  const userAvatars = [
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-2.png",
      className: "w-8 h-8 sm:w-10 sm:h-10 relative",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-3.png",
      className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-4.png",
      className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-5.png",
      className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-6.png",
      className: "w-8 h-8 sm:w-10 sm:h-10 relative -ml-2 sm:-ml-3",
    },
  ];

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[595px] bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png)] bg-cover bg-center">
      <div className="flex flex-col w-full max-w-none lg:max-w-[1031px] items-start justify-between h-full gap-6 sm:gap-8 md:gap-12 lg:gap-[114px] absolute top-0 left-0 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-7 pb-8 sm:pb-12 lg:pb-16">
        
        {/* Header */}
        <motion.header 
          className="gap-3 sm:gap-4 flex items-center relative w-full flex-wrap lg:flex-nowrap"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <motion.img
            className="relative flex-1 min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] h-[32px] sm:h-[36px] lg:h-[38px] order-1 lg:order-1"
            alt="Search bar"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/search-bar.svg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />

          {/* Navigation Links */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 order-3 lg:order-2 w-full lg:w-auto justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link to="/about">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3"
              >
                About Us
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3"
              >
                Contact
              </Button>
            </Link>
          </motion.div>

          {/* Auth Buttons */}
          {!user ? (
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 relative order-2 lg:order-3 w-full lg:w-auto lg:min-w-[200px] justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to="/login" className="flex-1 lg:flex-initial">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 sm:h-9 w-full lg:w-auto border-[#ee0faf] text-[#ee0faf] bg-transparent hover:bg-[#ee0faf]/10 [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-black text-xs sm:text-sm transition-all duration-200 hover:scale-105 px-3 sm:px-4"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup" className="flex-1 lg:flex-initial">
                <Button 
                  size="sm"
                  className="h-8 sm:h-9 w-full lg:w-auto bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-black text-xs sm:text-sm transition-all duration-200 hover:scale-105 px-3 sm:px-4"
                >
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-3 relative order-2 lg:order-3 w-full lg:w-auto lg:min-w-[200px] justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-white text-right">
                <p className="text-xs sm:text-sm opacity-80">Welcome back,</p>
                <p className="font-medium text-[#ee0faf] text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{user.name}</p>
              </div>
            </motion.div>
          )}
        </motion.header>

        {/* Main Content */}
        <motion.main 
          className="flex flex-col w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[352px] items-center gap-4 sm:gap-6 mx-auto lg:mx-0 lg:self-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Title Images */}
          <motion.img
            className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-full"
            alt="All the Best Songs"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-181.svg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.img
            className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-full"
            alt="in One Place"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-180.svg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          {/* Action Buttons */}
          <motion.div 
            className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 relative w-full flex-wrap sm:flex-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button className="h-10 sm:h-11 lg:h-10 w-full sm:w-auto bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-medium text-sm sm:text-base lg:text-sm px-4 sm:px-6 lg:px-4 py-2">
                Discover Now
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="h-10 sm:h-11 lg:h-10 w-full sm:w-auto border-[#0d9eef] text-white hover:bg-[#0d9eef]/10 [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-medium text-sm sm:text-base lg:text-sm px-4 sm:px-6 lg:px-4 py-2"
              >
                Create Playlist
              </Button>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>

      {/* Stats - Songs */}
      <motion.div 
        className="absolute bottom-12 sm:bottom-16 lg:bottom-20 right-4 sm:right-8 lg:right-16 inline-flex items-center gap-2 sm:gap-3 lg:gap-[13.6px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <MusicIcon className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-[29px] lg:h-[31px] text-white" />
        </motion.div>

        <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-normal text-transparent text-sm sm:text-lg lg:text-[23.8px] tracking-[0] leading-tight whitespace-nowrap">
          <span className="font-bold text-[#ee0faf]">50M+</span>
          <span className="text-white">&nbsp;</span>
          <span className="font-bold text-white">Songs</span>
        </div>
      </motion.div>

      {/* Stats - Likes */}
      <motion.div 
        className="absolute bottom-12 sm:bottom-16 lg:bottom-20 left-4 sm:left-8 lg:left-16 w-[200px] sm:w-[250px] lg:w-[274px] h-[40px] sm:h-[48px] lg:h-[52px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {/* User Avatars */}
        <div className="inline-flex items-start absolute top-1 sm:top-2 left-0">
          {userAvatars.map((avatar, index) => (
            <motion.div
              key={`avatar-${index}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.3 }}
            >
              <Avatar className={avatar.className}>
                <AvatarImage
                  src={avatar.src}
                  alt="User avatar"
                  className="object-cover"
                />
              </Avatar>
            </motion.div>
          ))}
        </div>

        {/* Likes Counter */}
        <div className="top-1.5 sm:top-2.5 left-24 sm:left-28 lg:left-32 inline-flex items-center gap-2 sm:gap-3 lg:gap-[13.6px] absolute">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartIcon className="relative w-5 h-5 sm:w-6 sm:h-6 lg:w-[27.2px] lg:h-[27.2px] text-[#ee0faf] fill-current" />
          </motion.div>

          <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-normal text-transparent text-sm sm:text-lg lg:text-[23.8px] tracking-[0] leading-tight whitespace-nowrap">
            <span className="font-bold text-[#ee0faf]">33k</span>
            <span className="text-white">&nbsp;</span>
            <span className="font-bold text-white">Likes</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
