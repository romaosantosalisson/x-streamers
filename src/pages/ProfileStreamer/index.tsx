import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { StreamersResponse, StreamerType } from "../../types";
import { API_CHESS_ALL_STREAMERS } from "../../utils/apiChess";
import { Loading } from "../../components/loading";
import { Error as ErrorMessage } from "../../components/error";
import "./streamerProfile.css";
import { GlobeCheckIcon, GlobeOffIcon } from "lucide-react";

type StreamerProfileProps = {
  streamers: StreamerType[];
  setStreamers: Dispatch<SetStateAction<StreamerType[]>>;
};

export function StreamerProfile({ streamers, setStreamers }: StreamerProfileProps) {
  const { username } = useParams<{ username: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  let streamer = location.state?.streamer as StreamerType | undefined;

  if (!streamer) {
    streamer = streamers.find((s) => s.username.toLowerCase() === username?.toLowerCase());
  }

  const [fetchedStreamer, setFetchedStreamer] = useState<StreamerType | undefined>(undefined);

  const activeStreamer = streamer || fetchedStreamer;

  useEffect(() => {
    if (activeStreamer) return;

    async function fetchStreamerFromApi() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(API_CHESS_ALL_STREAMERS);

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do Streamer...");
        }

        const data: StreamersResponse = await response.json();

        setStreamers(data.streamers);

        const foundInApi = data.streamers.find(
          (s) => s.username.toLowerCase() === username?.toLowerCase(),
        );

        if (foundInApi) {
          setFetchedStreamer(foundInApi);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("❌ Erro ao buscar dados do Streamer na API:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStreamerFromApi();
  }, [username, activeStreamer, setStreamers]);

  if (loading) {
    return <Loading />;
  }

  if (error || !activeStreamer) {
    return <ErrorMessage />;
  }

  return (
    <div className="profile-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <img src={activeStreamer.avatar} alt={`Foto de ${activeStreamer.username}`} />
          </div>
          <div className="profile-info">
            <h2>{activeStreamer.username}</h2>
            <div className="badges">
              <span className={`badge ${activeStreamer.is_live ? "live" : "offline"}`}>
                {activeStreamer.is_live ? (
                  <>
                    <GlobeCheckIcon color="red" size={20} />
                    Ao Vivo
                  </>
                ) : (
                  <>
                    <GlobeOffIcon color="gray" size={20} />
                    Offline
                  </>
                )}
              </span>
              {activeStreamer.is_community_streamer && (
                <span className="badge community">Comunidade</span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-details">
          <h3>Plataformas de Transmissão</h3>
          <div className="platforms-list">
            {activeStreamer.platforms?.map((platform, idx) => (
              <div key={idx} className="platform-item">
                <div className="platform-meta">
                  <span className="platform-name">{platform.type}</span>
                  {platform.is_main_live_platform && (
                    <span className="main-platform-label">Principal</span>
                  )}
                </div>
                <div className="platform-status">
                  {platform.is_live ? (
                    <span className="platform-live-indicator">• Em live</span>
                  ) : (
                    <span className="platform-offline-indicator">• Offline</span>
                  )}
                </div>
                <a
                  href={platform.channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-link-btn"
                >
                  Visitar Canal
                </a>
              </div>
            ))}
          </div>

          <div className="profile-actions">
            {activeStreamer.twitch_url && (
              <a
                href={activeStreamer.twitch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn twitch-btn"
              >
                Ver na Twitch
              </a>
            )}
            {activeStreamer.url && (
              <a
                href={activeStreamer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn chess-btn"
              >
                Perfil no Chess.com
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
