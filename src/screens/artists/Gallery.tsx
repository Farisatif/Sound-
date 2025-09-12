// src/screens/Gallery/Gallery.tsx
import { useState } from "react";
import data from "../../data/songs.json";
import { Dialog } from "@headlessui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react"; 

export const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // جمع الصور من كل الأقسام
  const images = [
    ...data.weeklyTopSongs.map((s) => ({ title: s.title, url: s.image })),
    ...data.newReleaseSongs.map((s) => ({ title: s.title, url: s.image })),
    ...data.trendingSongs.map((s) => ({ title: s.title, url: s.image })),
  ];

  const handlePrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  };

  const handleNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>

      {/* Grid الصور */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={img.title}
            className="w-full h-48 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-md"
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>

      {/* Lightbox */}
      <Dialog
        open={currentIndex !== null}
        onClose={() => setCurrentIndex(null)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* الخلفية */}
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

        {currentIndex !== null && (
          <Dialog.Panel className="relative flex items-center justify-center">
            {/* زر الإغلاق */}
            <button
              onClick={() => setCurrentIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition"
            >
              <X size={32} />
            </button>

            {/* زر السابق */}
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white hover:text-gray-300 transition"
            >
              <ChevronLeft size={48} />
            </button>

            {/* الصورة */}
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="max-h-[85vh] max-w-[90vw] rounded-lg shadow-xl"
            />

            {/* زر التالي */}
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 transition"
            >
              <ChevronRight size={48} />
            </button>
          </Dialog.Panel>
        )}
      </Dialog>
    </div>
  );
};
