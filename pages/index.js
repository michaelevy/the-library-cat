import { createClient } from "contentful";
import Review from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import SortButton from "../components/MoveButton";

// color scheme https://coolors.co/102524-212d2b-593f32-6b574c-81685b

export async function getStaticProps() {
  // contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  // get and return all reviews
  const res = await client.getEntries({
    content_type: "review",
    order: "fields.date",
  });
  res.items.reverse();
  return {
    props: {
      reviews: res.items,
    },
    revalidate: 1800,
  };
}

export default function Reviews({ reviews }) {
  const reviewOriginal = [...reviews];
  const [reviewList, setReviewList] = useState(reviews);

  /** enum representing button states  */
  const button = {
    RATING: "rating",
    DATE: "date",
    ALPH: "alph",
  };
  const [selected, setSelected] = useState(button.DATE);

  /** sort reviews by rating  */
  const rating = () => {
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
    setReviewList(reviewOriginal);
  };

  /** sort reviews alphabetically  */
  const alph = () => {
    setReviewList(
      reviewList.sort((a, b) => {
        return a.fields.title.localeCompare(b.fields.title);
      })
    );
  };

  // sort by date initially
  useEffect(() => {
    date();
  }, []);

  return (
    <Home>
      <Controls>
        <SortButton
          sort={() => {
            date();
            setSelected(button.DATE);
          }}
          selected={selected === button.DATE}
        >
          Date
        </SortButton>
        <SortButton
          sort={() => {
            alph();
            setSelected(button.ALPH);
          }}
          selected={selected === button.ALPH}
        >
          Alphabetical
        </SortButton>
        <SortButton
          sort={() => {
            rating();
            setSelected(button.RATING);
          }}
          selected={selected === button.RATING}
        >
          Rating
        </SortButton>
      </Controls>
      {(
        <ReviewList>
          {reviewList.map((review) => (
            <Review key={review.sys.id} review={review} />
          ))}
        </ReviewList>
      ) || <div style={{ height: "102vh" }} />}
    </Home>
  );
}

const ReviewList = styled.ul`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  width: 75%;
  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 0;
    width: 100%;
    margin: 0;
    margin: 0;
  }
`;

const Controls = styled.div`
  border: 2px solid var(--grey);
  border-radius: 20px;
  background: var(--mid-prim);
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: min-content;
  width: min-content;
`;

const Home = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
