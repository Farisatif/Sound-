// src/screens/Gallery/Gallery.tsx
import { useState } from "react";
import images from "../../data/gallery.json"; // ملف JSON فيه الصور
import { Dialog } from "@headlessui/react";

export const Gallery: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

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
            className="w-full h-48 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelected(img.url)}
          />
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <Dialog.Panel>
          <img src={selected!} alt="Selected" className="max-h-[80vh] rounded-lg" />
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};
