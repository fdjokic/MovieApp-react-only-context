import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { API_KEY } from "./Tree";
import styled from "styled-components";
import Loading from "./Loading";
import { motion } from "framer-motion";
import StarsSingleMovie from "./StarsSingleMovie";
import { formatPrice } from "./formatPrice";

const imageVariants = {
  initial: {
    scale: 1.2,
    x: 0,
  },
  animate: {
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const fetchSingleMovie = async () => {
    setLoading(true);
    try {
      const movie = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(movie.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleMovie();
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  console.log(movie);

  const {
    title,
    poster_path: poster = null,
    release_date,
    revenue,
    vote_average: stars,
    vote_count,
    runtime,
    production_companies = [],
    overview,
    genres = [],
  } = movie;

  return (
    <Wrapper>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
      >
        <div className="flex-box">
          <motion.img
            className={poster ? "img" : "wait-img"}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            src={
              poster === null ? url : `https://image.tmdb.org/t/p/w500${poster}`
            }
            alt={title}
          />
          <div className="title-reviews">
            <h1>
              {title}
              <span className="date">{`(${release_date})`}</span>
            </h1>
            <header></header>
            <StarsSingleMovie stars={stars} vote_count={vote_count} />
            <p className="overview">
              <span>Overview:</span>
              <br />
              {overview}
            </p>

            <p className="other">
              Length: <span>{runtime} minutes</span>
            </p>
            <p className="other">
              Revenue : <span>{formatPrice(revenue)}</span>
            </p>
            <div className="genres">
              <p className="production">Genres:</p>
              {genres.map((genre, index) => {
                const { name } = genre;
                return (
                  <span key={index}>
                    {name} <br />
                  </span>
                );
              })}
            </div>
            <div className="companies">
              <p className="production">Production companies:</p>
              {production_companies.map((company, index) => {
                const { name } = company;
                return (
                  <span key={index}>
                    {name} <br />
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5rem;
  margin-left: 4rem;
  .img {
    margin-right: 4rem;
    margin-left: 5rem;
    border: 4px solid #ff69b4;
    height: 55rem;
    border-radius: 10px;
    object-fit: cover;
  }
  .wait-img {
    height: 55rem;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 4rem;
    margin-left: 5rem;
  }
  .flex-box {
    display: flex;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  .date {
    font-size: 1.5rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: grey;
    margin-left: 1rem;
    letter-spacing: 5px;
  }
  header {
    height: 0.7px;
    background-color: #ff69b4;
    width: 100%;
  }
  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #171717;
  }
  .overview {
    font-size: 1.5rem;
    width: 60%;
    color: white;
    margin-bottom: 1rem;
    border: 1px solid #ff69b4;
    padding: 1rem;
    border-radius: 10px;
    span {
      color: #ff69b4;
    }
  }
  .other {
    font-size: 1.5rem;
    color: #ff69b4;
    margin-bottom: 1rem;
    span {
      color: white;
    }
  }
  .companies {
    font-size: 1.5rem;
    color: #ff69b4;
    margin-bottom: 1rem;
    span {
      color: white;
    }
  }
  .production {
    margin-bottom: 0.2rem;
  }
  .genres {
    font-size: 1.5rem;
    color: #ff69b4;
    margin-bottom: 1rem;
    span {
      color: white;
    }
  }
`;

export default SingleMovie;
