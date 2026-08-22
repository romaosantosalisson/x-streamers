import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";

export function Header() {
  const location = useLocation();

  const menuItems = [
    {
      id: "#home",
      label: "Início",
      link: "/",
    },
    {
      id: "#search-favoriteis",
      label: "Buscar Favoritos",
      link: "/search-favoriteis",
    },
  ];

  const menu = menuItems.map((item) => {
    // Check if the current location exactly matches the link
    const isActive = location.pathname === item.link;

    return (
      <NavLink key={item.id} to={item.link}>
        <li className={`${isActive ? "active" : ""}`}>{item.label}</li>
      </NavLink>
    );
  });

  return (
    <header>
      <div className="main-header">
        <NavLink to="/">
          <div className="logo">
            <img src={logo} alt="X-Streamers Logo" />
            <h1>X-Streamers</h1>
          </div>
        </NavLink>
        <nav>
          <ul>{menu}</ul>
        </nav>
      </div>
    </header>
  );
}
