import "../../../../index.css";

const footerColumns = [
  {
    title: "SoundBlast",
    titleSpans: [
      { text: "Sound", className: "text-white" },
      { text: "Blast", className: "text-[#ee0faf]" },
    ],
    links: ["Songs", "Radio", "Podcast"],
  },
  {
    title: "Access",
    links: ["Explor", "Artists", "Playlists", "Albums", "Trending"],
  },
  {
    title: "Contact",
    links: ["About", "Policy", "Social Media", "Support"],
  },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="relative p-1 bg-gray-900 text-gray-300 mt-auto shadow-[0px_-10px_20px_#00000040]">
      <div className="w-full bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/background.png)] bg-cover bg-center">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* About */}
          <div>
            <h2 className="font-black text-2xl text-white mb-4">About</h2>
            <p className="text-sm leading-6 text-justify text-gray-200">
              <span className="text-white">Sound</span>
              <span className="text-[#ee0faf]">Blast</span> is a website that has
              been created for over{" "}
              <span className="text-[#ee0faf] font-semibold">5 years</span>. It
              is one of the most famous music player websites in the world. You
              can listen and download songs for free. If you want no limitation,
              you can buy our{" "}
              <span className="text-[#0d9eef] font-semibold">premium pass</span>.
            </p>
          </div>

          {/* Dynamic Columns */}
          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-bold text-white mb-3">
                {col.titleSpans ? (
                  <>
                    {col.titleSpans.map((span, i) => (
                      <span key={i} className={span.className}>
                        {span.text}
                      </span>
                    ))}
                  </>
                ) : (
                  col.title
                )}
              </h3>
              <div className="w-12 h-[3px] bg-gradient-to-r from-[#ee0faf] to-[#0d9eef] mb-4"></div>
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-[#ee0faf] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Logo */}
        <div className="border-t border-gray-700 py-6 flex justify-center">
          <h2 className="bg-gradient-to-r from-[#ee10b0] to-[#0e9eef] bg-clip-text text-transparent text-3xl font-bold">
            SoundBlast
          </h2>
        </div>
      </div>
    </footer>
  );
};
