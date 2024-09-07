import styled from "styled-components";
/**
 * Input
 *
 * @param {Function} props.func - a function to call on edit
 * @returns
 */
export default function Input(props) {
  return (
    <InputStyle
      onChange={(e) => {
        props.func(e.target.value)
      }}
      placeholder="search by title"
    >
    </InputStyle>
  );
}

export const InputStyle = styled.input`
  max-width: 200px;
  border-radius: 0px;
  border-color: var(--light-grey);
  font-family: var(--body-serif);
  padding: 10px;
	border-style: solid;
  font-size: large;
  &:focus {
        outline: none;
	}
`;
