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
import { GlobalStyles } from "./themes";

const imageVariants = {
  initial: {
    scale: 0.7,
    x: 0,
  },
  animate: {
    x: 0,
    scale: 1,
    transition: {
      duration: 1.2,
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
      <GlobalStyles />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.5 } }}
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
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8rem;
  .img {
    margin-right: 4rem;
    margin-left: 5rem;
    max-height: 37rem;
    border-radius: 10px;
    object-fit: cover;
  }

  .flex-box {
    display: flex;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  .date {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.5rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-left: 1rem;
    letter-spacing: 5px;
  }

  h1 {
    width: fit-content;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: ${(props) => props.theme.fontColor};
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #ff69b4;
  }
  .overview {
    font-weight: 400;
    font-size: 1.5rem;
    width: 80%;
    color: ${(props) => props.theme.fontColor};
    margin-bottom: 1rem;
    border: 1px solid #ff69b4;
    padding: 1rem;
    border-radius: 10px;
    span {
      font-weight: ${(props) => props.theme.font};
      color: ${(props) => props.theme.fontColor};
    }
  }
  .other {
    font-size: 1.5rem;
    color: ${(props) => props.theme.fontColor};
    font-weight: ${(props) => props.theme.font};
    margin-bottom: 1rem;
    span {
      font-weight: 400;
      color: ${(props) => props.theme.fontColor};
    }
  }
  .companies {
    font-size: 1.5rem;
    ${(props) => props.theme.fontColor};
    font-weight: ${(props) => props.theme.font};
    margin-bottom: 1rem;
    span {
      font-weight: 400;
      color: ${(props) => props.theme.fontColor};
    }
  }
  .production {
    font-weight: ${(props) => props.theme.font};

    margin-bottom: 0.2rem;

    span {
      font-weight: 400;
      color: ${(props) => props.theme.fontColor};
    }
  }
  .genres {
    font-size: 1.5rem;
    font-weight: ${(props) => props.theme.font};

    margin-bottom: 1rem;

    span {
      font-weight: 400;
      color: ${(props) => props.theme.fontColor};
    }
  }
  @media (max-width: 1200px) {
    width: 75vw;
    padding: 0;
    margin: 2rem 0;
    width: 95vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 1024px) {
    display: flex;
    justify-content: flex-start;
    width: 95vw;
    padding: 0;
    margin: 3rem 0;

    .img {
      height: 50%;
      margin: 0 1.5rem;
    }
    img {
      height: 50%;
    }
    h1 {
      font-size: 1.3rem;
    }
    .date {
      font-size: 0.9rem;
    }
    .overview {
      padding: 1rem;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .other {
      font-size: 1rem;
    }
    .genres {
      font-size: 1rem;
    }
    .companies {
      font-size: 1rem;
    }
  }
  @media (max-width: 780px) {
    display: flex;
    justify-content: center;
    .flex-box {
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      width: 80vw;
    }
    .img {
      margin-bottom: 2rem;
      height: 30rem;
    }
    h1 {
      font-size: 1.3rem;
    }
    .date {
      font-size: 0.9rem;
    }
    .overview {
      padding: 1rem;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .other {
      font-size: 1rem;
    }
    .genres {
      font-size: 1rem;
    }
    .companies {
      font-size: 1rem;
    }
  }
`;

export default SingleMovie;
