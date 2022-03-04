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
          src={poster ? `https://image.tmdb.org/t/p/w400/${poster}` : url}
          alt={title}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .movie {
    border-radius: 15px;
    width: 300px;
    height: 350px;
    margin: 0 0.7rem;
    box-shadow: ${(props) => props.theme.cardShadow};
  }
  .movie img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .movie:hover {
    background-color: ${(props) => props.theme.movieBackground};

    border-bottom: ${(props) => props.theme.movieBottomBorder};
    transition: 0.2s;
  }
`;

export default MovieSlider;
