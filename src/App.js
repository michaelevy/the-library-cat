import "./App.css";
import Button from "./Button.js";
function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <p className="name">Michael Levy</p>
        <Button text="GitHub" link="https://github.com/michael-levy">
          GitHub
        </Button>
        <Button text="Twitter" link="https://github.com/michael-levy">
          GitHub
        </Button>
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
