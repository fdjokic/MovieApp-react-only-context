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
      delay: 0.5,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};
const h1Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.9,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.5,
    },
  },
};

const Tree = () => {
  const {
    empty,
    query,
    filtered,
    loading,
    theme,
    setTheme,
    isChecked,
    setIsChecked,
    nowInTheaters,
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

  return (
    <>
      <GlobalStyles transition={`${(props) => props.theme.transition}`} />
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

        {nowInTheaters ? (
          <motion.h1 variants={h1Variants} initial="hidden" animate="visible">
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
          {empty ? (
            <motion.h1
              style={{ color: "red" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              No movies match your search criteria.
            </motion.h1>
          ) : (
            filtered.map((movie) => {
              const { id } = movie;
              return (
                <Link to={`/movies/${id}`} key={id}>
                  <Movie key={id} movie={movie} />
                </Link>
              );
            })
          )}
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
    background: #ff69b4;
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
    background: white;
    border-radius: 50px;
    transition: 0.5s;
  }

  .input:checked {
    background: black;
  }

  .input:checked:before {
    transition: 0.5s;
    transform: translate(100%);
  }
  h1 {
    margin: 3rem auto;
    text-align: center;
    width: fit-content;
  }
  .grid {
    width: 80vw;
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
