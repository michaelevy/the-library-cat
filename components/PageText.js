import styled from "styled-components";

export const PageText = styled.article`
  font-family: var(--body-serif);
  margin-left: auto;
  margin-right: auto;
  max-width: 60%;
  text-align: center;
  color: var(--grey);
  line-height: 30px;

  @media only screen and (max-width: 900px) {
    max-width: 90%;
  }
`;
