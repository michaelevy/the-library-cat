import "./App.css";
import woo from "./woocircle.jpg";
import twitter from "./twitter.png";
import github from "./github.png";
import gmail from "./gmail.png";
import linkedin from "./linkedn.png";
import Fade from "react-reveal/Fade";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Button } from "./Button.js";
import { CircleButton } from "./Button.js";
import Ramblings from "./Ramblings.js";
import Books from "./Books.js";

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

function Image() {
  const width = useLocation().pathname === "/" ? 300 : 150;
  return (
    <Link to="/">
      <img src={woo} alt="pretty swirly colours" style={{ width: width }} />
    </Link>
  );
}

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/ramblings" component={Ramblings}></Route>
      <Route exact path="/books" component={Books}></Route>
    </Switch>
  );
}

function Nav() {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="name">Michael Levy</p>
      </Link>
      <div className="links">
        <Link to="/books">
          <Button text="Book Reviews" />
        </Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <Fade bottom>
      <div className="links">
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
    </Fade>
  );
}
function Foot() {
  return <div className="footer"></div>;
}
export default App;
