import Link from "next/link";
/**
 * Header of each page
 */
export default function Header() {
  return (
    <header key="header">
      <h1>
        <Link href="/">
          <a>
            <span>The</span>
            <span>Library</span>
            <span>Cat</span>
          </a>
        </Link>
      </h1>

      <h2>Short book reviews. From a cat.</h2>

      <style jsx>{`
        header {
          width: 90%;
          text-align: center;
          margin: 60px auto;
          color: var(--dark-green);
        }
        header a {
          text-decoration: none;
          display: inline-block;
          color: var(--dark-green);
        }
        header h1 {
          will-change: transform;
          transition: 0.8s;
          margin: 0;
          margin-bottom: 4px;
        }
        header h1:hover {
          transition: 0.15s;
          transform: scale(1.1);
        }
        header span {
          display: block;
          line-height: 1em;
        }
        header span:first-child {
          font-size: 1em;
          font-weight: 400;
        }
        header span:nth-last-child(2) {
          font-size: 1.5em;
          font-weight: 800;
          font-family: var(--heading);
        }
        a:hover {
          cursor: pointer;
        }
      `}</style>
    </header>
  );
}
