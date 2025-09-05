import {
  AlbumIcon,
  ClockIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  ListIcon,
  PlusIcon,
  TrendingUpIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

const menuItems = [
  {
    icon: HomeIcon,
    label: "Home",
    isActive: true,
  },
  {
    icon: CompassIcon,
    label: "Discover",
    isActive: false,
  },
  {
    icon: AlbumIcon,
    label: "Albums",
    isActive: false,
  },
  {
    icon: UserIcon,
    label: "Artists",
    isActive: false,
  },
];

const libraryItems = [
  {
    icon: ClockIcon,
    label: "Recently Added",
    isActive: false,
  },
  {
    icon: TrendingUpIcon,
    label: "Most played",
    isActive: false,
  },
];

const playlistItems = [
  {
    icon: HeartIcon,
    label: "Your favorites",
    isActive: false,
  },
  {
    icon: ListIcon,
    label: "Your playlist",
    isActive: false,
  },
  {
    icon: PlusIcon,
    label: "Add playlist",
    isActive: false,
    isSpecial: true,
  },
];

export const SignUpSection = (): JSX.Element => {
  return (
    <nav className="flex flex-col w-full items-start gap-6 pl-16 pr-8 pt-12 pb-12 bg-[#0e010b] border-r-2 [border-right-style:solid] border-[#ee0faf] shadow-[8px_0px_24.2px_#ee0faf26] min-h-screen">
      <img
        className="relative w-[62px] h-[60px] object-cover"
        alt="Picsart"
        src="https://c.animaapp.com/mecj8w01EfvOiv/img/picsart-25-08-07-15-22-00-238--1--1.png"
      />

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <h1 className="bg-[linear-gradient(91deg,rgba(238,16,176,1)_0%,rgba(14,158,239,0.92)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] relative flex-1 mt-[-1.00px] font-h1 font-[number:var(--h1-font-weight)] text-transparent leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
          SoundBast
        </h1>
      </div>

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
          Menu
        </div>
      </div>

      <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        {menuItems.map((item, index) => (
          <div
            key={`menu-${index}`}
            className={`flex flex-col h-10 items-start justify-center gap-2 px-2 py-0.5 relative self-stretch w-full rounded-[9px] ${item.isActive ? "bg-[#ee0faf]" : ""}`}
          >
            <Button
              variant="ghost"
              className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] h-auto p-0 hover:bg-transparent"
            >
              <item.icon className="relative w-4 h-4 text-white" />
              <span className="flex-1 h-7 font-[number:var(--h3-font-weight)] text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] relative mt-[-1.00px] font-h3 text-white leading-[var(--h3-line-height)] [font-style:var(--h3-font-style)] text-left">
                {item.label}
              </span>
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
          Library
        </div>
      </div>

      {libraryItems.map((item, index) => (
        <Button
          key={`library-${index}`}
          variant="ghost"
          className="gap-2 flex items-center relative self-stretch w-full flex-[0_0_auto] h-auto p-0 hover:bg-transparent justify-start"
        >
          <item.icon className="relative w-4 h-4 text-white" />
          <span className="relative flex-1 h-[22px] mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-left">
            {item.label}
          </span>
        </Button>
      ))}

      <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] opacity-60 font-text-small font-[number:var(--text-small-font-weight)] text-[#ee0faf] text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
          Playlist and favorite
        </div>
      </div>

      {playlistItems.map((item, index) => (
        <Button
          key={`playlist-${index}`}
          variant="ghost"
          className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] h-auto p-0 hover:bg-transparent justify-start"
        >
          <item.icon className="relative w-4 h-4 text-white" />
          <span
            className={`relative flex-1 h-[23px] mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-left ${item.isSpecial ? "text-[#0d9eef]" : "text-white"}`}
          >
            {item.label}
          </span>
        </Button>
      ))}
    </nav>
  );
};
