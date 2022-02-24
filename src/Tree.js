import styled from "styled-components";
import Movie from "./Movie";
import Categories from "./Categories";
import { motion } from "framer-motion";
import SearchMovies from "./SearchMovies";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Loading from "./Loading";

export const API_KEY = process.env.REACT_APP_API_KEY;

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
  exit: {
    y: "100vh",
    transition: {
      delay: 0.1,
      type: "spring",
    },
  },
};
const h1Variants = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 0.3,
      type: "spring",
    },
  },
  exit: {
    x: "100vw",
    transition: {
      delay: 0.3,
      type: "spring",
    },
  },
};
const Tree = () => {
  const { query, filtered, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Categories />
      <SearchMovies />
      <Wrapper>
        {!query ? (
          <motion.h1
            variants={h1Variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Now in theaters:
          </motion.h1>
        ) : null}
        <motion.div
          layout
          className="grid"
          variants={gridVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {filtered.map((movie) => {
            const { id } = movie;
            return (
              <Link to={`/movies/${id}`} key={id}>
                <Movie key={id} movie={movie} />
              </Link>
            );
          })}
        </motion.div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  h1 {
    margin: 3rem 0 0 0;
    text-align: center;
    color: white;
    font-family: monospace;
  }
  .grid {
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
export default Tree;
