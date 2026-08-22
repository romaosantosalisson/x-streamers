import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { ThemeToggle } from "../../components/themeToggle";

export function MainLayout() {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
      <ThemeToggle />
    </>
  );
}
