import Link from "next/link";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
/**
 * Card representation of a review for the main page
 *
 * @param {object} review
 */

// animation on layout change
const tween = {
  type: "tween",
  duration: 0.1,
};

export default function Review({ review }) {
  const { title, cover, rating, slug, summary, alt } = review.fields;

  return (
    <Link href={"/reviews/" + slug} scroll={false}>
      <Card
        key={title}
        as={motion.li}
        className="card"
        layout
        animate={{ opacity: 1 }}
        iniial={{ opacity: 0 }}
        transition={tween}
      >
        <Cover>
          <img src={"https:" + cover.fields.file.url} alt={alt} />
        </Cover>
        <div className="content">
          <h2>{title}</h2>
          <p>{summary}</p>
          <span>{rating + "/5"}</span>
        </div>
      </Card>
    </Link>
  );
}
const Cover = styled.figure`
  padding: 0;
  margin: 0;
  width: 50%;
  overflow: hidden;
  img {
    height: 100%;
    min-width: 100%;
  }
`;

const Card = styled.section`
  will-change: transform;
  text-decoration: none;
  border-radius: 50px;
  transition: 0.8s;
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  display: flex;
  border: 1px solid var(--grey);
  flex-direction: row;
  &:hover {
    cursor: pointer;
  }
  &:hover,
  &:focus,
  &:active {
    transition: 0.15s;
    transform: translate(-2.5px, -20px);
    border-radius: 100px;
  }
  .content {
    color: var(--grey);
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 16px;
    padding-top: 16px;
  }
  p {
    margin: 10px;
    font-size: large;
  }
  span {
    margin-top: auto;
    font-size: 80px;
    font-family: impact;
  }
  @media only screen and (max-width: 480px) {
    p {
      font-size: medium;
    }
    span {
      margin-top: auto;
      font-size: 60px;
      font-family: impact;
    }
    .content {
      padding-top: 20px;
    }
  }
`;
