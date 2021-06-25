import "./Button.css";

/**
 * Create a button which links to a url
 * @prop {string} link
 * @prop text
 */
export function Button(props) {
  return (
    <div>
      <a className="button" href={props.link} >
        {props.text}
      </a>
    </div>
  );
}

/**
 * Create a button which executes a function
 * @param {function} onClick
 * @param {string} text
 * @param {integer} width (optional)
 */
export function ButtonAction(props) {
  return (
    <div>
      <button className="button" onClick={props.onClick} style={props.width?{width:props.width}:{width:"10em"}}>
        {props.text}
      </button>
    </div>
  );
}

/**
 * Create a set of buttons which each execute a function
 * @prop buttons
 */
export function SelectButton(props){
  return (
    <div className="row">
      {props.buttons.map((button)=>{return <button className="select" style={{borderWidth: button.selected ? 1 : 0}}onClick={button.onClick}>{button.name}</button>})}
    </div>
  )
}


export function CircleButton(props) {
  return (
    <div>
      <a className="button circle" href={props.link}>
        <img
          className="img"
          style={{ maxWidth: "60%" }}
          src={props.image}
          alt={props.text}
        />
      </a>
    </div>
  );
}
