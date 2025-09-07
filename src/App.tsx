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
import { MusicPlayer as MusicPlayerScreen } from "./screens/MusicPlayer/MusicPlayer";
import { FooterSection } from "./screens/Home/sections/FooterSection/FooterSection";
import { SignUpSection } from "./screens/Home/sections/SignUpSection/SignUpSection";
import { ArtistsPage } from "./screens/artists/ArtistsPage";
import { ArtistPage } from "./screens/artists/ArtistPage";

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
            <SignUpSection />

            <Routes>

              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/artist/:artistId" element={<ArtistPage />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/player/:songId" element={<MusicPlayerScreen />} />

              {/* صفحات تحت Layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="discover" element={<Discover />} />
                <Route path="albums" element={<Albums />} />
                <Route path="playlists" element={<Playlists />} />
                <Route path="favorites" element={<Favorites />} />
                <Route
                  path="most-played"
                  element={
                    <div className="text-white p-8 min-h-screen flex items-center justify-center">
                      <h1 className="text-2xl">Most Played - Coming Soon</h1>
                    </div>
                  }
                />
              </Route>
            </Routes>

            {/* Footer ثابت */}
            <FooterSection />
          </Router>
        </MusicPlayerProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
