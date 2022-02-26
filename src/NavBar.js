import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

const NavBar = () => {
  return (
    <>
      <Wrapper>
        <Link to="/" className="link">
          <div>
            <BiCameraMovie className="icon" />
            <h1>Movie Temple</h1>
          </div>
        </Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.nav`
  width: 90vw;
  height: 4rem;
  margin: 0 auto;

  h1 {
    background: ${(props) => props.theme.navText};
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
    margin: 1rem auto;
  }
  .icon {
    color: ${(props) => props.theme.icon};
    font-size: 3.5rem;
  }
  .link {
    text-decoration: none;
  }
`;

export default NavBar;
