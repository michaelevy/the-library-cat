import Link from "next/link";
import Image from "next/image";
export default function Review({ review }) {
  const { title, cover, rating, slug } = review.fields;
  return (
    <div className="card">
      <div className="cover">
        <Image
          src={"https:" + cover.fields.file.url}
          width="315"
          height="475"
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <h5>{rating + "/5"}</h5>
        </div>
        <div className="actions">
          <Link href={"/reviews/" + slug}>Link</Link>
        </div>
      </div>
      <style jsx>{`
        .card {
          display: flex;
          flex-direction: row;
        }
        .content {
          background: #6663;

          display: flex;
          flex-direction: column;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
        }
        .info h5 {
          color: #777;
          font-size: 30px;
        }
      `}</style>
    </div>
  );
}
