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

export function CircleButton(props) {
  return (
    <div>
      <a className="button circle" href={props.link}>
        {props.text}
      </a>
    </div>
  );
}
