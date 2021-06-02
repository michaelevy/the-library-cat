import "./App.css";
import woo from "./woocircle.jpg";
import Fade from "react-reveal/Fade";
import React from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Ramblings from "./Ramblings.js";
import { Button } from "./Button.js";
import { CircleButton } from "./Button.js";

function App() {
  return (
    <div className="App">
      <header>
        <Fade top>
          <Link to="/">
            <img src={woo} alt="pretty swirly colours" style={{ width: 300 }} />
          </Link>
        </Fade>
      </header>
      <Nav />
      <Main />
    </div>
  );
}

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/ramblings" component={Ramblings}></Route>
    </Switch>
  );
};

function Nav() {
  return (
    <nav className="navbar">
      <Fade left>
        <Link to="/">
          <p className="name">Michael Levy</p>
        </Link>
      </Fade>
      <Fade right>
        <div className="links">
          <Button text="GitHub" link="https://github.com/michael-levy">
            GitHub
          </Button>
          <Button text="Email" link="mailto:michaelfeehanlevy@gmail.com">
            GitHub
          </Button>
          <Button text="Twitter" link="https://twitter.com/CatToTheFour">
            GitHub
          </Button>
          <Button text="Linkedin" link="https://www.linkedin.com/in/michaelvy/">
            GitHub
          </Button>
        </div>
      </Fade>
    </nav>
  );
}

function Home() {
  return (
    <Fade bottom>
      <Link to="/ramblings">
        <CircleButton text="TO RAMBLINGS" />
      </Link>
    </Fade>
  );
}

export default App;
