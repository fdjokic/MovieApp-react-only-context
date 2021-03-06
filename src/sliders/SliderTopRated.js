import React from "react";
import styled from "styled-components";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { useGlobalContext } from "../context";
import MovieSlider from "../MovieSlider";
import { Link } from "react-router-dom";

const SliderTopRated = () => {
  const { topRated, carousel, next, prev, setShowHamburger, closeSidebar } =
    useGlobalContext();

  return (
    <Wrapper>
      <h1>Top Rated:</h1>
      <section>
        <AiOutlineLeftCircle className="slider-icon-left" onClick={prev} />
        <div className="slider" ref={carousel}>
          {topRated.map((movie) => {
            const { id } = movie;
            return (
              <div
                onClick={() => setShowHamburger(false)}
                style={{ display: "inline-block" }}
              >
                <Link to={`/movies/${id}`} key={id} onClick={closeSidebar}>
                  <MovieSlider movie={movie} key={id} />
                </Link>
              </div>
            );
          })}
        </div>
        <AiOutlineRightCircle className="slider-icon-right" onClick={next} />
      </section>
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
  h1 {
    margin: 1.5rem;
  }
  @media (max-width: 1200px) {
    section {
      height: 330px;
      padding: 0.4;
    }
    h1 {
      font-size: 1.5rem;
      margin: 1rem;
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
      margin: 0.8rem;
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
      margin: 0.5rem;
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
export default SliderTopRated;
