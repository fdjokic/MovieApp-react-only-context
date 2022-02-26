import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { API_KEY } from "./context";
import axios from "axios";

const buttonVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.7,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 1.2,
    },
    boxShadow: "0px 0px 8px rgb(255,255,255)",
  },
  hoverTwo: {
    scale: 1.1,
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.5,
    },
  },
};

const Categories = () => {
  const {
    activeGenre,
    setActiveGenre,
    genres,
    setFiltered,
    setGenres,
    popular,
  } = useGlobalContext();

  const [empty, setEmpty] = useState(false);
  // FETCH
  const fetchGenre = async (url) => {
    try {
      const data = await axios(url);
      setGenres(data.data.genres);
    } catch (error) {
      console.log(error);
    }
  };
  // USE EFFECT GENRES
  useEffect(() => {
    const genresFiltered = popular.filter((movie) => {
      return movie.genre_ids.includes(activeGenre);
    });
    if (genresFiltered.length < 1 && activeGenre !== 0) {
      console.log("hey");
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    if (activeGenre === 0) {
      setFiltered(popular);
    } else {
      setFiltered(genresFiltered);
    }

    console.log(genresFiltered);

    fetchGenre(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    // eslint-disable-next-line
  }, [activeGenre]);

  return (
    <Wrapper>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* <motion.button
          variants={buttonVariants}
          whileHover="hover"
          className="page"
          onClick={() =>
            setPage((oldPage) => {
              if (oldPage <= 1) {
                return (oldPage = 1);
              }
              return oldPage - 1;
            })
          }
        >
          previous
        </motion.button> */}
        <button
          onClick={() => setActiveGenre(0)}
          className={activeGenre === 0 ? "active" : null}
        >
          All
        </button>

        {genres.map((genre) => {
          const { id, name } = genre;

          return (
            <button
              key={id}
              onClick={() => setActiveGenre(id)}
              className={genre.id === activeGenre ? "active" : null}
            >
              {name}
            </button>
          );
        })}

        {/* <motion.button
          variants={buttonVariants}
          whileHover="hover"
          className="page"
          onClick={() => setPage((oldPage) => oldPage + 1)}
        >
          next
        </motion.button> */}
      </motion.div>
      {empty && (
        <h2
          style={{ color: "red", fontFamily: "monospace", marginTop: "4rem" }}
        >
          No movies matched your category search.
        </h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 70vw;
  margin: 2rem auto;

  button {
    margin: 0.5rem 0.8rem;
    padding: 0.6rem;
    border: ${(props) => props.theme.border};
    cursor: pointer;
    min-width: 5rem;
    width: fit-content;
    color: ${(props) => props.theme.fontColor};

    border-radius: 30px;
    background: ${(props) => props.theme.body};

    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bold;
  }
  .active {
    color: white;
    border: 2px solid white;
    background-color: #ff69b4;
  }
`;

export default Categories;
