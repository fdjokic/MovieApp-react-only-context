import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  navText: "-webkit-linear-gradient( #ff69b4,hsla(0, 0%, 0%, 0.3))",
  body: "#171515",
  fontColor: "#FFFFFF",
  transition: "0.5s",
  border: "3px solid #ff69b4",
  icon: "white",
};
export const lightTheme = {
  navText: "-webkit-linear-gradient(black, hsla(0, 0%, 0%, 0.6))",
  icon: "black",
  border: "2px solid black",
  body: "#c4c6c9",
  fontColor: "171515",
};

export const GlobalStyles = createGlobalStyle`
body {
  background-color: ${(props) => props.theme.body};
}
`;
