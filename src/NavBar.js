import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { useGlobalContext } from "./context";
import { getSuggestedQuery } from "@testing-library/react";

const NavBar = () => {
  const { setNowInTheaters, setQuery } = useGlobalContext();
  const backToHome = () => {
    setNowInTheaters(true);
    setQuery("");
  };
  return (
    <>
      <Wrapper>
        <Link to="/" className="link" onClick={backToHome}>
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
  width: 70vw;
  height: 4rem;
  margin: 0 auto;

  h1 {
    background: ${(props) => props.theme.navText};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
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
    font-size: 2.5rem;
  }
  .link {
    text-decoration: none;
  }
  @media (max-width: 1200px) {
    .icon {
      font-size: 2.3rem;
    }
    h1 {
      font-size: 2.3rem;
    }
    @media (max-width: 1024px) {
      .icon {
        font-size: 2.3rem;
      }
      h1 {
        font-size: 2.3rem;
      }
    }
    @media (max-width: 768px) {
      .icon {
        font-size: 1.8rem;
      }
      h1 {
        font-size: 1.8rem;
      }
    }
  }
`;

export default NavBar;
