import "./footer.css";

export function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} <strong>X-Streamers</strong> - construído com ❤️ e ☕ por{" "}
        <strong>
          <a href="https://github.com/romaosantosalisson" target="_blank">
            Álisson
          </a>
        </strong>
      </p>
    </footer>
  );
}
