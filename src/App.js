import "./App.css";
import Button from "./Button.js";
import woo from "./woocircle.png";
import Fade from "react-reveal/Fade";
function App() {
  return (
    <div className="App">
      <header>
        <Fade top>
          <img width="300" src={woo} alt="pretty swirly colours" />
        </Fade>
      </header>
      <nav className="navbar">
        <Fade left>
          <p className="name">Michael Levy</p>
        </Fade>
        <Fade right>
          <div className="links">
            <Button text="GitHub" link="https://github.com/michael-levy">
              GitHub
            </Button>
            <Button text="Twitter" link="https://twitter.com/CatToTheFour">
              GitHub
            </Button>
          </div>
        </Fade>
      </nav>
      <Buttons num={25} link="http://localhost:3000/" />
    </div>
  );
}
function Buttons(props) {
  var buttons = [];
  for (var i = 0; i < props.num; i++) {
    buttons.push(<Button text={i} link={props.link}></Button>);
  }
  return buttons;
}
export default App;
