import "../../../../index.css"
const footerColumns = [
  {
    title: "SoundBlast",
    titleClass:
      "text-2xl text-center tracking-[-0.12px] [font-family:'Vazirmatn',Helvetica] font-bold text-transparent leading-[normal]",
    titleSpans: [
      { text: "Sound", className: "text-white tracking-[-0.03px]" },
      { text: "Blast", className: "text-[#ee0faf] tracking-[-0.03px]" },
    ],
    links: [
      {
        text: "Songs",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
      {
        text: "Radio",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
      {

        text: "Podcast",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
    ],
  },
  {
    title: "Access",
    titleClass:
      "flex-1 font-bold text-2xl text-center tracking-[-0.12px] [font-family:'Vazirmatn',Helvetica] text-white leading-[normal]",
    links: [
      {
        text: "Explor",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
      {
        text: "Artists",
        className:
          "font-normal text-center tracking-[-0.08px] [font-family:'Vazirmatn',Helvetica] text-white text-base leading-[normal]",
      },
      {
        text: "Playlists",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
      {
        text: "Albums",
        className:
          "font-normal text-center tracking-[-0.08px] [font-family:'Vazirmatn',Helvetica] text-white text-base leading-[normal]",
      },
      {
        text: "Trending",
        className:
          "flex-1 font-normal text-white text-base text-center tracking-[-0.08px] [font-family:'Vazirmatn',Helvetica] leading-[normal]",
      },
    ],
  },
  {
    title: "Contact",
    titleClass:
      "w-fit font-bold text-2xl text-right tracking-[-0.12px] [font-family:'Vazirmatn',Helvetica] text-white leading-[normal]",
    links: [
      {
        text: "About",
        className:
          "font-normal text-base text-center tracking-[-0.08px] [font-family:'Vazirmatn',Helvetica] text-white leading-[normal]",
      },
      {
        text: "Policy",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
      {
        text: "Social Media",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
      {
        text: "Soppurt",
        className:
          "[font-family:'Vazirmatn',Helvetica] font-normal text-white text-base text-center tracking-[-0.08px] leading-[normal]",
      },
    ],
  },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-100% h-[28rem] bg-transparent shadow-[0px_-17px_22.7px_#00000040] relative ">
      <div className=" relative w-[100%] h-[28rem] bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/background.png)] bg-[100%_100%]">
        <div className="flex flex-col w-[35%] items-start absolute top-48 left-[20px]">
          <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="font-black text-[2rem] tracking-[0.26px] relative flex-1 mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] text-white leading-[normal]">
              About
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex-1 h-[150px] mt-[-1.00px] [text-shadow:0px_2px_4px_#00000059] opacity-90 [font-family:'Vazirmatn',Helvetica] font-normal text-transparent text-base text-justify tracking-[0] leading-4">
              <span className="text-white">Sound</span>
              <span className="text-[#ee0faf] leading-[0.1px]">Blast</span>
              <span className="text-white">
                {" "}
                is a website that has been created for over{" "}
              </span>
              <span className="text-[#ee0faf] font-text-medium [font-style:var(--text-medium-font-style)] font-[number:var(--text-medium-font-weight)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] text-[length:var(--text-medium-font-size)]">
                5 year&apos;s
              </span>
              <span className="text-white">
                {" "}
                now and it is one of the most famous music player website&apos;s
                in the world. in this website you can listen and download songs
                for free. also of you want no limitation you can buy our{" "}
              </span>
              <span className="text-[#0d9eef] font-text-medium [font-style:var(--text-medium-font-style)] font-[number:var(--text-medium-font-weight)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] text-[length:var(--text-medium-font-size)]">
                premium pass&apos;s.
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-[20%] items-start justify-center gap-[1rem] absolute top-[110px] left-[670px]">
          {footerColumns.map((column, index) => (
            <div
              key={index}
              className="flex items-start gap-6 relative flex-1 grow"
            >
              <div className="flex flex-col items-center gap-2 relative flex-1 grow">
                <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className={column.titleClass}>
                      {column.titleSpans
                        ? column.titleSpans.map((span, spanIndex) => (
                            <span key={spanIndex} className={span.className}>
                              {span.text}
                            </span>
                          ))
                        : column.title}
                    </div>
                  </div>

                  <img
                    className="relative self-stretch w-full h-[3px]"
                    alt="Line"
                    src="https://c.animaapp.com/mecm5afmnFTEcQ/img/line-3.svg"
                  />
                </div>

                <div className="flex flex-col items-center justify-center relative self-stretch w-full flex-[0_0_auto]">
                  {column.links.map((link, linkIndex) => (
                    <div
                      key={linkIndex}
                      className="flex items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto]"
                    >
                      <div
                        className={`relative flex-1 mt-[-1.00px] ${link.className}`}
                      >
                        {link.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-[241px] items-center gap-[25px] absolute top-[110px] left-[1180px]">
          <div className="flex items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] bg-[linear-gradient(91deg,rgba(238,16,176,1)_0%,rgba(14,158,239,0.92)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-t1 font-[number:var(--t1-font-weight)] text-transparent text-[length:var(--t1-font-size)] tracking-[var(--t1-letter-spacing)] leading-[var(--t1-line-height)] [font-style:var(--t1-font-style)]">
              SoundBlast
            </div>
          </div>

          <img
            className="relative self-stretch w-full flex-[0_0_auto]"
            alt="Frame"
            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/frame-30.svg"
          />
        </div>
      </div>
    </footer>
  );
};
