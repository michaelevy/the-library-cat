import { PageText } from "../components/PageText";
import Link from "next/link";
/**
 * About me page
 */
export default function about() {
  return (
    <PageText>
      <h1>Hello</h1>

      <p>
        I'm Michael. I read books and write code. This website is the happy
        intersection of the two.
      </p>
      <p>
        I read almost exclusively sci-fi and fantasy, more out of habit than
        design. My favourite author is Sanderson, which is awfully boring of me.
      </p>
      <p>
        On this blog I give a brief review, and then get totally sidetracked
        talking about random interesting things from the book. I'm not sure if
        that's interesting to anyone who isn't me, but I certainly hope so!
      </p>
      <p>
        If you liked one of my posts and want to chat or have a recommendation,
        head over to <Link href="/contact">contact</Link>
      </p>
      <p>
        <br />
        <br />
        <em>
          "In ancient times, cats were worshipped as gods; they have not
          forgotten this." <br />
        </em>
        <br /> - Terry Pratchett
      </p>
    </PageText>
  );
}
