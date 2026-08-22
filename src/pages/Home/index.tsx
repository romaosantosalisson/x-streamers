import "./home.css";
import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { Streamer } from "../../components/streamer";
import type { StreamersResponse, StreamerType } from "../../types";
import { API_CHESS_ALL_STREAMERS } from "../../utils/apiChess";
import { Loading } from "../../components/loading";
import { Error as ErrorMessage } from "../../components/error";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HomeProps = {
  streamers: StreamerType[];
  setStreamers: Dispatch<SetStateAction<StreamerType[]>>;
};

export function Home({ streamers, setStreamers }: HomeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showStreamersOnline, setShowStreamersOnline] = useState<boolean>(false);
  const [showStreamersOffline, setShowStreamersOffline] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  async function loadStreamers(): Promise<StreamerType[]> {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(API_CHESS_ALL_STREAMERS);

      if (!response.ok) {
        throw new Error("Error ao buscar Streamers...");
      }

      const data: StreamersResponse = await response.json();

      return data.streamers;
    } catch (error) {
      setError(true);
      console.error("❌ Error ao buscar dados sobre Streamers...", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getStreamers() {
      const streamersLoad = await loadStreamers();
      setStreamers(streamersLoad!);
    }

    getStreamers();
  }, [setStreamers]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const filteredStreamers = streamers.filter((streamer) => {
    if (!showStreamersOnline && !showStreamersOffline) {
      return true;
    }

    if (showStreamersOnline && !showStreamersOffline) {
      return streamer.is_live;
    }

    if (!showStreamersOnline && showStreamersOffline) {
      return !streamer.is_live;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredStreamers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <>
      <div className="header-container">
        <h2>
          Lista de Streamers • <span>{filteredStreamers.length} Streamers</span> • Página{" "}
          {currentPage} - {totalPages}
        </h2>
        <div className="filters-container">
          <p>Filtros:</p>
          <label className="input-group">
            <input
              type="checkbox"
              name="online"
              checked={showStreamersOnline}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setShowStreamersOnline(event.target.checked)
              }
            />
            Ao Vivo
          </label>
          <label className="input-group">
            <input
              type="checkbox"
              name="offline"
              checked={showStreamersOffline}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setShowStreamersOffline(event.target.checked)
              }
            />
            Offline
          </label>
        </div>
      </div>
      <div className="streamer-grid">
        {filteredStreamers
          .map((streamer) => <Streamer key={streamer.username} streamer={streamer} />)
          .slice(startIndex, startIndex + itemsPerPage)}
      </div>
      <div className="pagination-actions">
        {currentPage > 1 && (
          <ChevronLeft
            color="currentColor"
            size="40"
            onClick={() => setCurrentPage((page) => page - 1)}
          />
        )}
        {currentPage < totalPages && (
          <ChevronRight
            color="currentColor"
            size="40"
            onClick={() => setCurrentPage((page) => page + 1)}
          />
        )}
      </div>
    </>
  );
}
