import styled from "styled-components";
import Movie from "./Movie";
import Categories from "./Categories";
import { motion } from "framer-motion";
import SearchMovies from "./SearchMovies";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
import { GlobalStyles } from "./themes";
import Slider from "./sliders/Slider";
import SliderUpcoming from "./sliders/SliderUpcomingMovies";
import SliderTopRated from "./sliders/SliderTopRated";

export const API_KEY = process.env.REACT_APP_API_KEY;

export const gridVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 0.8,
    },
  },
  exit: {
    opcaity: 0,
    transition: {
      duration: 2,
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
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
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
    search,
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
      {/* THEAM  */}
      <GlobalStyles />
      {/* STYLED WRAPPER */}
      <Wrapper>
        <input
          className="input"
          value={isChecked}
          type="checkbox"
          onChange={handleChange}
          onClick={() => themeToggler()}
        />
        {/* BUTTONS AND SEARCH INPUT */}
        <Categories />
        <SearchMovies />

        {/* SLIDERS IF MAIN PAGE */}
        {nowInTheaters && (
          <div className="sliders-container">
            <Slider />

            <SliderUpcoming />

            <SliderTopRated />
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
        {/* MOVIE GRID OF SEARCH RESULTS  AND ERROR MESSAGE*/}
        <motion.div
          className="grid"
          variants={gridVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout
        >
          {/* EMPTY ARRAY MESSAGE */}

          {empty && (
            <motion.h1
              style={{ color: "red" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              No movies match your search criteria.
            </motion.h1>
          )}
          {/* MOVIE GRID FILTERED BY SEARCH */}
          {!nowInTheaters &&
            !empty &&
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
    margin: 1.5rem;
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
`;
export default Tree;
