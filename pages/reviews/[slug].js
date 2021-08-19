import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "review" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context) {
  const res = await client.getEntries({
    content_type: "review",
    "fields.slug": context.params.slug,
  });
  return {
    props: { review: res.items[0] },
  };
}

export default function ReviewDetails({ review }) {
  const { cover, title, text, rating, quote } = review.fields;
  return (
    <div>
      <Image
        src={"https:" + cover.fields.file.url}
        width={cover.fields.file.details.image.width}
        height={cover.fields.file.details.image.height}
      />
      <h2>{title}</h2>
      <div className="content">
        <p className="review">{documentToReactComponents(text)}</p>
        <p>
          <em>{quote}</em>
        </p>
        <p className="rating">{rating + "/5"}</p>
      </div>
      <style jsx>{`
        .rating {
          font-size: 50px;
        }
      `}</style>
    </div>
  );
}
