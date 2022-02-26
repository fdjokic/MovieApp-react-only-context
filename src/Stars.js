import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import styled from "styled-components";

const Stars = ({ stars }) => {
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
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .stars {
    background-color: rgba(0, 0, 0, 0.7);
  }
  span {
    color: #ffb900;
    font-size: 1rem;
    padding: 0.1rem 0.2rem;
  }

  margin-bottom: 0.5rem;
`;
export default Stars;
