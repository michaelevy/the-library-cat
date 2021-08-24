import styled from "styled-components";
/**
 * Footer with link to source code and license
 */
export default function Foot() {
  return (
    <Footer>
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
      <cite>
        <p>Favicon is Cat by Matt Hawdon from the Noun Project</p>
      </cite>
      <style jsx>{`
        footer {
        }
      `}</style>
    </Footer>
  );
}

const Footer = styled.footer`
  color: var(--grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  font-family: var(--body-sans);
  padding-bottom: 5px;
  height: min-content;
  padding-top: 200px;
  font-style: italic;
  text-align: center;
`;
