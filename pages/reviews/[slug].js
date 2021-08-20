import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Loading";
import Meta from "../../components/Meta";

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
  if (!review) return <Skeleton />;

  const { cover, title, text, rating, quote, alt } = review.fields;
  return (
    <>
      <Meta title={title} description={"A cat's review of " + title} />

      <div className="card">
        <figure className="cover">
          <img src={"https:" + cover.fields.file.url} alt={alt} />
        </figure>
        <div className="content">
          <h2>{title}</h2>

          <p className="review">{documentToReactComponents(text)}</p>
          <p>
            <em>{'"' + quote + '"'}</em>
          </p>
          <p className="rating">{rating + "/5"}</p>
        </div>
      </div>

      <style jsx>{`
        .rating {
          font-size: 50px;
        }
        .card {
          font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans,
            Helvetica Neue, Arial, sans-serif;
          margin-left: auto;
          margin-right: auto;
          max-padding: 20px;
          width: 95%;
          border: 0.01em solid #102524;
          display: flex;
          box-shadow: 0 0 1px 0px #666;
          flex-wrap: wrap;
          flex-direction: row;
          color: #2e2e2e;
        }
        .content {
          display: flex;
          flex-direction: column;
          flex-basis: 60%;
          flex-grow: 1;
          padding: 50px;
        }
        .review {
          font-size: 20px;
          word-wrap: normal;
        }
        .rating {
          font-family: impact;
        }
        .cover {
          max-height: 100%;
          max-width: 300px;
          align-self: left;
        }
        img {
          max-height: 100%;
          max-width: 300px;
          align-self: left;
        }
        @media only screen and (max-width: 480px) {
          .cover {
            max-height: 100%;
            max-width: 320px;
            align-self: left;
          }
          img {
            max-height: 100%;
            max-width: 320px;
            align-self: left;
          }
        }
      `}</style>
    </>
  );
}
