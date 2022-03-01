import React from "react";
import styled from "styled-components";

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const MovieSlider = ({ movie = [] }) => {
  const { title, poster_path: poster } = movie;

  return (
    <Wrapper>
      <div className="movie">
        <img
          src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : url}
          alt={title}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  .movie {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    width: 400px;
    height: 550px;
    pointer-events: none;
    display: block;
  }
  .movie img {
    display: block;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
`;

export default MovieSlider;
