import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const footerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
};

const Footer = () => {
  return (
    <Wrapper>
      <motion.div variants={footerVariants} animate="animate" initial="initial">
        <h6>
          &copy; {new Date().getFullYear()}
          <span>MovieTemple</span>All rights reserved
        </h6>
      </motion.div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  span {
    margin: 0 0.3rem 0 0.3rem;
  }

  margin-top: 2rem;
  padding: 1rem;
  color: ${(props) => props.theme.fontColor};

  display: flex;
  justify-content: center;
  height: 1rem;
`;
export default Footer;
