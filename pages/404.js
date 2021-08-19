import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>No page by that name :(</h2>
      <p>
        Return <Link href="home">home</Link>
      </p>
    </div>
  );
}
