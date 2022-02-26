import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  navText: "-webkit-linear-gradient( #ff69b4,hsla(0, 0%, 0%, 0.3))",
  body: "#171515",
  fontColor: "#FFFFFF",
  border: "3px solid #ff69b4",
  icon: "white",
  transition: "0.7s",
};
export const lightTheme = {
  navText: "-webkit-linear-gradient(black, hsla(0, 0%, 0%, 0.6))",
  icon: "black",
  border: "3px solid black",
  body: "#c4c6c9",
  fontColor: "171515",
  transition: "0.7s",
};

export const GlobalStyles = createGlobalStyle`
body {
transition: ${(props) => props.theme.transition};
  background-color: ${(props) => props.theme.body};
}
`;
