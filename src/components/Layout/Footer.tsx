import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const [location, setLocation] = useState<string>("UTC");

  // 🕒 تحديث الوقت كل ثانية
  useEffect(() => {
    const updateTime = (timeZone?: string) => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: timeZone || "UTC",
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setDateTime(formatter.format(now));
    };

    // 🌍 الحصول على موقع المستخدم
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((res) => res.json())
            .then((data) => {
              const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
              setLocation(data.city || data.countryName || tz);
              updateTime(tz);
              setInterval(() => updateTime(tz), 1000);
            })
            .catch(() => {
              updateTime("UTC");
              setInterval(() => updateTime("UTC"), 1000);
            });
        },
        () => {
          updateTime("UTC");
          setInterval(() => updateTime("UTC"), 1000);
        }
      );
    } else {
      updateTime("UTC");
      setInterval(() => updateTime("UTC"), 1000);
    }
  }, []);

  return (
    <motion.footer
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-white/10 text-white shadow-lg"
    >
      


      {/* الوقت والتاريخ */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 text-xs sm:text-sm">
        <p className="text-white/80">
          {dateTime}{" "}
          <span className="text-[#ee0faf] font-medium ml-2">({location})</span>
        </p>

      </div>
    </motion.footer>
  );
};

export default Footer;
