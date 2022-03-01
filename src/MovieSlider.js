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
  .movie {
    border-radius: 15px;
    width: 400px;
    height: 500px;
    box-shadow: 0 3px 10px rgb(255 255 255 / 0.4);
    margin: 0 0.7rem;
  }
  .movie img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default MovieSlider;
