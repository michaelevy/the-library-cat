import Link from "next/link";

let subtitles = [
  "So many books, so little time",
  "Listen to cat talk about books",
  "Embrace your inner nerd",
  "Speculating on speculative fiction",
  "An endless search for the end of the to-read pile",
  "Striving to read books faster than Sanderson writes them",
];
let subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];

/**
 * Header of each page
 */
export default function Header() {
  return (
    <header key="header">
      <h1>
        <Link href="/">
          <a id="title">
            <span>The</span>
            <span>Library</span>
            <span>Cat</span>
          </a>
        </Link>
      </h1>

      <h2>{subtitle}</h2>

      <style jsx>{`
        --text-ratio: 1;
        @media only screen and (max-width: 480px) {
          --text-ratio: 0.75;
        }
        header {
          width: 90%;
          text-align: center;
          margin: 20px auto;
          color: var(--grey);
        }
        header a {
          text-decoration: none;
          display: inline-block;
          color: var(--dark-sec);
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
          padding: 0 10px;
          line-height: 1em;
          font-size: calc(1em * var(--text-ratio));
        }
        header span:first-child {
          font-weight: 400;
        }
        header span:nth-last-child(2) {
          font-size: calc(1.5em * var(--text-ratio));
          font-weight: 800;
          font-family: var(--heading);
        }
        #title {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 80%;
          margin: 0 auto;
          justify-content: center;
          align-items: center;
        }
        #title:hover {
          cursor: pointer;
        }
        header h2 {
          font-size: calc(1em * var(--text-ratio));
        }
      `}</style>
    </header>
  );
}
