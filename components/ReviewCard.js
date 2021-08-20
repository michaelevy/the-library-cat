import Link from "next/link";
export default function Review({ review }) {
  const { title, cover, rating, slug, summary } = review.fields;
  return (
    <>
      <Link href={"/reviews/" + slug}>
        <div className="card">
          <figure className="cover">
            <img src={"https:" + cover.fields.file.url} />
          </figure>
          <div className="content">
            <h2>{title}</h2>
            <p>{summary}</p>
            <span>{rating + "/5"}</span>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .card {
          margin: 1rem;
          text-align: left;
          text-decoration: none;
          border-radius: 50px;
          transition: 0.15s ease;
          width: 45%;
          max-height: 400px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
        }
        @media only screen and (max-width: 480px) {
          .card {
            width: 95%;
          }
          .cover {
            width: 75%;
          }
          h2 {
            font-size: 25px;
          }
          span {
          }
        }
        img {
          height: 100%;
          min-width: 100%;
        }
        .cover {
          padding: 0;
          margin: 0;
          width: 50%;
          overflow: hidden;
        }
        .card:hover,
        .card:focus,
        .card:active {
          border-radius: 100px;
          background-color: #a56640;
        }
        .card:active {
        }
        .card:hover {
          cursor: pointer;
        }

        .content {
          background: #2e2e2e;
          color: #81685b;
          display: flex;
          flex-direction: column;
          width: 50%;
          padding: 16px;
        }

        span {
          margin-top: auto;
          font-size: 80px;
          font-family: impact;
        }

        p {
          font-size: large;
        }
      `}</style>
    </>
  );
}
