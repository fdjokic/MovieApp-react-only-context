import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGlobalContext } from "./context";
import { API_KEY } from "./context";

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

  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`
    );
  }; // eslint-disable-next-line
  // USE EFFECT MOVIES

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
    border-radius: 15px;
    padding: 1.5rem;
    outline: none;
    border: 1px solid white;
    color: black;
  }
`;
export default SearchMovies;
