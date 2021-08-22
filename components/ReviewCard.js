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
          <motion.h2
            animate={{ y: 0 }}
            initial={{ y: 20 }}
            transition={{ ease: "easeOut" }}
          >
            {title}
          </motion.h2>
          <motion.p
            animate={{ y: 0 }}
            initial={{ y: 50 }}
            transition={{ ease: "easeOut" }}
          >
            {summary}
          </motion.p>
          <motion.span
            animate={{ y: 0 }}
            initial={{ y: 60 }}
            transition={{ ease: "easeOut" }}
          >
            {rating + "/5"}
          </motion.span>
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
  margin: 1rem;
  text-decoration: none;
  border-radius: 50px;
  transition: 0.8s;
  width: 45%;
  max-height: 400px;
  overflow: hidden;
  display: flex;
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
    box-shadow: 5px 10px var(--mid-brown);
  }
  .content {
    background: var(--grey);
    color: var(--light-brown);
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 16px;
  }
  p {
    font-size: large;
  }
  @media screen and (max-width: 1080px) {
    width: 95%;
    ${Cover} {
      width: 75%;
    }
    h2 {
      font-size: 25px;
    }
  }

  span {
    margin-top: auto;
    font-size: 80px;
    font-family: impact;
  }
`;
