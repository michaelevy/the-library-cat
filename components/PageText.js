import styled from "styled-components";

export function PageText(props) {
  return <PageTextStyle>{props.children}</PageTextStyle>;
}
const PageTextStyle = styled.article`
  font-family: var(--body-serif);
  margin-left: auto;
  margin-right: auto;
  max-width: 50%;
  text-align: left;
  color: var(--grey);
  line-height: 30px;

  @media only screen and (max-width: 1300px) {
    max-width: 90%;
  }
`;
