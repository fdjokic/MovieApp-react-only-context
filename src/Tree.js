import styled from "styled-components";
import Movie from "./Movie";
import Categories from "./Categories";
import { motion } from "framer-motion";
import SearchMovies from "./SearchMovies";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
import { GlobalStyles } from "./themes";
import MovieSlider from "./MovieSlider";
import { useState } from "react";
import Slider from "./Slider";

export const API_KEY = process.env.REACT_APP_API_KEY;

export const gridVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};
const h1Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.9,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.5,
    },
  },
};

const Tree = () => {
  const {
    empty,
    filtered,
    loading,
    theme,
    setTheme,
    isChecked,
    setIsChecked,
    nowInTheaters,
    carousel = false,
  } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <GlobalStyles transition={`${(props) => props.theme.transition}`} />
      <Wrapper>
        <input
          className="input"
          value={isChecked}
          type="checkbox"
          onChange={handleChange}
          onClick={() => themeToggler()}
        />
        <Categories />
        <SearchMovies />

        {nowInTheaters && (
          <div>
            <motion.h1 variants={h1Variants} initial="hidden" animate="visible">
              Now in theaters:
            </motion.h1>
            <Slider />
            {/* <motion.section
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="carousel"
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                ref={carousel}
              >
                {filtered.map((movie) => {
                  const { id } = movie;
                  return (
                    <div to={`/movies/${id}`} key={id}>
                      <MovieSlider key={id} movie={movie} />
                    </div>
                  );
                })}
              </motion.div>
              <BtnSlider moveSlide={previousSlide} direction={"prev"} />
            </motion.section> */}
          </div>
        )}
        <motion.div
          layout
          className="grid"
          variants={gridVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {empty && (
            <motion.h1
              style={{ color: "red" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              No movies match your search criteria.
            </motion.h1>
          )}
          {!nowInTheaters &&
            filtered.map((movie) => {
              const { id } = movie;
              return (
                <Link to={`/movies/${id}`} key={id}>
                  <Movie key={id} movie={movie} />
                </Link>
              );
            })}
        </motion.div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  color: ${(props) => props.theme.fontColor};
  transition: ${(props) => props.theme.transition};
  .input {
    margin-left: 3rem;
    cursor: pointer;
    -webkit-appearance: none;
    position: relative;
    width: 60px;
    height: 30px;
    background: #ff69b4;
    background-size: cover;
    border-radius: 50px;
    outline: none;
  }

  .input:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
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
    margin: 3rem auto;
    text-align: center;
    width: fit-content;
  }
  .grid {
    width: 80vw;
    display: grid;
    gap: 2rem;
    margin: 0 auto;
    padding-bottom: 5rem;
    padding-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-family: monospace;
  }
  .carousel {
    z-index: 1;
    display: flex;
    gap: 3rem;
    cursor: grab;
  }
  section {
    position: relative;
    height: 550px;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: grab;
    margin-left: 1rem;
    padding: 1rem;
    box-shadow: 0 1px 9px rgb(255 255 255 / 0.2);
  }
`;
export default Tree;
