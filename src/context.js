import React, { useState, useEffect, useContext, useRef } from "react";
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
  const [theme, setTheme] = useState("dark");
  const [isChecked, setIsChecked] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [nowInTheaters, setNowInTheaters] = useState(false);
  const [width, setWidth] = useState(0);
  const carousel = useRef(false);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [inTheaters, setInTheaters] = useState([]);

  const mainUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;
  const [searchLoading, setSearchLoading] = useState(false);
  const fetchMovies = async () => {
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    let url;

    if (query) {
      url = `${searchUrl}${urlPage}${urlQuery}`;
      setNowInTheaters(false);
    } else {
      url = `${mainUrl}${urlPage}`;
      setNowInTheaters(true);
    }
    setEmpty(true);
    setLoading(true);
    try {
      // MOVIES (SEARCH AND IN THEATERS [IF STATEMENT] )
      const data = await axios(url);
      const movies = data.data.results;
      // UPCOMING MOVIES
      const data2 = await axios(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`
      );
      const upcomingMoviesData = data2.data.results;
      //  POPULAR MOVIES
      const data3 = await axios(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
      );
      const topRatedMoviesData = data3.data.results;
      // STATES FILLED AFTER AXIOS
      setTopRated(topRatedMoviesData);
      setUpcomingMovies(upcomingMoviesData);
      setEmpty(false);
      // setPopular(movies);
      // setFiltered(movies);
      setInTheaters(movies);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovies = async () => {
    setSearchLoading(true);
    try {
      const data = await axios(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`
      );
      const movies = data.data.results;
      setPopular(movies);
      setFiltered(movies);

      setSearchLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!carousel.current) {
      carousel.current = true;
      return;
    }

    // eslint-disable-next-line
  });
  const next = () => {
    let slider = document.querySelector(".slider");
    slider.scrollLeft = slider.scrollLeft + carousel.current.offsetWidth;
  };
  const prev = () => {
    let slider = document.querySelector(".slider");
    slider.scrollLeft = slider.scrollLeft - carousel.current.offsetWidth;
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={{
        topRated,
        upcomingMovies,
        filtered,
        popular,
        setFiltered,
        setQuery,
        query,
        activeGenre,
        page,
        setPage,
        setActiveGenre,
        genres,
        setGenres,
        theme,
        setTheme,
        isChecked,
        setIsChecked,
        empty,
        fetchMovies,
        nowInTheaters,
        setNowInTheaters,
        width,
        setWidth,
        carousel,
        next,
        prev,
        inTheaters,
        setInTheaters,
        searchMovies,
        setSearchLoading,
        searchLoading,
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
