import styled from "styled-components";
import Movie from "./Movie";
import Categories from "./Categories";
import { motion } from "framer-motion";
import SearchMovies from "./SearchMovies";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
import { GlobalStyles } from "./themes";

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
  const {
    query,
    filtered,
    loading,
    empty,
    theme,
    setTheme,
    isChecked,
    setIsChecked,
  } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  if (loading) {
    return <Loading />;
  }
  if (empty) {
    return <h1>No movies matched.</h1>;
  }
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <input
          className="input"
          value={isChecked}
          type="checkbox"
          onChange={handleChange}
          onClick={() => themeToggler()}
        />
        <Categories />
        <SearchMovies />
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
          {!empty &&
            filtered.map((movie) => {
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
  color: ${(props) => props.theme.fontColor};
  transition: ${(props) => props.theme.transition};
  .input {
    margin-left: 3rem;
    cursor: pointer;
    -webkit-appearance: none;
    position: relative;
    width: 60px;
    height: 30px;
    background-image: url(https://i.postimg.cc/857jHw2q/Screenshot-2020-04-16-at-1-07-06-PM.png);
    background-size: cover;
    border-radius: 50px;
    outline: none;
  }

  .input:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    background-color: #ff69b4;
    border-radius: 50px;
    transition: 0.5s;
  }

  .input:checked {
    background-image: url(https://i.postimg.cc/Hn0nstVK/Screenshot-2020-04-16-at-1-07-19-PM.png);
  }

  .input:checked:before {
    transition: 0.5s;
    transform: translate(100%);
  }
  h1 {
    margin: 3rem 0 0 0;
    text-align: center;
    font-family: monospace;
  }
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
export default Tree;
