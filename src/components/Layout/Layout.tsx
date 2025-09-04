import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignUpSection } from '../../screens/Home/sections/SignUpSection/SignUpSection';

export const Layout: React.FC = () => {
  return (
    <div className="bg-black w-full min-h-screen flex relative">
      <div className="absolute w-[100%] h-[100%] top-[25rem] left-[10%] rotate-[90.24deg] blur-[90px] [background:conic-gradient(from_226deg_at_50%_50%,rgba(81,55,108,0.43)_6%,rgba(159,36,109,0.45)_42%,rgba(159,36,109,0.44)_44%,rgba(229,41,150,0.45)_58%,rgba(27,79,144,0.43)_75%,rgba(42,64,108,0.42)_87%)] pointer-events-none" />
      
      <SignUpSection />
      
      <motion.div 
        className="flex-1 flex flex-col lg:ml-[320px] w-full lg:w-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};
