/**
 * Footer with link to source code
 */
export default function Foot() {
  return (
    <div className="footer">
      <p>This is the website of Michael Levy</p>
      <p>Built using Next.js and Contentful</p>
      <p>
        Source code available{" "}
        <a href="https://github.com/michael-levy/website">here</a>
      </p>
      <p>
        The content of this website is licensed under a{" "}
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International License
        </a>
      </p>
      <style jsx>{`
        .footer {
          color: #2e2e2e;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          font-family: "Segoe UI";
          padding-bottom: 5px;
          height: min-content;
          color: #2e2e2e;
        }
      `}</style>
    </div>
  );
}
