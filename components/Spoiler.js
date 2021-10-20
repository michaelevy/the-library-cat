import styled from "styled-components";

export default function Spoiler({ show, children }) {
  return show ? (
    <SpoilerShown>{children}</SpoilerShown>
  ) : (
    <SpoilerHidden>
      <Below>{children}</Below>
    </SpoilerHidden>
  );
}

const SpoilerShown = styled.div`
  background: #44444440;
  border-radius: 5px;
  display: inline-block;
`;

const SpoilerHidden = styled(SpoilerShown)`
  background: var(--grey);
  position: relative;
  transition: background 0.2s;
  &:hover {
    background: #44444440;
  }
`;

const Below = styled.p`
  margin: 0;
`;
