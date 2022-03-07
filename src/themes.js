import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  navText: "-webkit-linear-gradient( #ff69b4, white)",
  body: "linear-gradient(to left, #000000, #040404, #14151f)",
  hamburgerColor: "hotpink",
  fontColor: "#FFFFFF",
  border: "3px solid #ff69b4",
  cardBorder: "3px solid #ff69b4",
  icon: "white",
  cardShadow: "0 3px 10px rgb(255 255 255 / 0.4)",
  movieBottomBorder: "10px solid #6495ed",
  movieBackground: "#6495ed",
  sideBtnColor: "hotpink",
  sideBtnFont: "#FFFFFF",
};
export const lightTheme = {
  navText: "-webkit-linear-gradient(black, hsla(0, 0%, 0%, 0.6))",
  icon: "black",
  border: "3px solid black",
  // body: "#c4c6c9",
  hamburgerColor: "black",
  body: "linear-gradient(to left, #ffffff 0%, #c4c6c9 74%)",
  fontColor: "#171515",
  font: "bold",
  cardShadow: "rgba(0, 0, 0, 0.8) 0px 14px 25px",
  movieBottomBorder: "10px solid #36454F",
  movieBackground: "#36454F",
  sideBtnColor: "black",
  sideBtnFont: "hotpink",
};

export const GlobalStyles = createGlobalStyle`
body {
  background: ${(props) => props.theme.body};
}
`;
