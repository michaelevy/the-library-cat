import "./Button.css";
export function Button(props) {
  return (
    <div>
      <a className="button" href={props.link}>
        {props.text}
      </a>
    </div>
  );
}

export function ButtonAction(props) {
  return (
    <div>
      <button className="button" onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export function CircleButton(props) {
  return (
    <div>
      <a className="button circle" href={props.link}>
        <img
          className="img"
          style={{ maxWidth: 100 }}
          src={props.image}
          alt={props.text}
        />
      </a>
    </div>
  );
}
