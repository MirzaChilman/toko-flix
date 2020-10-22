const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=ae4dc1e91f4721e7f574d512da8263fd";

/**
 *
 * @type {{nowPlaying: string, popular: string, latest: string}}
 */
const moviesUrl = {
  nowPlaying: `/movie/now_playing`,
  popular: `/movie/popular`,
  latest: `/movie/latest`,
  detail: "/movie/detail",
};
