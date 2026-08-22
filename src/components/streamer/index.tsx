import "./streamer.css";
import "./streamer.css";
import type { StreamerType } from "../../types";
import { NavLink } from "react-router-dom";
import { GlobeCheckIcon, GlobeOffIcon } from "lucide-react";

type StreamerProps = {
  streamer: StreamerType;
};

export function Streamer({ streamer }: StreamerProps) {
  return (
    <div className="card">
      <div className="badges-container">
        <span className={`badge ${streamer.is_live ? "live" : "offline"}`}>
          {streamer.is_live ? "Ao Vivo" : "Offline"}
        </span>
        {streamer.is_community_streamer && <span className="badge community">Comunidade</span>}
      </div>
      <div className="streamer-avatar-container">
        <img
          className="streamer-image"
          src={streamer.avatar}
          alt={`Foto de ${streamer.username}`}
        />
      </div>

      <div className="streamer-info">
        <h3>{streamer.username}</h3>
        <p>
          {streamer.is_live ? (
            <>
              <GlobeCheckIcon color="var(--danger)" size={20} />
              <span className="green">Ao Vivo</span>
            </>
          ) : (
            <>
              <GlobeOffIcon color="var(--muted)" size={20} />
              <span className="muted">Offline</span>
            </>
          )}
        </p>
      </div>

      <NavLink to={`/streamer/${streamer.username}`} state={{ streamer }} className="details-link">
        <button type="button">Ver Detalhes</button>
      </NavLink>
    </div>
  );
}
