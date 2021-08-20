import Head from "next/head";

export default function Meta(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  title: "The Library Cat",
  description: "Short book reviews. From a cat.",
  keywords: "fantasy, reviews, books, book, sci-fi, blog",
};
