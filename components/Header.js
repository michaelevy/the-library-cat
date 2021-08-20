import Link from "next/link";
/**
 * Header of each page
 */
export default function Header() {
  return (
    <header>
      <Link href="/">
        <a>
          <h1>
            <span>The</span>
            <span>Library</span>
            <span>Cat</span>
          </h1>
        </a>
      </Link>

      <h2>Short book reviews. From a cat.</h2>

      <style jsx>{`
        header {
          text-align: center;
          margin: 60px 0;
          color: #102524;
        }
        header a {
          text-decoration: none;
          display: inline-block;
          color: #102524;
        }
        header h1 {
          margin: 0;
          margin-bottom: 4px;
        }
        header h1:hover {
          font-size: 52px;
          margin-bottom: 0;
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
          font-family: Spectral;
        }

        a:hover {
          cursor: pointer;
        }
        footer {
          background: #111;
          color: #bbb;
          padding: 40px;
          text-align: center;
          margin-top: auto;
        }
      `}</style>
    </header>
  );
}
