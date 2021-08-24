import { PageText } from "../components/PageText";
/**
 * About me page
 */
export default function about() {
  return (
    <PageText>
      <h1>Hello</h1>

      <p className="review">
        I'm Michael. I read books and write code. This website is the happy
        intersection of the two. It doesn't look very good, because I don't know
        anything about design. If you do, please head over to 'contact' and
        proceed with the ritual.
      </p>
      <p>
        <em>
          "In ancient times, cats were worshipped as gods; they have not
          forgotten this."{" "}
        </em>
        - Terry Pratchett
      </p>
    </PageText>
  );
}
