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
  @media (max-width: 1200px) {
    .movie {
      height: 300px;
      width: 250px;
    }
  }
  @media (max-width: 1024px) {
    .movie {
      height: 250px;
      width: 200px;
    }
  }
  @media (max-width: 768px) {
    .movie {
      height: 200px;
      width: 150px;
    }
  }
`;

export default MovieSlider;
