import Link from "next/link";
/**
 * Navigation bar
 */
export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
        }
        a {
          margin: 10px;
          text-decoration: none;
          color: #102524;
          border-bottom: 2px solid #2e2e2e;
        }
        a:hover {
          border-bottom: 2px solid #102524;
        }
      `}</style>
    </nav>
  );
}
