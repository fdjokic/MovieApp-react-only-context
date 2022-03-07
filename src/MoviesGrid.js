import React from "react";
import { useGlobalContext } from "./context";
import Movie from "./Movie";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Loading from "./Loading";

const MoviesGrid = () => {
  const { filtered, searchLoading, closeSidebar, setShowHamburger } =
    useGlobalContext();
  if (searchLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <div className="grid">
        {filtered.map((movie) => {
          const { id } = movie;
          return (
            <div onClick={() => setShowHamburger(false)}>
              <Link to={`/movies/${id}`} key={id} onClick={closeSidebar}>
                <Movie key={id} movie={movie} />
              </Link>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default MoviesGrid;

const Wrapper = styled.div`
  .grid {
    width: 90vw;
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
