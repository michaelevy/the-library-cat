import Link from "next/link";
/**
 * Page will display on 404 error
 */
export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Looks like you strayed from the path</h2>
      <p>
        Return{" "}
        <Link href="home">
          <a>home</a>
        </Link>
      </p>
      <style jsx>
        {`
          .not-found {
            color: var(--grey);
            margin-left: auto;
            width: 100%;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
