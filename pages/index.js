import { createClient } from "contentful";
import Review from "../components/ReviewCard";

// color scheme https://coolors.co/102524-212d2b-593f32-81685b-a56640
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "review" });

  return {
    props: {
      reviews: res.items,
    },
    revalidate: 1800,
  };
}

export default function Reviews({ reviews }) {
  console.log(reviews[0].fields.cover);
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <Review key={review.sys.id} review={review} />
      ))}
      <style jsx>{`
        .review-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
}
