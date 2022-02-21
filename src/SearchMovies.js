import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const API_KEY = process.env.REACT_APP_API_KEY;

const searchVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      delay: 2,
      stiffness: 90,
    },
  },
};

const SearchMovies = ({ fetchMovies, filtered, setFiltered }) => {
  const [query, setQuery] = useState("");
  const focusInput = useRef(null);

  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      setFiltered(filtered);
    }
  };

  useEffect(() => {
    fetchMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
    );
  }, [query]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <motion.input
          ref={focusInput}
          variants={searchVariants}
          initial="hidden"
          animate="visible"
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
  input {
    width: 40rem;
    height: 0.1rem;
    font-size: 1.5rem;
    border-radius: 15px;
    padding: 1.5rem;
    outline: none;
    border: 1px solid white;
    color: white;
  }
`;
export default SearchMovies;
