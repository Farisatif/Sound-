// Layout.tsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Layout/Footer";

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0); // direct scroll without smooth
  }, [pathname]);

  return (
    <div className="relative bg-black w-full min-h-screen flex overflow-x-hidden overflow-y-auto">
      {/* Background Blur */}
      <div
        className="absolute inset-0 rotate-[90deg] blur-[90px]
        [background:conic-gradient(from_226deg_at_50%_50%,rgba(81,55,108,0.43)_6%,rgba(159,36,109,0.45)_42%,rgba(229,41,150,0.45)_58%,rgba(27,79,144,0.43)_75%,rgba(42,64,108,0.42)_87%)]
        pointer-events-none z-0"
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col w-full lg:w-auto transition-all duration-300 pt-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
       
      </motion.div>
    </div>
  );
};

export default Layout;
