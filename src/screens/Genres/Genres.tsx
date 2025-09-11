// src/pages/genres/GenreSongs.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import newSongsData from "../../data/songs.json";      // الصورة قد تكون في حقل `image`
import oldSongsData from "../../data/oldSongs.json";  // الصورة في حقل `img`
import { Button } from "../../components/ui/button";

type RawSong = any;

interface Song {
  id: number;
  title: string;
  artist?: string;
  genre?: string;
  year?: string;
  path?: string;   // audio source
  image?: string | null; // unified image field
  duration?: string;
}

// يحوّل مسار الصورة/الصوت من أشكال نسبية مثل ../songs/x إلى مسار عام يعمل في المتصفح
const normalizeMediaPath = (p?: string | null) => {
  if (!p) return null;
  const trimmed = p.trim();

  // إذا هو رابط كامل
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // أمثلة في بياناتك: "../songs/o1.jpg" أو "../songs/o1.mp3"
  // نرغب بتحويل ../songs/... => /songs/...
  // يفترض أن تضع الملفات في public/songs/
  const relMatch = trimmed.match(/(?:\.\.\/)+(.+)$/);
  if (relMatch && relMatch[1]) {
    return `/${relMatch[1].replace(/^\/+/, "")}`; // e.g. "/songs/o1.jpg"
  }

  // إذا بدأ بـ "./" نزيلها ونجعلها مسار نسبي من الجذر
  if (trimmed.startsWith("./")) return `/${trimmed.slice(2)}`;

  // إذا بدأ بـ "/" نعيده كما هو
  if (trimmed.startsWith("/")) return trimmed;

  // كحالة افتراضية جرب أن تضعها داخل /songs/
  return `/songs/${trimmed}`;
};

// دمج ومواءمة شكل البيانات القديم والجديد إلى مصفوفة موحّدة
const buildUnifiedList = (): Song[] => {
  const list: Song[] = [];

  // 1) newSongsData قد يحوي weeklyTopSongs/newReleaseSongs/trendingSongs أو مصفوفة مباشرة
  if (Array.isArray(newSongsData)) {
    (newSongsData as RawSong[]).forEach((s) => {
      list.push({
        id: Number(s.id),
        title: s.title ?? s.name ?? "Unknown",
        artist: s.artist,
        genre: s.genre,
        year: s.releaseDate ?? s.year,
        path: normalizeMediaPath(s.path ?? s.url),
        image: normalizeMediaPath(s.image ?? s.cover ?? s.img ?? null),
        duration: s.duration,
      });
    });
  } else {
    // نمط الكائن (كما أرسلت)
    const arrays = [
      (newSongsData as any).weeklyTopSongs,
      (newSongsData as any).newReleaseSongs,
      (newSongsData as any).trendingSongs,
      (newSongsData as any).songs,
    ];
    arrays.forEach((arr) => {
      if (Array.isArray(arr)) {
        arr.forEach((s: any) =>
          list.push({
            id: Number(s.id),
            title: s.title ?? s.name ?? "Unknown",
            artist: s.artist,
            genre: s.genre,
            year: s.releaseDate ?? s.year,
            path: normalizeMediaPath(s.path ?? s.url),
            image: normalizeMediaPath(s.image ?? s.cover ?? s.img ?? null),
            duration: s.duration,
          })
        );
      }
    });
  }

  // 2) أضف بيانات oldSongs.json إن وُجدت (تحوّل الحقول img -> image و path)
  if (Array.isArray(oldSongsData)) {
    (oldSongsData as RawSong[]).forEach((s) =>
      list.push({
        id: Number(s.id),
        title: s.title ?? "Unknown",
        artist: s.artist,
        genre: s.genre,
        year: s.year,
        path: normalizeMediaPath(s.path ?? s.audio),
        image: normalizeMediaPath(s.img ?? s.image ?? null),
        duration: s.duration,
      })
    );
  }

  // ازالة المكررات حسب id (اختر أول ظهور)
  const seen = new Set<number>();
  return list.filter((s) => {
    if (!s || isNaN(Number(s.id))) return false;
    const id = Number(s.id);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};

export const GenreSongs: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const allSongs = buildUnifiedList();

  // فلترة بسيطة: إذا slug موجود نفلتر بحسب genre أو السنة أو اسم الفنان (يمكن تعديل)
  const filtered = slug
    ? allSongs.filter(
        (s) =>
          (s.genre ?? "").toString().toLowerCase() === slug.toString().toLowerCase()
      )
    : allSongs;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-6">{(slug ?? "All").toString().toUpperCase()} Songs</h1>

      {filtered.length > 0 ? (
        <ul className="space-y-3">
          {filtered.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[#111] hover:bg-[#1f1f1f] transition cursor-pointer"
            >
              <div
                className="flex items-center gap-3"
                onClick={() => navigate(`/player/${song.id}`)}
              >
                <img
                  src={song.image ?? "/placeholder-50.png"}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.src = "/placeholder-50.png";
                    // console.warn(`image failed: ${song.image}`);
                  }}
                />
                <div>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-white/70">{song.artist}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    // تنقّل عند الضغط مع تمرير id
                    navigate(`/player/${song.id}`);
                  }}
                >
                  Play
                </Button>
                {/* زر تحميل/فتح الملف الصوتي مباشرة (إن وُجد path) */}
                {song.path ? (
                  <a
                    href={song.path}
                    download
                    className="text-sm text-white/60 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white/60">No songs available in this genre.</p>
      )}
    </div>
  );
};

export default GenreSongs;
