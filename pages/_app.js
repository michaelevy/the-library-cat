import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
function MyApp({ Component, pageProps }) {
  const [mounted, hasMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    hasMounted(true);
  }, [mounted]);
  return (
    <Layout route={router.route}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
