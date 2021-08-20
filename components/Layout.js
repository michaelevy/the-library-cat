import Meta from "./Meta";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
/**
 * Layout
 *
 * @param {JSX.Element} children
 */
export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      <Navbar />
      <div className="page-content">{children}</div>
      <Footer />
    </>
  );
}
