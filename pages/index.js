import { createClient } from "contentful";
import Review from "../components/ReviewCard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SortButton from "../components/MoveButton";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/SelectButton";

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

  // get and return all shorts
  const res2 = await client.getEntries({
    content_type: "short",
    order: "fields.date",
  });
  res2.items.reverse();
  return {
    props: {
      reviews: res.items,
      shorts: res2.items,
    },
    revalidate: 1800,
  };
}

/** enum representing button states  */
const button = {
  RATING: "rating",
  DATE: "date",
  ALPH: "alph",
};

/**
 * Convince react to actually redisplay my list when I change it
 */
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}
/**
 * https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
 * @param {string} name
 * @returns
 */
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default function Reviews({ reviews, shorts }) {
  const viewCookie = () => {
    var cookie = getCookie("viewReviews");
    if (cookie == "false") {
      return false;
    }
    return true;
  };
  const sortCookie = () => {
    var cookie = getCookie("sort");
    if (cookie == "date") {
      return button.DATE;
    } else if (cookie == "rating") {
      return button.RATING;
    } else {
      return button.ALPH;
    }
  };

  const reviewOriginal = [...reviews];
  const shortOriginal = [...shorts];
  const [reviewList, setReviewList] = useState(
    viewCookie() ? reviewOriginal : shortOriginal
  );
  const [selected, setSelected] = useState(sortCookie());
  const [viewingReviews, setView] = useState(viewCookie());
  const forceUpdate = useForceUpdate();

  /** sort reviews by rating  */
  const rating = () => {
    document.cookie = "sort=rating; SameSite=None;secure";
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
    document.cookie = "sort=date; SameSite=None;secure";
    setReviewList(viewingReviews ? reviewOriginal : shortOriginal);
  };

  /** sort reviews alphabetically  */
  const alph = () => {
    document.cookie = "sort=alph; SameSite=None;secure";
    setReviewList(
      reviewList.sort((a, b) => {
        return a.fields.title.localeCompare(b.fields.title);
      })
    );
  };

  /**
   * View long reviews
   */
  const viewReviews = () => {
    document.cookie = "viewReviews=" + true + "; SameSite=None;secure";
    setView(true);
    setReviewList(reviewOriginal);
  };

  /**
   * View short reviews
   */
  const viewShorts = () => {
    document.cookie = "viewReviews=" + false + "; SameSite=None;secure";
    setView(false);
    setReviewList(shortOriginal);
  };

  // save sorted state between reviews and shorts
  useEffect(() => {
    if (selected === button.DATE) {
      date();
    } else if (selected === button.RATING) {
      rating();
    } else {
      alph();
    }
    forceUpdate();
  }, [viewingReviews]);

  return (
    <Home>
      <ViewChange
        highlight={viewingReviews}
        viewReviews={viewReviews}
        viewShorts={viewShorts}
      />
      <Controls
        selected={selected}
        setSelected={setSelected}
        alph={alph}
        date={date}
        rating={rating}
      />
      {(
        <AnimatePresence>
          <ReviewList key={viewingReviews} layout>
            {reviewList.map((review) => (
              <motion.div
                key={review.fields.slug}
                review={review}
                exit={{ opacity: 0 }}
              >
                <Review review={review} />
              </motion.div>
            ))}
          </ReviewList>
        </AnimatePresence>
      ) || <div style={{ height: "102vh" }} />}
    </Home>
  );
}

function ViewChange(props) {
  return (
    <ChangeBox>
      <ViewButton highlight={props.highlight} onClick={props.viewReviews}>
        Full Length Reviews
      </ViewButton>
      <ViewButton highlight={!props.highlight} onClick={props.viewShorts}>
        Short Form Reviews
      </ViewButton>
    </ChangeBox>
  );
}

function ViewButton({ highlight, onClick, children }) {
  return (
    <ViewButtonStyle
      as={motion.button}
      whileHover={{
        duration: 2,
        backgroundColor: "rgba(240, 240, 240)",
      }}
      animate={highlight ? { fontSize: "100%" } : { fontSize: "75%" }}
      transition={{ duration: 0.2, ease: "linear" }}
      whileTap={{ scale: 0.99 }}
      onClick={() => {
        onClick();
      }}
      style={highlight ? {} : { opacity: 0.5 }}
    >
      {children}
    </ViewButtonStyle>
  );
}
function Controls({ selected, setSelected, alph, rating, date }) {
  return (
    <ControlStyle>
      <SortButton
        sort={() => {
          setSelected(button.DATE);
          date();
        }}
        selected={selected === button.DATE}
      >
        Date
      </SortButton>
      <SortButton
        sort={() => {
          setSelected(button.ALPH);
          alph();
        }}
        selected={selected === button.ALPH}
      >
        Alphabetical
      </SortButton>
      <SortButton
        sort={() => {
          setSelected(button.RATING);
          rating();
        }}
        selected={selected === button.RATING}
      >
        Rating
      </SortButton>
    </ControlStyle>
  );
}
const ReviewList = styled(motion.ul)`
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

const ControlStyle = styled.div`
  border: 2px solid var(--grey);
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: min-content;
  width: min-content;
`;

const ChangeBox = styled.div`
  border: solid var(--grey);
  border-width: 0 0 1px 0;
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: min-content;
  width: 90%;
`;

const ViewButtonStyle = styled(motion.button)`
  width: 100%;
  height: 50px;
  position: relative;
  cursor: pointer;
  padding: 15px;
  border: none;
  max-width: 50%;
  color: var(--grey);
  font-family: var(--body-serif);
  font-size: large;
  background-color: var(--white);
  will-change: true;
  @media only screen and (max-width: 480px) {
    font-size: small;
    height: 75px;
  }
  @media only screen and (max-width: 600px) {
    height: 60px;
  }
`;

const Home = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
