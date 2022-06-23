import { createClient } from "contentful";
import { PageText } from "../../components/PageText";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS, BLOCKS } from "@contentful/rich-text-types";
import { useState, useEffect } from "react";
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
 * Present the full review of a book
 *
 * @param {object} review
 */
export default function ReviewDetails({ review }) {
  const [show, setShow] = useState(false);
  const [width, height] = useWindowDimension();
  const [small, setSmall] = useState(true);
  if (!review) return <div />;
  const { cover, title, text, rating, quote, alt, longText } = review.fields;
  useEffect(() => {
    if (flexWrap() || width < 768) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  }, [width]);

  /**
   * Use 'bold' markup as spoilers
   */
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Spoiler show={show}>{text}</Spoiler>,
    },
  };

  return (
    <>
      <Meta title={title} description={"A cat's review of " + title} />
      <Content>
        <Sidebar style={small ? {} : { position: "sticky" }}>
          <Cover>
            <img src={"https:" + cover.fields.file.url} alt={alt} />
          </Cover>
        </Sidebar>

        <PageText>
          <h2>{title}</h2>

          <div className="review">
            {documentToReactComponents(text, options)}
          </div>
          <div className="review">
            {documentToReactComponents(longText, options)}
          </div>
        </PageText>
      </Content>
    </>
  );
}

/**
 * Decide based on article offset whether sidebar should be sticky or fixed
 *
 * @returns {boolean} whether the article is > 400px from the top
 */
function flexWrap() {
  return document.getElementsByTagName("article").item(0).offsetTop > 400;
}

/**
 * Custom hook to get window dimensions whenever they change
 *
 * Credit to https://stackoverflow.com/a/19014495/13043323
 *
 * @returns {Array<number>} width, height
 */
function useWindowDimension() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
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

const Sidebar = styled.aside`
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: min-content;
`;

const Content = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 60%;
  flex-grow: 1;
  justify-content: center;
`;
