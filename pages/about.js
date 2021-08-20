/**
 * About me page
 */
export default function about() {
  return (
    <>
      <div className="card">
        <h1>Hello</h1>

        <p className="review">
          I'm Michael. I read books and write code. This website is the happy
          intersection of the two. It doesn't look very good, because I don't
          know anything about design. If you do, please head over to 'contact'
          and proceed with the ritual.
        </p>
        <p>
          <em>
            "In ancient times, cats were worshipped as gods; they have not
            forgotten this."{" "}
          </em>
          - Terry Pratchett
        </p>
      </div>

      <style jsx>{`
        .card {
          font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans,
            Helvetica Neue, Arial, sans-serif;
          margin-left: auto;
          margin-right: auto;
          max-padding: 20px;
          width: 95%;
          border: 0.01em solid #102524;
          box-shadow: 0 0 1px 0px #666;
          text-align: center;
          color: #2e2e2e;
          margin-top: 50px;
        }
      `}</style>
    </>
  );
}
