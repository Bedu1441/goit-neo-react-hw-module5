import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildClass = ({ isActive }) => clsx(css.link, isActive && css.active);

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
