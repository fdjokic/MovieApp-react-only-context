import React from "react";
import styled from "styled-components";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { useGlobalContext } from "../context";
import MovieSlider from "../MovieSlider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sliderVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

const Slider = () => {
  const { filtered, carousel, next, prev } = useGlobalContext();

  return (
    <Wrapper>
      <h1>Now in theaters:</h1>
      <motion.section
        variants={sliderVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AiOutlineLeftCircle className="slider-icon-left" onClick={prev} />
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
        <AiOutlineRightCircle className="slider-icon-right" onClick={next} />
      </motion.section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  section {
    max-width: 100%;
    height: 400px;
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
    top: 30%;
    z-index: 2;
    color: white;
    font-size: 4rem;
  }
  .slider-icon-left:hover {
    transform: rotate(360deg);
    transition: 0.7s;
    cursor: pointer;
  }
  .slider-icon-right {
    color: white;
    right: 2%;
    top: 30%;
    font-size: 4rem;

    position: absolute;
    z-index: 2;
  }
  .slider-icon-right:hover {
    transform: rotate(360deg);
    transition: 0.7s;
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    section {
      height: 330px;
      padding: 0.4;
    }
    h1 {
      font-size: 1.5rem;
    }
    .slider-icon-left {
      font-size: 3.5rem;
      left: 2%;
      top: 30%;
    }
    .slider-icon-right {
      font-size: 3.5rem;
      right: 2%;
      top: 30%;
    }
  }
  @media (max-width: 1024px) {
    section {
      height: 270px;
      padding: 0.4rem;
    }
    h1 {
      font-size: 1.3rem;
    }
    .slider-icon-left {
      left: 2%;
      top: 35%;
      font-size: 2.5rem;
    }
    .slider-icon-right {
      font-size: 2.5rem;
      right: 2%;
      top: 35%;
    }
  }
  @media (max-width: 768px) {
    section {
      height: 210px;
      padding: 0.2rem;
    }
    h1 {
      font-size: 1.1rem;
    }
    .slider-icon-left {
      display: none;
    }
    .slider-icon-right {
      display: none;
    }
  }
`;
export default Slider;
