import "./error.css";

export function Error() {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>

      <h3>Ops! Algo deu errado</h3>

      <p>
        Não conseguimos carregar os dados dos streamers.
        <br />
        Tente novamente em alguns instantes.
      </p>

      <button onClick={() => window.location.reload()}>Tentar novamente</button>
    </div>
  );
}
