import Head from "next/head";
import Script from "next/script";
/**
 * Meta info for SEO, mainly
 *
 * @param {string} props.title - title of this page
 * @param {string} props.description - description of this page
 * @param {string} props.keywords - keywords for SEO
 *
 */
export default function Meta(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <link rel="icon" href="/favicon.ico" />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={"https://www.googletagmanager.com/gtag/js?id=G-5RFDBR98MZ"}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', G-5RFDBR98MZ, {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </Head>
  );
}

Meta.defaultProps = {
  title: "The Library Cat",
  description: "Short book reviews. From a cat.",
  keywords: "fantasy, reviews, books, book, sci-fi, blog",
};
