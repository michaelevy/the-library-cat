export default function Skeleton() {
  return (
    <div>
      <div className="cover" />
      <h2>Loading</h2>
      <div className="content">
        <p className="review">Loading Loading Loading Loading</p>
        <p>
          <em>"Loading"</em>
        </p>
        <p className="rating">Something/5</p>
      </div>
      <style jsx>{`
        .rating {
          font-size: 50px;
        }
      `}</style>
    </div>
  );
}
