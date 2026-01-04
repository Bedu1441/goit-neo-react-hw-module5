import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={css.section}>
      <h1 className={css.title}>404 — Page not found</h1>
      <Link className={css.link} to="/">
        Go to Home
      </Link>
    </section>
  );
}
