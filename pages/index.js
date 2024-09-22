import { createClient } from "contentful";
import Review from "../components/ReviewCard";
import { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox"
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";

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
  const reviewOriginal = [...reviews, ...shorts];
  const [reviewList, setReviewList] = useState(reviewOriginal);
  const [ratingRange, setRatingRange] = useState([1,5]);
  const [title, setTitle] = useState("");
  const [lengths, updateLengths] = useReducer((state, length) => {
    if (length.value === "long") {
      return {
        "long": length.checked,
        "short": state.short
      }
    } else if (length.value === "short") {
      return {
        "long": state.long,
        "short": length.checked
      }
    }
  }, { "long": true, "short": true });

  const search = (searchTerm) => {
    setTitle(searchTerm)
  };

  const searchFilter = (a) => {
    return JSON.stringify(a.fields.title).toLowerCase().includes(title.toLowerCase())
  }

  const lengthSelect = (value, checked) => {
    updateLengths({ "value": value, "checked": checked })
  }

  const lengthFilter = (a) => {
    if (lengths.long && !lengths.short) {
      return a.fields.hasOwnProperty("longText")
    } else if (!lengths.long && lengths.short) {
      return !a.fields.hasOwnProperty("longText")
    } else if (!lengths.long && !lengths.short) {
      return false;
    }
    return true;
  }

  const ratingSelect = (value) => {
    setRatingRange(value)
  }

  const ratingFilter = (a) =>{
    return a.fields.rating >= Math.min(...ratingRange) && a.fields.rating <= Math.max(...ratingRange)
  }

  function dateToNum(d) {
    d = d.split("-"); return Number(d[0] + d[1] + d[2]);
  }

  useEffect(() => {
    setReviewList(reviewOriginal.filter(lengthFilter).filter(ratingFilter).filter(searchFilter).sort((a, b) => { return dateToNum(b.fields.date) - dateToNum(a.fields.date) }))
  }, [lengths, ratingRange, title])

  return (
    <Home>
      <Controls
        search={search}
        lengthSelect={lengthSelect}
        ratingSelect={ratingSelect}
        ratingRange = {ratingRange}
      />
      {(
        <AnimatePresence>
          <ReviewList
            style=
            {{
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            }}
            layout
          >
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

function Controls({ search, lengthSelect, ratingSelect, ratingRange }) {
  return (
    <ControlStyle>
      <ControlSubGroupStyle>
        <Input func={search} />
      </ControlSubGroupStyle>
      <ControlSubGroupStyle>
        <Checkbox func={lengthSelect} value="long">
          Long reviews
        </Checkbox>
        <Checkbox func={lengthSelect} value="short">
          Short reviews
        </Checkbox>
      </ControlSubGroupStyle>
      <ControlSubGroupStyle>
        <p>Rating Filter</p>
        <SliderRoot defaultValue={[1,5]} min = {1} max={5} step={1} minStepsBetweenThumbs={0} onValueChange={ratingSelect}>
          <SliderTrack>
            <SliderRange/>
          </SliderTrack>
          <SliderThumb aria-label="MinRating"><SliderText>{Math.min(...ratingRange)}</SliderText></SliderThumb>
          <SliderThumb aria-label="MaxRating"> <SliderText>{Math.max(...ratingRange)}</SliderText></SliderThumb>
        </SliderRoot>
      </ControlSubGroupStyle>
    </ControlStyle>
  );
}

const SliderRoot = styled(Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 200px;
  margin: 20px;
`
const SliderTrack = styled(Track)`
  position: relative;
  background-color: var(--mid-sec);
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
`
const SliderText = styled.p`
  font-size: 15px;
  position: relative;
  margin: 0;
  font-weight: 600;
  color: var(--grey)
`

const SliderRange = styled(Range)`
  position: absolute;
  background-color: var(--grey);
  border-radius: 9999px;
  height: 100%;
`

const SliderThumb = styled(Thumb)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: var(--mid-sec);
  border-color: var(--mid-sec);
  border-radius: 10px;
  box-shadow: 0 0 0 1px #0000000f;
  &:focus{
    outline: none;
    box-shadow: 0 0 0 3px #0000000f;
  }
  &:hover {
    filter: brightness(95%);
  }
`

const ReviewList = styled(motion.ul)`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  gap: 3rem;

  width: 75%;
  @media only screen and (max-width: 600px) {
    padding: 0;
    width: 100%;
    margin: 0;
    margin: 0;
  }
`;

const ControlSubGroupStyle = styled.div`
  border-radius: 0px;
  border-style: dotted;
  border-color: var(--grey);
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const ControlStyle = styled.div`
  border: 2px solid var(--grey);
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: min-content;
  flex-wrap: wrap;
`;

const Home = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;