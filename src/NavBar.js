import React from "react";
import styled from "styled-components";
import { RiAncientGateLine } from "react-icons/ri";
import { RiMovie2Line } from "react-icons/ri";

const NavBar = () => {
  return (
    <Wrapper>
      <div>
        <RiMovie2Line className="icon" />
        <h1>Movie Temple</h1>
        <RiAncientGateLine className="icon" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 100vw;
  height: 4rem;

  h1 {
    background: -webkit-linear-gradient(#d03838, #f033ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3.5rem;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
  .icon {
    color: white;
    font-size: 3rem;
  }
`;

export default NavBar;
