import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/MainLayout";
import { SearchFavoriteis } from "./pages/SearchFavoriteis";
import { StreamerProfile } from "./pages/ProfileStreamer";
import { useState } from "react";
import type { StreamerType } from "./types";

export function App() {
  const [streamers, setStreamers] = useState<StreamerType[]>([]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home streamers={streamers} setStreamers={setStreamers} />} />
        <Route
          path="/streamer/:username"
          element={<StreamerProfile streamers={streamers} setStreamers={setStreamers} />}
        />
        <Route path="/search-favoriteis" element={<SearchFavoriteis />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
