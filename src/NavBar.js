import React from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { useGlobalContext } from "./context";

const NavBar = () => {
  const {
    setSideBar,
    setNowInTheaters,
    setQuery,
    isChecked,
    setIsChecked,
    theme,
    setTheme,
    sideBar,
  } = useGlobalContext();
  const backToHome = () => {
    setNowInTheaters(true);
    setQuery("");
  };

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Wrapper>
        <input
          className="input"
          value={isChecked}
          type="checkbox"
          onChange={handleChange}
          onClick={() => themeToggler()}
        />
        <Link to="/" className="link" onClick={backToHome}>
          <div>
            <BiCameraMovie className="icon" />
            <h1>Movie Temple</h1>
          </div>
        </Link>
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setSideBar(!sideBar)}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.nav`
  width: 60vw;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hamburger {
    display: none;
  }
  .input {
    margin-left: 3rem;
    cursor: pointer;
    -webkit-appearance: none;
    position: relative;
    width: 35px;
    height: 20px;
    background: #ff69b4;
    background-size: cover;
    border-radius: 30px;
    outline: none;
  }

  .input:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background: white;
    border-radius: 50px;
    transition: 0.5s;
  }

  .input:checked {
    background: black;
  }

  .input:checked:before {
    transition: 0.5s;
    transform: translate(100%);
  }

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
    gap: 1rem;
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
      width: 95vw;
      justify-content: space-between;

      .icon {
        font-size: 1.8rem;
      }
      h1 {
        font-size: 1.8rem;
      }
      .input {
        width: 25px;
        height: 15px;
        margin-left: 1rem;
      }
      .input:before {
        height: 15px;
        width: 15px;
      }
      .hamburger {
        color: ${(props) => props.theme.icon};
        display: block;
        font-size: 1.7rem;
        cursor: pointer;
      }
      .hamburger:hover {
        transform: rotate(180deg);
        color: ${(props) => props.theme.hamburgerColor};
        transition: 0.7s;
      }
      div {
        gap: 0.5rem;
      }
    }
  }
`;

export default NavBar;
