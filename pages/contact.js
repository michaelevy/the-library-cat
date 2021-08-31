import { PageText } from "../components/PageText";

/**
 * About me page
 */
export default function contact() {
  return (
    <PageText>
      <h1>Say Hi!</h1>
      <p>
        I'm not very scary. If you want to talk about blogging, books, or just
        chat, use one of the links right here.
      </p>
      <p>cat⁴#0635 on discord</p>
      <p>
        <a href="mailto:LibraryCatBlog@gmail.com">LibraryCatBlog@gmail.com</a>
      </p>
      <p>
        <a href="https://twitter.com/CatToTheFour">@CatToTheFour</a> on twitter
      </p>
      <p>
        <br />
        <br />
        <em>
          "The problem with sending messages was that people responded to them,
          which meant one had to write more messages in reply."{" "}
        </em>
        <br /> - Arkady Martine
      </p>
    </PageText>
  );
}
