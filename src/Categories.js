import { motion } from "framer-motion";
import styled from "styled-components";
import { useGlobalContext } from "./context";

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
  const { activeGenre, setActiveGenre, genres, nowInTheaters } =
    useGlobalContext();

  return (
    <Wrapper>
      <div className="container">
        {!nowInTheaters && (
          <motion.div
            className="categories-container"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
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
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 70vw;
  margin: 1rem auto;

  .icon {
    display: none;
  }
  button {
    margin: 0.5rem 0.8rem;
    padding: 0.3rem;
    border: ${(props) => props.theme.border};
    cursor: pointer;
    min-width: 3.5rem;
    width: fit-content;
    color: ${(props) => props.theme.fontColor};

    border-radius: 30px;
    background: ${(props) => props.theme.body};

    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bold;
    font-size: 0.7rem;
  }
  .active {
    color: white;
    border: 2px solid white;
    background-color: #ff69b4;
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    .categories-container {
      display: none;
    }
  }
`;

export default Categories;
