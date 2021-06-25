import "./App.css";
import woo from "./woocircle.jpg";
import twitter from "./twitter.png";
import github from "./github.png";
import gmail from "./gmail.png";
import linkedin from "./linkedn.png";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Button } from "./Button.js";
import { CircleButton } from "./Button.js";
import Ramblings from "./Ramblings.js";
import Books from "./Books.js";
import Archive from "./Archive.js"

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
  const width = useLocation().pathname === "/" ? 20 : 10;
  return (
    <Link to="/">
      <img src={woo} alt="pretty swirly colours" style={{ width: width +"%"}} />
    </Link>
  );
}

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

function Nav() {
  return (
    <nav className="navbar column">
      <Link to="/" style={{width:"50%", display:"block"}}>
        <p className="name" >Levytate</p>
      </Link>
      <div className="links">
        <Link to="/books/0">
          <Button text="Book Reviews" />
        </Link>
        <Link to="/index">
          <Button text="Review Index" />
        </Link>
      </div>
    </nav>
  );
}

function Home() {

  return (
    <Fade component={
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
      </div>}
      />
  );
}

function Foot() {
  return (<div className="footer">
    <p>This is the website of Michael Levy</p>
    <p>Source code available <a href="https://github.com/michael-levy/website">here</a> (if you're me)</p>
  </div>);
}

export function Fade({component}){ 
  const [styles, setStyles] = useState(
  {
      fontSize: "50%",
      opacity: 0,
      transition: 'all 1s ease-out',
  })


  useEffect(()=>{
      setTimeout(()=>(setStyles({
          fontSize: "110%",
          opacity: 1,
          transition: 'all 1s ease-out',
      })),0)
      console.log("hi")
  },[])

  return(<div style={styles}>{component}</div>)
}

export default App;
