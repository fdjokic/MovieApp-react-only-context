import React from "react";
import styled from "styled-components";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { useGlobalContext } from "./context";
import MovieSlider from "./MovieSlider";
import { Link, useParams } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const ReactSlider = () => {
  const { filtered } = useGlobalContext();
  const { id } = useParams();
  return (
    <Wrapper>
      <AiOutlineLeftCircle size={60} className="slider-icon-left" />
      <div className="slider">
        {filtered.map((movie, index) => {
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
      <AiOutlineRightCircle size={60} className="slider-icon-right" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 550px;
  position: relative;
  display: flex;
  align-items: center;

  .slider {
    width: 100%;
    height: 100%;
    z-index: 1;
    align-items: center;
    overflow-x: scroll;
    scrollbar-width: none;
    display: inline-block;
    white-space: nowrap;
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

  .movie {
    border-radius: 15px;
    width: 400px;
    height: 500px;
    box-shadow: 0 3px 10px rgb(255 255 255 / 0.4);
    display: inline-block;
  }
  .movie img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export default ReactSlider;
