import styled from "styled-components";
import { SortButtonStyle } from "./MoveButton";
import { motion } from "framer-motion";

export default function Button(props) {
  return (
    <ButtonStyle
      as={motion.button}
      whileHover={{ scale: 1.05, duration: 2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        props.onClick();
      }}
      style={
        props.selected
          ? { background: "var(--orange) " }
          : { background: "var(--mid-sec)", color: "var(--grey) " }
      }
    >
      {props.children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled(SortButtonStyle)`
  transition: background 0.2s;
  font-family: var(--body-sans);
  font-size: calc(20px * var(--text-ratio));
  width: 100%;
  height: 100%;
`;
