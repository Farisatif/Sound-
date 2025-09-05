import { HeartIcon, MusicIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  const userAvatars = [
    {
      src: "https://c.animaapp.com/mecj8w01EfvOiv/img/ellipse-2.png",
    },
    {
      src: "https://c.animaapp.com/mecj8w01EfvOiv/img/ellipse-3.png",
    },
    {
      src: "https://c.animaapp.com/mecj8w01EfvOiv/img/ellipse-4.png",
    },
    {
      src: "https://c.animaapp.com/mecj8w01EfvOiv/img/ellipse-5.png",
    },
    {
      src: "https://c.animaapp.com/mecj8w01EfvOiv/img/ellipse-6.png",
    },
  ];

  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[595px] bg-[url(https://c.animaapp.com/mecj8w01EfvOiv/img/1000-f-645546712-clv1sotwmf2k99veh5cvx7tvqc38k6hp-1.png)] bg-cover bg-center">
      <div className="flex flex-col w-full max-w-7xl mx-auto items-start justify-center gap-8 sm:gap-16 lg:gap-[114px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header - Hidden on mobile since we have MobileHeader */}
        <header className="hidden lg:flex gap-3 items-center relative w-full">
          <img
            className="relative flex-1 h-8 sm:h-10"
            alt="Search bar"
            src="https://c.animaapp.com/mecj8w01EfvOiv/img/search-bar.svg"
          />

          <img
            className="relative w-48 sm:w-64 lg:w-[303px] h-8 sm:h-10"
            alt="Titles"
            src="https://c.animaapp.com/mecj8w01EfvOiv/img/titles.svg"
          />

          <div className="flex items-center gap-3 relative flex-1">
            <Button
              variant="outline"
              className="h-8 sm:h-9 flex-1 border-[#ee0faf] text-[#ee0faf] bg-transparent hover:bg-[#ee0faf]/10 text-xs sm:text-sm font-bold"
            >
              Login
            </Button>

            <Button className="h-8 sm:h-9 flex-1 bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white text-xs sm:text-sm font-bold">
              Sign Up
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg items-center gap-4 sm:gap-6 relative mx-auto">
          <img
            className="relative w-full h-auto"
            alt="Frame"
            src="https://c.animaapp.com/mecj8w01EfvOiv/img/frame-181.svg"
          />

          <img
            className="relative w-full h-auto"
            alt="Frame"
            src="https://c.animaapp.com/mecj8w01EfvOiv/img/frame-180.svg"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative w-full">
            <Button className="w-full sm:w-auto h-10 sm:h-12 bg-[#ee0faf] hover:bg-[#ee0faf]/90 text-white px-6 py-2 font-medium text-sm sm:text-base">
              Discover Now
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto h-10 sm:h-12 border-[#0d9eef] text-[#0d9eef] hover:bg-[#0d9eef]/10 px-6 py-2 font-medium text-sm sm:text-base"
            >
              Create Playlist
            </Button>
          </div>
        </main>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 lg:left-16 right-4 sm:right-8 lg:right-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          {/* User Avatars and Likes */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {userAvatars.map((avatar, index) => (
                <img
                  key={`avatar-${index}`}
                  className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white ${index > 0 ? '-ml-2 sm:-ml-3' : ''}`}
                  alt="User avatar"
                  src={avatar.src}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#ee0faf] fill-current" />
              <div className="text-sm sm:text-base lg:text-lg font-bold">
                <span className="text-[#ee0faf]">33k</span>
                <span className="text-white"> Likes</span>
              </div>
            </div>
          </div>

          {/* Songs Count */}
          <div className="flex items-center gap-2 sm:gap-3">
            <MusicIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            <div className="text-sm sm:text-base lg:text-lg font-bold">
              <span className="text-[#ee0faf]">50M+</span>
              <span className="text-white"> Songs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
