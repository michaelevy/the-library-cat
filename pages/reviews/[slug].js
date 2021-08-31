import { createClient } from "contentful";
import { PageText } from "../../components/PageText";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS } from "@contentful/rich-text-types";
import { useState } from "react";
import styled from "styled-components";
import Meta from "../../components/Meta";
import Spoiler from "../../components/Spoiler";
import SelectButton from "../../components/SelectButton";

// contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  // get all reviews
  const res = await client.getEntries({ content_type: "review" });
  // get the path for each review
  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps(context) {
  // find the review that matches this path
  const res = await client.getEntries({
    content_type: "review",
    "fields.slug": context.params.slug,
  });
  // 404 if not found
  if (!res.items.length) {
    return {
      notFound: true,
    };
  }
  // return this review, and revalidate every half hour
  return {
    props: { review: res.items[0] },
    revalidate: 1800,
  };
}

/**
 * Use 'bold' markup as spoilers
 */
const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => {
      <Spoiler>{text}</Spoiler>;
    },
  },
};

/**
 * Present the full review of a book
 *
 * @param {object} review
 */
export default function ReviewDetails({ review }) {
  const [show, setShow] = useState(false);

  if (!review) return <div />;
  const { cover, title, text, rating, quote, alt } = review.fields;
  return (
    <>
      <Meta title={title} description={"A cat's review of " + title} />
      <Content>
        <SpoilerButton>
          <SelectButton
            onClick={() => {
              setShow(!show);
            }}
            selected={show}
          >
            {show ? "Hide Spoilers" : "Show Spoilers"}
          </SelectButton>
        </SpoilerButton>
        <Cover>
          <img src={"https:" + cover.fields.file.url} alt={alt} />
        </Cover>
        <PageText>
          <h2>{title}</h2>

          <p className="review">{documentToReactComponents(text, options)}</p>

          <p>
            <em>{'"' + quote + '"'}</em>
          </p>
          <Rating>{rating + "/5"}</Rating>
        </PageText>
      </Content>
    </>
  );
}

const Rating = styled.p`
  font-family: impact;
  font-size: 50px;
`;

const Cover = styled.figure`
  img {
    max-height: 100%;
    max-width: 300px;
    align-self: left;
  }
  @media only screen and (max-width: 480px) {
    img {
      max-height: 100%;
      max-width: 200px;
      align-self: left;
    }
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 60%;
  flex-grow: 1;
  justify-content: center;
`;

const SpoilerButton = styled.div`
  position: sticky;
  width: min-content;
  height: min-content;
  top: 5%;
  left: 95%;
`;
