import { createClient } from "contentful";
import { PageText } from "../../components/PageText";
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
      <div className="content">
        <figure className="cover">
          <img src={"https:" + cover.fields.file.url} alt={alt} />
        </figure>
        <PageText>
          <h2>{title}</h2>

          <p className="review">{documentToReactComponents(text)}</p>
          <p>
            <em>{'"' + quote + '"'}</em>
          </p>
          <p className="rating">{rating + "/5"}</p>
        </PageText>
      </div>

      <style jsx>{`
        .rating {
          font-size: 50px;
        }
        .content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          flex-basis: 60%;
          flex-grow: 1;
          justify-content: center;
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
            max-width: 200px;
            align-self: left;
          }
        }
      `}</style>
    </>
  );
}
