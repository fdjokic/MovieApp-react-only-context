import React from "react";
import styled from "styled-components";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { useGlobalContext } from "./context";
import MovieSlider from "./MovieSlider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sliderVariants = {
  initial: { x: "100vw" },
  animate: {
    x: 0,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: 0.4,
  },
};

const Slider = () => {
  const { filtered, carousel, next, prev } = useGlobalContext();

  return (
    <Wrapper>
      <motion.section
        variants={sliderVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AiOutlineLeftCircle
          size={70}
          className="slider-icon-left"
          onClick={prev}
        />
        <div className="slider" ref={carousel}>
          {filtered.map((movie) => {
            const { id } = movie;
            return (
              <Link
                to={`/movies/${id}`}
                key={id}
                style={{ display: "inline-block" }}
              >
                <MovieSlider movie={movie} key={id} />
              </Link>
            );
          })}
        </div>
        <AiOutlineRightCircle
          size={70}
          className="slider-icon-right"
          onClick={next}
        />
      </motion.section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  section {
    width: 100%;
    height: 550px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .slider {
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow-x: scroll;
    white-space: nowrap;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  .slider::-webkit-scrollbar {
    display: none;
  }
  .slider-icon-left {
    position: absolute;
    left: 2%;
    z-index: 2;
    color: white;
  }
  .slider-icon-left:hover {
    transform: rotate(360deg);
    transition: 0.7s;
    cursor: pointer;
  }
  .slider-icon-right {
    color: white;
    right: 2%;
    position: absolute;
    z-index: 2;
  }
  .slider-icon-right:hover {
    transform: rotate(360deg);
    transition: 0.7s;
    cursor: pointer;
  }
`;
export default Slider;
