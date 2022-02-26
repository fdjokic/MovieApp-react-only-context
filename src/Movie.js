import React from "react";
import styled from "styled-components";
import { gridVariants } from "./Tree";
import { motion } from "framer-motion";
import Stars from "./Stars";

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movie = ({ movie = [] }) => {
  const {
    title,
    poster_path: poster,
    release_date,
    vote_average: stars,
  } = movie;

  return (
    <Wrapper>
      <motion.div variants={gridVariants} layout className="movie">
        <img
          src={poster ? `https://image.tmdb.org/t/p/w300/${poster}` : url}
          alt={title}
        />
        <div className="stars">
          <Stars stars={stars} />
        </div>
        <div className="movie-info">
          <h4>{title || "N/A"}</h4>
          <p>{release_date ? release_date : "N/A"}</p>
        </div>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .movie {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
  }
  .movie img {
    border-radius: 12px;
    max-width: 400px;
    height: 450px;
    display: block;
    object-fit: cover;
  }

  .movie-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 85%;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.6);
    transform: translateY(100%);
    transition: 0.2s;
    font-size: 1.4rem;
  }
  .movie-info h4 {
    color: white;
    background: transparent;
    margin-bottom: 0.25rem;
  }
  .movie-info p {
    margin-bottom: 0;
    color: white;

    font-size: 0.9rem;
    background: transparent;
  }
  .movie:hover .movie-info {
    transform: translateY(0);
  }
  .movie:hover .stars {
    opacity: 1;
    transition: 0.6s ease-in;
  }
  .stars {
    padding: 0.2rem;
    border-radius: 10px;
    opacity: 0;
    position: absolute;
    right: -2px;
    font-size: 1rem;
    top: -2px;
  }
`;

export default Movie;
