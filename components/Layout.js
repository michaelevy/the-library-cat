import Meta from "./Meta";
import Header from "./Header";
import Navbar from "./Navbar";
export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      <Navbar />
      <div className="layout">
        <div className="page-content">{children}</div>

        <footer>
          <p>Copyright 2021 Me</p>
        </footer>
      </div>
    </>
  );
}
