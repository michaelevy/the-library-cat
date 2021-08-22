import Meta from "./Meta";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";

/**
 * Layout
 *
 * @param {JSX.Element} children
 */
export default function Layout({ children }) {
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, x: -100, y: 0, duration: 2 },
    enter: { opacity: 1, x: 0, y: 0, duration: 2 },
    exit: { opacity: 0, x: 100, y: 0, duration: 2 },
  };
  return (
    <>
      <Meta />
      <Header />
      <Navbar />
      <AnimateSharedLayout>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <motion.main
            key={router.route}
            className="page-content"
            variants={variants} // Pass the variant object into Framer Motion
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: "linear" }} // Set the transition to linear
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </AnimateSharedLayout>
      <Footer />
    </>
  );
}
