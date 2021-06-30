import "./App.css";
import woo from "./woocircle.jpg";
import twitter from "./twitter.png";
import github from "./github.png";
import gmail from "./gmail.png";
import linkedin from "./linkedn.png";
import { Animate } from "./Animations.js";
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Button } from "./Button.js";
import { CircleButton } from "./Button.js";
import Ramblings from "./Ramblings.js";
import Books from "./Books.js";
import Archive from "./Archive.js";

/**
 * Main component
 */
function App() {
  return (
    <div className="App">
      <header>
        <Image />
      </header>
      <Nav />
      <Main />
      <Foot />
    </div>
  );
}

/**
 * Website logo at the top of page.
 */
function Image() {
  const width = useLocation().pathname === "/" ? 20 : 10;
  return (
    <a href="/">
      <img
        src={woo}
        alt="pretty swirly colours"
        style={{ width: width + "%" }}
      />
    </a>
  );
}

/**
 * Display the page that the user is currently on
 */
function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/ramblings" component={Ramblings}></Route>
      <Route path="/books" component={Books}></Route>
      <Route exact path="/index" component={Archive}></Route>
      <Route>
        <h1>404</h1>
        <p>Are you lost?</p>
      </Route>
    </Switch>
  );
}

/**
 * Navbar with website name and links to the things I want links to
 */
function Nav() {
  return (
    <nav className="navbar column">
      <Link to="/" style={{ width: "50%", display: "block" }}>
        <p className="name">Levytate</p>
      </Link>
      <div className="links">
        <Button text="Book Reviews" link="/books/0" />
        <Button text="Review Index" link="/index" />
      </div>
    </nav>
  );
}

/**
 * Displays home page with ways to contact me
 */
function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={loaded ? {} : { display: "none" }}>
      <p className="header">Hello! Hi!</p>
      <p>
        I'm Michael Levy, and this is my website. I'm studying Software
        Engineering at Victoria University of Wellington.
      </p>
      <Animate
        component={
          <div className="links contact" onLoad={() => setLoaded(true)}>
            <CircleButton
              text="GitHub"
              link="https://github.com/michael-levy"
              image={github}
            />
            <CircleButton
              text="Email"
              link="mailto:michaelfeehanlevy@gmail.com"
              image={gmail}
            />
            <CircleButton
              text="Twitter"
              link="https://twitter.com/CatToTheFour"
              image={twitter}
            />
            <CircleButton
              text="LinkedIn"
              link="https://www.linkedin.com/in/michaelvy/"
              image={linkedin}
            />
          </div>
        }
        initial={{
          fontSize: "30%",
          transition: "all 1s ease-out",
          opacity: 0,
        }}
        final={{
          fontSize: "110%",
          transition: "all 1s ease-out",
          opacity: 1,
        }}
      />
    </div>
  );
}

/**
 * Footer with link to source code
 */
function Foot() {
  return (
    <div className="footer">
      <p>This is the website of Michael Levy</p>
      <p>Built using React</p>
      <p>
        Source code available{" "}
        <a href="https://github.com/michael-levy/website">here</a> (if you're
        me)
      </p>
    </div>
  );
}

export default App;
