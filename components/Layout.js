import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Book</span>
              <span>Reviews</span>
            </h1>
            <h2>From a nerd</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2021 Me</p>
      </footer>
    </div>
  );
}
