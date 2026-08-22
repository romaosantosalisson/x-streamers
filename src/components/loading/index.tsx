import "./loading.css";

export function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <h3>Carregando streamers...</h3>
      <span>Aguarde um momento</span>
    </div>
  );
}
