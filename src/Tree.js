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
  const { empty, nowInTheaters, setShowHamburger } = useGlobalContext();

  return (
    <>
      {/* THEME  */}
      <GlobalStyles />
      {/* STYLED WRAPPER */}
      <Wrapper>
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
          {empty && !nowInTheaters && (
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

  .empty-message {
    text-align: center;
    color: red;
  }

  @media (max-width: 1200px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
`;
export default Tree;
