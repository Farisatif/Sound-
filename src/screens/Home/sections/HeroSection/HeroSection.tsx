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
      className:
        "w-[35px] ml-[-1.00px] relative h-[40.8px] mt-[-3.40px] mb-[-3.40px]",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-3.png",
      className:
        "w-[40.8px] ml-[-15.3px] relative h-[40.8px] mt-[-3.40px] mb-[-3.40px]",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-4.png",
      className:
        "w-[40.8px] ml-[-15.3px] relative h-[40.8px] mt-[-3.40px] mb-[-3.40px]",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-5.png",
      className:
        "w-[40.8px] ml-[-15.3px] relative h-[40.8px] mt-[-3.40px] mb-[-3.40px]",
    },
    {
      src: "https://c.animaapp.com/mecm5afmnFTEcQ/img/ellipse-6.png",
      className:
        "w-[40.8px] ml-[-15.3px] relative h-[40.8px] mt-[-3.40px] mb-[-3.40px]",
    },
  ];

  return (
    <section className="relative w-full h-[400px] md:h-[595px] bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png)] bg-cover bg-[50%_50%]">
      <div className="flex flex-col w-full max-w-[1031px] items-start justify-center gap-8 md:gap-[114px] absolute top-4 md:top-7 left-4 px-4">
        <motion.header 
          className="gap-3 flex items-center relative w-full flex-wrap"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            className="relative flex-1 grow h-[38px] min-w-[200px]"
            alt="Search bar"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/search-bar.svg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link to="/about">
              <Button
                variant="ghost"
                className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10 transition-all duration-200"
              >
                About Us
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="ghost"
                className="text-white hover:text-[#ee0faf] hover:bg-[#ee0faf]/10 transition-all duration-200"
              >
                Contact
              </Button>
            </Link>
          </motion.div>

          {!user ? (
            <motion.div 
              className="flex items-center gap-3 relative flex-1 grow min-w-[200px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to="/login" className="flex-1">
                <Button
                  variant="outline"
                  className="h-9 w-full border-[#ee0faf] text-[#ee0faf] bg-transparent hover:bg-[#ee0faf]/10 [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-black text-sm transition-all duration-200 hover:scale-105"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup" className="flex-1">
                <Button className="h-9 w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-black text-sm transition-all duration-200 hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-3 relative flex-1 grow min-w-[200px] justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-white text-right">
                <p className="text-sm opacity-80">Welcome back,</p>
                <p className="font-medium text-[#ee0faf]">{user.name}</p>
              </div>
            </motion.div>
          )}
        </motion.header>

        <motion.main 
          className="flex flex-col w-full max-w-[352px] items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.img
            className="relative w-full"
            alt="Frame"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-181.svg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.img
            className="relative w-full"
            alt="Frame"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-180.svg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div 
            className="flex items-center justify-center gap-3 md:gap-6 relative w-full flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="h-10 bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-medium text-sm md:text-base px-4 md:px-6 py-2">
                Discover Now
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="h-10 border-[#0d9eef] text-normal hover:bg-[#0d9eef]/10 [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-medium text-sm md:text-base px-4 md:px-6 py-2"
              >
                Create Playlist
              </Button>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>

      <motion.div 
        className="absolute bottom-16 md:bottom-20 right-8 md:right-16 inline-flex items-center gap-[13.6px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <div className="relative w-[27.2px] h-[27.2px]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <MusicIcon className="relative w-[29px] h-[31px] text-white" />
        </motion.div>

        <div className="relative w-fit mt-[-0.70px] [font-family:'Quicksand',Helvetica] font-normal text-transparent text-[18px] md:text-[23.8px] tracking-[0] leading-[28.6px] whitespace-nowrap">
          <span className="font-bold text-[#ee0faf]">50M+</span>
          <span className="text-white">&nbsp;</span>
          <span className="font-bold text-white">Songs</span>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-16 md:bottom-20 left-4 md:left-16 w-[250px] md:w-[274px] h-[52px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="inline-flex items-start absolute top-2 left-px">
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

        <div className="top-2.5 left-28 md:left-32 inline-flex items-center gap-[13.6px] absolute">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartIcon className="relative w-[27.2px] h-[27.2px] text-[#ee0faf] fill-current" />
          </motion.div>

          <div className="relative w-fit mt-[-1.70px] [font-family:'Quicksand',Helvetica] font-normal text-transparent text-[18px] md:text-[23.8px] tracking-[0] leading-[28.6px] whitespace-nowrap">
            <span className="font-bold text-[#ee0faf]">33k</span>
            <span className="text-white">&nbsp;</span>
            <span className="font-bold text-white">Likes</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
