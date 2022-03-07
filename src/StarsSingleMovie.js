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
      <div className="stars">
        <span className="number">{stars ? stars : "N/A"} </span>
        {tempStars}
      </div>
      <p>
        {vote_count ? vote_count : "N/A"} {vote_count ? "ratings" : null}
      </p>
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
    color: ${(props) => props.theme.fontColor};

    margin-bottom: 0;
    font-size: 1.1rem;
    line-height: 30px;
  }
  .number {
    font-size: 1.3rem;
    color: ${(props) => props.theme.fontColor};
    text-align: center;
    border: 1px solid #ffb900;
    padding: 0 0 0.1rem 0.2rem;
    margin-right: 1rem;
  }
  @media (max-width: 1024px) {
    span {
      font-size: 0.8rem;
    }
    p {
      margin-left: 0.2rem;
      line-height: 1rem;
      font-size: 0.9rem;
    }
    .number {
      font-size: 1rem;
      margin-right: 1rem;
    }
  }
  @media (max-width: 768px) {
    .number {
      font-size: 0.9rem;
      margin-right: 0.3rem;
    }
  }
`;

export default StarsSingleMovie;
