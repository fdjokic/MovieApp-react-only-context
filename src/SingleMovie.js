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
      duration: 0.2,
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
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        <div className="flex-box">
          <motion.img
            className={poster === null ? "wait-img" : "img"}
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
              {title ? title : "N/A"}
              <span className="date">{`(${
                release_date ? release_date : "N/A"
              })`}</span>
            </h1>

            <StarsSingleMovie stars={stars} vote_count={vote_count} />
            <p className="overview">
              <span>Overview:</span>
              <br />
              {overview ? overview : "N/A"}
            </p>

            <p className="other">
              Length:{" "}
              <span>
                {runtime ? runtime : "N/A"} {runtime ? "minutes" : null}
              </span>
            </p>
            <p className="other">
              Revenue : <span>{revenue ? formatPrice(revenue) : "N/A"}</span>
            </p>
            <div className="genres">
              <p className="production">Genres:</p>
              {genres
                ? genres.map((genre, index) => {
                    const { name } = genre;
                    return (
                      <span key={index}>
                        {name ? name : "N/A"} <br />
                      </span>
                    );
                  })
                : "N/A"}
            </div>
            <div className="companies">
              <p className="production">Production companies:</p>
              {production_companies
                ? production_companies.map((company, index) => {
                    const { name } = company;
                    return (
                      <span key={index}>
                        {name ? name : "N/A"} <br />
                      </span>
                    );
                  })
                : "N/A"}
            </div>
          </div>
        </div>
      </motion.section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 75vw;
  padding: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10rem;

  .img {
    margin-right: 4rem;
    margin-left: 5rem;
    height: 55rem;
    border-radius: 10px;
    object-fit: cover;
  }
  .wait-img {
    height: 55rem;
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

  h1 {
    width: fit-content;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #171717;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #ff69b4;
  }
  .overview {
    font-size: 1.5rem;
    width: 80%;
    color: ${(props) => props.theme.fontColor};
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
