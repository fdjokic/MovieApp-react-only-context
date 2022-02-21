import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Movie from "./Movie";
import Categories from "./Categories";
import { motion } from "framer-motion";
import SearchMovies from "./SearchMovies";
import { API_KEY } from "./SearchMovies";
import { AnimatePresence } from "framer-motion";

export const gridVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 4,
    },
  },
};

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [page, setPage] = useState(1);

  const fetchMovies = async (url) => {
    try {
      const data = await axios(url);
      const movies = data.data.results;
      setPopular(movies);
      setFiltered(movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
  }, [page]);

  return (
    <>
      <Categories
        popular={popular}
        setFiltered={setFiltered}
        setActiveGenre={setActiveGenre}
        activeGenre={activeGenre}
        setPage={setPage}
      />
      <SearchMovies
        fetchMovies={fetchMovies}
        setFiltered={setFiltered}
        filtered={filtered}
      />
      <Wrapper>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="grid"
            variants={gridVariants}
            initial="initial"
            animate="animate"
          >
            {filtered.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .grid {
    margin-top: 10rem;
    width: 95vw;
    display: grid;
    gap: 2rem;
    margin: 0 auto;
    padding-bottom: 5rem;
    padding-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-family: monospace;
  }
`;

export default App;
