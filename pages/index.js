import { createClient } from "contentful";
import Review from "../components/ReviewCard";
import { useEffect, useState } from "react";
// color scheme https://coolors.co/102524-212d2b-593f32-6b574c-81685b

export async function getStaticProps() {
  // contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  // get and return all reviews
  const res = await client.getEntries({ content_type: "review" });

  return {
    props: {
      reviews: res.items,
    },
    revalidate: 1800,
  };
}

export default function Reviews({ reviews }) {
  const [reviewList, setReviewList] = useState(reviews);
  const [hasMounted, setHasMounted] = useState(false);

  /** enum representing button states  */
  const button = {
    RATING: "rating",
    DATE: "date",
    ALPH: "alph",
  };
  const [selected, setSelected] = useState(button.DATE);

  /** sort reviews by rating  */
  const rating = () => {
    setHasMounted(false);
    setReviewList(
      reviewList.sort((a, b) => {
        return a.fields.rating !== b.fields.rating
          ? a.fields.rating < b.fields.rating
          : a.fields.title.localeCompare(b.fields.title);
      })
    );
  };

  /** sort reviews by date  */
  const date = () => {
    setHasMounted(false);
    setReviewList(
      reviewList.sort((a, b) => {
        var a1 = a.fields.date.split("-");
        var b1 = b.fields.date.split("-");
        var time1 = new Date(a1[0], a1[1] - 1, a1[2]).getTime();
        var time2 = new Date(b1[0], b1[1] - 1, b1[2]).getTime();
        return time2 - time1 === 0 ? alph() : time2 - time1;
      })
    );
  };

  /** sort reviews alphabetically  */
  const alph = () => {
    setHasMounted(false);
    setReviewList(
      reviewList.sort((a, b) => {
        return a.fields.title.localeCompare(b.fields.title);
      })
    );
  };

  // update components on sort
  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);

  // sort by date initially
  useEffect(() => {
    date();
    setHasMounted(true);
  }, []);

  return (
    <div className="home">
      <div className="controls">
        <div className="buttons">
          <button
            onClick={() => {
              date();
              setSelected(button.DATE);
            }}
            style={
              selected === button.DATE
                ? { background: " #997e70" }
                : { background: "#81685B" }
            }
          >
            Date
          </button>
          <button
            onClick={() => {
              alph();
              setSelected(button.ALPH);
            }}
            style={
              selected === button.ALPH
                ? { background: " #997e70" }
                : { background: "#81685B" }
            }
          >
            Alphabetical
          </button>
          <button
            onClick={() => {
              rating();
              setSelected(button.RATING);
            }}
            style={
              selected === button.RATING
                ? { background: " #997e70" }
                : { background: "#81685B" }
            }
          >
            Rating
          </button>
        </div>
      </div>
      {(hasMounted && (
        <div className="review-list">
          {reviewList.map((review) => (
            <Review key={review.sys.id} review={review} />
          ))}
        </div>
      )) || <div style={{ height: "102vh" }} />}
      <style jsx>{`
        .review-list {
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 75%;
        }
        @media only screen and (max-width: 480px) {
          .review-list {
            width: 100%;
            margin: 0;
          }
        }
        input {
          background: #997e70;
          float: right;
          padding: 6px;
          border: none;
          margin-left: auto;
          font-size: 17px;
          max-width: 200px;
          caret-color: #2e2e2e;
          color: #2e2e2e;
          padding-left: ;
        }
        input:focus {
          outline: none;
        }
        .home {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        button {
          float: right;
          padding: 6px;
          border: none;
          margin-top: 8px;
          margin-right: auto;
          margin-left: auto;
          margin-bottom: 30px;
          max-width: 200px;
          color: #2e2e2e;
          margin: 6px;
          border-radius: 10px;
          font-family: Garamond;
          font-size: large;
        }
        .buttons {
          border-radius: 10px;
          background: #6b574c;
          width: min-content;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .controls {
          margin-top: 50px;
          margin-bottom: 30px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 30%;
        }
      `}</style>
    </div>
  );
}
