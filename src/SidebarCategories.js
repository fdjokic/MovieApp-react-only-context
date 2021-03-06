import React from "react";
import { useGlobalContext } from "./context";
import styled from "styled-components";

const SidebarCategories = () => {
  const { sideBar, genres, setActiveGenre, nowInTheaters, closeSidebar } =
    useGlobalContext();

  return (
    <Wrapper>
      {!nowInTheaters && (
        <aside className={sideBar ? "sidebar open" : "sidebar"}>
          <div className="btn-wrapper" onClick={closeSidebar}>
            <button onClick={() => setActiveGenre(0)}>All</button>
          </div>
          {genres.map((genre) => {
            const { id, name } = genre;
            return (
              <div className="btn-wrapper" onClick={closeSidebar}>
                <button key={id} onClick={() => setActiveGenre(id)}>
                  {name}
                </button>
              </div>
            );
          })}
        </aside>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: fit-content;

  .btn-wrapper {
    background: ${(props) => props.theme.sideBtnColor};
    width: fit-content;
    margin-bottom: 0.3rem;
    border-radius: 15px;
    opacity: 0.7;
  }
  .btn-wrapper:hover {
    opacity: 1;
    margin-left: 1rem;
    transition: 0.5s;
  }
  button {
    color: ${(props) => props.theme.sideBtnFont};
    padding: 5px;
    border: ${(props) => props.theme.border};
    border-radius: 10px;
    background: ${(props) => props.theme.sideBtnColor};
    cursor: pointer;
  }
  .sidebar {
    display: none;
  }
  @media (max-width: 1200px) {
    .sidebar {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    .sidebar {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .sidebar {
      max-height: 75%;

      display: inline-block;
      transform: translateX(-100%);
      transition: 1s;
      z-index: 100;
      position: fixed;
      top: 12%;
      left: 0;
      overflow-y: scroll;
      width: fit-content;
      height: fit-content;
      background: transparent;
      scroll-behavior: smooth;
    }

    .sidebar::-webkit-scrollbar {
      display: none;
    }
    .open {
      transform: translateY(0);
      transition: 1s;
      z-index: 99;
    }
  }
`;

export default SidebarCategories;
