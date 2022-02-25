import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#171515",
  fontColor: "#FFFFFF",
  transition: "0.5s",
};
export const darkTheme = {
  body: "#FFFFFF",
  fontColor: "#171515",
  input: "#ff69b4",
};

export const GlobalStyles = createGlobalStyle`
body {
  background-color: ${(props) => props.theme.body};
}
`;
