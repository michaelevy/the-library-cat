import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

let subtitles = [
  "So many books, so little time",
  "So many books, so little time",
  "So many books, so little time",
  "Speculating on speculative fiction",
  "Speculating on speculative fiction",
  "An endless search for the end of the to-read pile",
  "An endless search for the end of the to-read pile",
  "An endless search for the end of the to-read pile",
  "Striving to read books faster than Sanderson writes them",
  "Striving to read books faster than Sanderson writes them",
  "Striving to read books faster than Sanderson writes them",
  "Would you like to see my spreadsheet",
  "If I were Murderbot I could read so many books",
  "Three Seagrass with a cat!",
  "In ancient times, cats were worshipped as gods; they have not forgotten this.",
];

let subtitle = null;

function Subtitle({ children }) {
  return (
    <AnimatePresence>
      <motion.h2
        key={children}
        exit={{ opacity: 0 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          fontSize: "calc(1em * var(--text-ratio))",
        }}
        transition={{ duration: "1" }}
        initial={{ opacity: 0 }}
        id="subtitle"
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.h2>
    </AnimatePresence>
  );
}
/**
 * Header of each page
 */
export default function Header() {
  let newSub =
    subtitle == null
      ? "Striving to read books faster than Sanderson writes them"
      : subtitle;

  while (newSub == subtitle) {
    newSub = subtitles[Math.floor(Math.random() * subtitles.length)];
  }
  subtitle = newSub;
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
      <div style={{ height: "50px" }}>
        <Subtitle>{subtitle}</Subtitle>
      </div>

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
      `}</style>
    </header>
  );
}
