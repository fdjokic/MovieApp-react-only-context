import React from "react";
import styled from "styled-components";

const MovieList = ({ title }) => {
  return (
    <Wrapper className="link">
      <p>{title}</p>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  color: white;
`;
export default MovieList;
