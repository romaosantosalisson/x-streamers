import { useState, type FormEvent, type ChangeEvent } from "react";
import { API_CHESS_PROFILE_PLAYER } from "../../utils/apiChess";
import type { StreamerFavorite } from "../../types";
import {
  Search,
  Users,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  Award,
  UserX,
  AlertTriangle,
  Globe,
  Tv,
} from "lucide-react";
import "./searchFavoriteis.css";

export function SearchFavoriteis() {
  const [usernameInput, setUsernameInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamer, setStreamer] = useState<StreamerFavorite | null>(null);
  const [errorType, setErrorType] = useState<"not_found" | "api_error" | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSearch = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const trimmedUsername = usernameInput.trim();

    if (!trimmedUsername) {
      setValidationError("Informe um username para realizar a busca.");
      return;
    }

    setValidationError(null);
    setLoading(true);
    setStreamer(null);
    setErrorType(null);
    setSearchQuery(trimmedUsername);

    try {
      const response = await fetch(`${API_CHESS_PROFILE_PLAYER}/${trimmedUsername}`);

      if (response.status === 404) {
        setErrorType("not_found");
        return;
      }

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const data: StreamerFavorite = await response.json();
      setStreamer(data);
      setUsernameInput("");
    } catch (error) {
      console.error("❌ Erro ao buscar dados do Streamer na API:", error);
      setErrorType("api_error");
    } finally {
      setLoading(false);
    }
  };

  const getCountryCode = (countryUrl?: string) => {
    if (!countryUrl) return "";
    const segments = countryUrl.split("/");
    return segments[segments.length - 1] || "";
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatFollowers = (count?: number) => {
    if (count === undefined) return "0";
    return count.toLocaleString("pt-BR");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value);
    if (validationError) {
      setValidationError(null);
    }
  };

  return (
    <div className="search-page-wrapper">
      <div className="search-header">
        <h1>Buscar Streamer Favorito</h1>
        <p className="search-subtitle">
          Pesquise por qualquer jogador do Chess.com para ver seu perfil completo e informações de
          transmissão.
        </p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="search"
            name="favorite"
            id="favorite"
            placeholder="Digite o username do streamer..."
            value={usernameInput}
            onChange={handleInputChange}
            disabled={loading}
            className={`search-input ${validationError ? "input-error" : ""}`}
            aria-label="Username do streamer"
          />
          <button
            type="submit"
            className="search-submit-btn not-allowed"
            disabled={loading}
            aria-label="Buscar streamer"
          >
            <Search size={18} />
            <span className={`${!loading ? "bold" : "white-bold"}`}>
              {loading ? "Buscando..." : "Buscar"}
            </span>
          </button>
        </div>
        {validationError && (
          <div className="validation-error-message" role="alert">
            {validationError}
          </div>
        )}
      </form>

      <div className="search-content-area">
        {!loading && !streamer && !errorType && (
          <div className="search-state-card initial-state">
            <div className="state-icon-container">
              <Search size={40} className="state-icon" />
            </div>
            <h3>Encontre seu Streamer</h3>
            <p>
              Digite o nome de usuário (username) exato do streamer no campo de busca acima para
              carregar suas informações.
            </p>
          </div>
        )}
        {loading && (
          <div className="search-state-card loading-state">
            <div className="spinner" />
            <h3>Buscando streamer favorito...</h3>
            <p>Aguarde um momento</p>
          </div>
        )}
        {!loading && errorType === "not_found" && (
          <div className="search-state-card not-found-state">
            <div className="state-icon-container alert-icon">
              <UserX size={40} />
            </div>
            <h3>Streamer Não Encontrado</h3>
            <p>
              Não encontramos nenhum streamer com o username{" "}
              <strong className="highlight-username">"{searchQuery}"</strong>.
            </p>
            <span className="state-guidance">
              Verifique a ortografia do nome do usuário e tente novamente.
            </span>
          </div>
        )}
        {!loading && errorType === "api_error" && (
          <div className="search-state-card error-state">
            <div className="state-icon-container error-icon">
              <AlertTriangle size={40} />
            </div>
            <h3>Erro de Conexão</h3>
            <p>Não foi possível buscar o streamer no momento. Tente novamente mais tarde.</p>
            <button type="button" onClick={() => handleSearch()} className="retry-btn">
              Tentar Novamente
            </button>
          </div>
        )}
        {!loading && streamer && (
          <div className="streamer-favorite-card-container">
            <div className="streamer-fav-card">
              <div className="fav-card-header">
                <div className="fav-avatar-container">
                  {streamer.avatar ? (
                    <img
                      src={streamer.avatar}
                      alt={`Foto de ${streamer.username}`}
                      className="fav-avatar"
                    />
                  ) : (
                    <div className="fav-avatar-fallback">
                      {streamer.username.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="fav-info">
                  <div className="username-row">
                    <h2>{streamer.username}</h2>
                    {streamer.verified && (
                      <span className="verified-badge-icon" title="Conta Verificada">
                        <ShieldCheck size={20} color="var(--accent)" fill="var(--accent-bg)" />
                      </span>
                    )}
                    {streamer.title && (
                      <span className="title-tag" title={`Título de Xadrez: ${streamer.title}`}>
                        {streamer.title}
                      </span>
                    )}
                  </div>

                  {streamer.name && <p className="full-name">{streamer.name}</p>}

                  <div className="header-badges">
                    <span className={`status-badge ${streamer.status}`}>
                      Status: {streamer.status}
                    </span>
                    {streamer.is_streamer && (
                      <span className="streamer-badge">Streamer Oficial</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="fav-card-body">
                <h3 className="section-title">Informações do Perfil</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <div className="detail-label">
                      <Users size={16} />
                      <span>Seguidores</span>
                    </div>
                    <div className="detail-value">{formatFollowers(streamer.followers)}</div>
                  </div>

                  {streamer.location && (
                    <div className="detail-item">
                      <div className="detail-label">
                        <MapPin size={16} />
                        <span>Localização</span>
                      </div>
                      <div className="detail-value">{streamer.location}</div>
                    </div>
                  )}

                  {streamer.country && (
                    <div className="detail-item">
                      <div className="detail-label">
                        <Globe size={16} />
                        <span>País (Código)</span>
                      </div>
                      <div className="detail-value">{getCountryCode(streamer.country)}</div>
                    </div>
                  )}

                  {streamer.league && (
                    <div className="detail-item">
                      <div className="detail-label">
                        <Award size={16} />
                        <span>Liga</span>
                      </div>
                      <div className="detail-value">{streamer.league}</div>
                    </div>
                  )}

                  <div className="detail-item">
                    <div className="detail-label">
                      <Calendar size={16} />
                      <span>Membro desde</span>
                    </div>
                    <div className="detail-value">{formatDate(streamer.joined)}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      <Clock size={16} />
                      <span>Última vez online</span>
                    </div>
                    <div className="detail-value">{formatDate(streamer.last_online)}</div>
                  </div>
                </div>

                <div className="platforms-section">
                  <h3 className="section-title">Plataformas de Transmissão</h3>
                  {streamer.streaming_platforms && streamer.streaming_platforms.length > 0 ? (
                    <div className="platforms-list">
                      {streamer.streaming_platforms.map((platform, idx) => (
                        <div key={idx} className="platform-item">
                          <div className="platform-meta">
                            <Tv size={18} className="platform-icon" />
                            <span className="platform-name">{platform.type}</span>
                          </div>
                          <a
                            href={platform.channel_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="platform-link-btn"
                          >
                            Visitar Canal <ExternalLink size={14} style={{ marginLeft: "4px" }} />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-platforms-msg">
                      Nenhuma plataforma de transmissão registrada.
                    </p>
                  )}
                </div>
              </div>

              <div className="fav-card-actions">
                {streamer.twitch_url && (
                  <a
                    href={streamer.twitch_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fav-action-btn twitch-btn"
                  >
                    Ver na Twitch
                  </a>
                )}
                {streamer.url && (
                  <a
                    href={streamer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fav-action-btn chess-btn"
                  >
                    <ExternalLink size={18} style={{ marginRight: "8px" }} />
                    Perfil no Chess.com
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
