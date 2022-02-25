import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
export const API_KEY = process.env.REACT_APP_API_KEY;

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isChecked, setIsChecked] = useState(false);

  const mainUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;

  const fetchMovies = async () => {
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    let url;

    if (query) {
      url = `${searchUrl}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${urlPage}`;
    }
    setLoading(true);
    try {
      const data = await axios(url);
      const movies = data.data.results;
      setPopular(movies);
      setLoading(false);
      if (filtered === []) {
        setEmpty(true);
      } else {
        setFiltered(movies);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // USE EFFECT MOVIES
  useEffect(() => {
    fetchMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`
    );
    // eslint-disable-next-line
  }, [query, page, empty]);

  return (
    <AppContext.Provider
      value={{
        filtered,
        popular,
        setFiltered,
        setQuery,
        query,
        activeGenre,
        page,
        setPage,
        setActiveGenre,
        loading,
        genres,
        setGenres,
        empty,
        setEmpty,
        theme,
        setTheme,
        isChecked,
        setIsChecked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
