import { motion } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";

const buttonVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
    boxShadow: "0px 0px 8px rgb(255,255,255)",
  },
  hoverTwo: {
    scale: 1.1,
  },
};

const Categories = ({
  popular,
  activeGenre,
  setActiveGenre,
  setPage,
  setFiltered,
}) => {
  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(popular);
      return;
    }
    const filtered = popular.filter((movie) => {
      return movie.genre_ids.includes(activeGenre);
    });
    setFiltered(filtered);
    // eslint-disable-next-line
  }, [activeGenre]);

  return (
    <Wrapper>
      <motion.div variants={buttonVariants} initial="hidden" animate="visible">
        <motion.button
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
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hoverTwo"
          onClick={() => setActiveGenre(0)}
        >
          All
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hoverTwo"
          onClick={() => setActiveGenre(35)}
        >
          comedy
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hoverTwo"
          onClick={() => setActiveGenre(28)}
        >
          action
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          className="page"
          onClick={() => setPage((oldPage) => oldPage + 1)}
        >
          next
        </motion.button>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    margin: 2.5rem 1rem;
    padding: 0.6rem;
    border: 2px solid #ff69b4;
    cursor: pointer;
    width: 6rem;
    color: white;
    border-radius: 30px;
    background: #2d3a44;
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bold;
  }
  .page {
    margin: 0 3rem 0 3rem;
    color: white;
    border: 2px solid white;
    background-color: #ff69b4;
  }
`;

export default Categories;
