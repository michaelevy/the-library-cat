import "./Button.css";
export default function Button(props) {
  return (
    <div>
      <a className="button" href={props.link}>
        {props.text}
      </a>
    </div>
  );
}
