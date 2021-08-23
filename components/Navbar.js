import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
/**
 * Navigation bar
 */
export default function Navbar() {
  return (
    <Nav>
      <Link href="/" scroll={false}>
        <NavLink as={motion.div}>Home</NavLink>
      </Link>
      <Link href="/about" scroll={false}>
        <NavLink>About</NavLink>
      </Link>
      <Link href="/contact" scroll={false}>
        <NavLink>Contact</NavLink>
      </Link>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const NavLink = styled.a`
  margin: 10px;
  text-decoration: none;
  color: var(--dark-green);
  cursor: pointer;
  position: relative;

  &::after {
    width: 100%;
    content: "";
    transition: 500ms;
    will-change: transform;
    position: absolute;
    display: block;
    border-bottom: 2px solid var(--grey);
  }
  &:hover::after {
    transition: 150ms;
    transform: translateY(2px);
    content: "";
    position: absolute;
    display: block;
    border-bottom: 4px solid var(--grey);
  }
`;
