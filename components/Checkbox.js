import styled from "styled-components";

/**
 * Checkbox
 *
 * @param {Function} props.func - a function to call on edit
 * @returns
 */
export default function Checkbox(props) {
  return (
    <CheckboxBorderStyle>
    <CheckboxStyle
      onChange={(e) => {
        props.func(e.target.value, e.target.checked)
      }}
      placeholder="title"
      type="checkbox"
      value={props.value}
      id={props.value}
      defaultChecked={true}
    >
    </CheckboxStyle>
    <Label>{props.children}</Label>
    </CheckboxBorderStyle>
  );
}

export const CheckboxStyle = styled.input`
  border-color: var(--light-grey);
  font-family: var(--body-serif);
  padding: 10px;
	border-style: solid;
  font-size: large;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 2px #0000003d;
  accent-color: var(--mid-sec);
  &:focus {
    outline: none;
    box-shadow: 0 2px 4px #0000003d;
    filter: brightness(95%);
	}
`;

export const CheckboxBorderStyle = styled.div`
  font-family: var(--body-serif);
  padding: 5px;
  border-style: none;
  font-size: large;
  &:focus {
        outline: none;
	}
  display:flex;
  flex-direction:row;
  align-items: center;
  margin: 10px;
`;

export const Label = styled.label`
    min-width: min-content;
    margin-left: 20px;
`