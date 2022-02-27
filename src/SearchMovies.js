import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGlobalContext } from "./context";
import { API_KEY } from "./context";
import axios from "axios";
import MovieList from "./MovieList";
import { Link } from "react-router-dom";

const searchVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.5,
    },
  },
};
const SearchMovies = () => {
  const { query, setQuery, fetchMovies, page } = useGlobalContext();
  const focusInput = useRef(null);
  const [filterList, setFilterList] = useState([]);

  const fetchList = async (url) => {
    try {
      const data = await axios(url);
      const movies = data.data.results;
      setFilterList(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterList([]);
    fetchMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`
    );
  };

  // USE EFFECT MOVIES
  useEffect(() => {
    const filterSearch = filterList.filter((movie) => {
      return movie.title.startsWith(query);
    });

    fetchList(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`
    );
    setFilterList(filterSearch);
    // eslint-disable-next-line
  }, [query]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <motion.input
          ref={focusInput}
          variants={searchVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div className="search-list">
            {filterList.map((movie) => {
              return (
                <article className="item">
                  <Link
                    to={`/movies/${movie.id}`}
                    key={movie.id}
                    style={{ textDecoration: "none" }}
                  >
                    <MovieList title={movie.title} key={movie.id} />
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: fit-content;
  margin: 1rem auto;
  input {
    background-color: ${(props) => props.theme.input};
    text-transform: capitalize;
    opacity: 0.7;
    width: 40rem;
    height: 0.1rem;
    font-size: 1.5rem;
    border-radius: 15px 0;
    padding: 1.5rem;
    outline: none;
    border: 1px solid white;
    color: black;
  }
  .search-list {
    border-radius: 0 15px;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
  }
  .item {
    margin: 0.5rem 1rem;
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
  .item:hover {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: black;
  }
`;
export default SearchMovies;
