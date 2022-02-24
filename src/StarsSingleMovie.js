import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarsSingleMovie = ({ stars, vote_count }) => {
  const tempStars = Array.from({ length: 10 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars > number ? (
          <BsStarFill />
        ) : stars > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      <div className="stars">{tempStars}</div>
      <p>{vote_count} (ratings)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 3rem;
  margin-top: 1rem;
  display: flex;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    color: white;
    margin-bottom: 0;
    font-size: 1.1rem;
    line-height: 17px;
  }
`;

export default StarsSingleMovie;
