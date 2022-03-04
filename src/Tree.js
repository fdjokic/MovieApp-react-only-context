import styled from "styled-components";
import Categories from "./Categories";
import { motion } from "framer-motion";
import SearchMovies from "./SearchMovies";
import { useGlobalContext } from "./context";
import { GlobalStyles } from "./themes";
import Slider from "./sliders/Slider";
import SliderUpcoming from "./sliders/SliderUpcomingMovies";
import SliderTopRated from "./sliders/SliderTopRated";
import MoviesGrid from "./MoviesGrid";
import Empty from "./Empty";

export const API_KEY = process.env.REACT_APP_API_KEY;

const sliderVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
  exit: {
    opacity: 0,
  },
};
export const gridVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};
const Tree = () => {
  const { empty, theme, setTheme, isChecked, setIsChecked, nowInTheaters } =
    useGlobalContext();

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {/* THEME  */}
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
          <motion.div
            className="sliders-container"
            variants={sliderVariants}
            initial="intial"
            animate="animate"
            exit="exit"
          >
            <Slider />
            <SliderUpcoming />
            <SliderTopRated />
          </motion.div>
        )}
        {/* MOVIE GRID OF SEARCH RESULTS  AND ERROR MESSAGE*/}
        <div>
          {/* EMPTY ARRAY MESSAGE */}
          {empty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <Empty />
            </motion.div>
          )}
          {/* MOVIE GRID FILTERED BY SEARCH */}
          {!nowInTheaters && !empty && (
            <motion.div
              layout
              variants={gridVariants}
              initial="intial"
              animate="animate"
            >
              <MoviesGrid />
            </motion.div>
          )}
        </div>
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
  .empty-message {
    text-align: center;
    color: red;
  }

  @media (max-width: 1200px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    .input {
      width: 25px;
      height: 15px;
    }
    .input:before {
      height: 15px;
      width: 15px;
    }
  }
`;
export default Tree;
