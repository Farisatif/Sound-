import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";

import { Layout } from "./components/Layout/Layout";
import { Home } from "./screens/Home/Home";
import { Login } from "./screens/Login/Login";
import { Signup } from "./screens/Signup/Signup";
import { ForgotPassword } from "./screens/ForgotPassword/ForgotPassword";
import { Discover } from "./screens/Discover/Discover";
import { Albums } from "./screens/Albums/Albums";
import { Playlists } from "./screens/Playlists/Playlists";
import { Favorites } from "./screens/Favorites/Favorites";
import { About } from "./screens/About/About";
import { Contact } from "./screens/Contact/Contact";
import { MusicPlayer } from "./screens/MusicPlayer/MusicPlayer";
import {Footer} from "./components/Layout/Footer"
import { SignUpSection } from "./screens/Home/sections/SignUpSection/SignUpSection";
import { ArtistsPage } from "./screens/artists/ArtistsPage";
import { ArtistPage } from "./screens/artists/ArtistPage";
import { Trending } from "./screens/Trending/Trending";
import { GenreSongs  } from "./screens/Genres/Genres";
import { GenreDetails } from "./screens/GenreDetails/GenreDetails";
import { CreatePlaylist } from "./screens/Playlists/CreatePlaylist";
import { PlaylistDetails } from "./screens/Playlists/PlaylistDetails/PlaylistDetails";
import { FooterSection } from "./screens/Home/sections/FooterSection/FooterSection";
import { Feedback } from "./screens/FeedBack/FeedBack";
import { Sitemap } from "./screens/Home/sections/Sitemap/Sitemap";
import { PlaylistPage } from "./screens/Playlists/PlaylistPage";



// حماية المسارات التي تتطلب تسجيل الدخول
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <MusicPlayerProvider>
          <Router>
            {/* Section SignUp أعلى الصفحة */}
            <SignUpSection />

            <Routes>
              {/* مسارات عامة */}
              <Route path="/playlistpage" element={<PlaylistPage />} /> 
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/playlists/:id" element={<PlaylistDetails />} />
              <Route path="/playlist/:id" element={<PlaylistDetails />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/artist/:artistId" element={<ArtistPage />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/genres" element={<GenreSongs />} />
              <Route path="/genres/:slug" element={<GenreDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/playlists/create" element={<CreatePlaylist />} />
              {/* مشغل الموسيقى */}
              <Route path="/player/:songId" element={<MusicPlayer />} />

              {/* صفحات تحت الـ Layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="discover" element={<Discover />} />
                <Route path="albums" element={<Albums />} />
                <Route path="playlists" element={<Playlists />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="music-player" element={<MusicPlayer />} />
              </Route>
            </Routes>

            {/* Footer ثابت */}
             <Footer />
             <FooterSection/>
          </Router>
        </MusicPlayerProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
