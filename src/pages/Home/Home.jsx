import React, { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";

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

const { Content } = Layout;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [fetchingMovies, setFetchingMovies] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setFetchingMovies(true);
        const response = await axios.get(
          `${BASE_URL}${moviesUrl.nowPlaying}?${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovies(false);
      }
    };
    fetchMovie();
  }, []);
  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: "#323232",
      }}
    >
      <Row gutter={[16,16]}>
        {!fetchingMovies &&
          movies.map((movie) => {
            const {
              poster_path,
              vote_average,
              title,
              overview,
              id,
            } = movie;
            return (
              <Col xs={24} md={12} lg={8} xl={6}>
                <div
                  style={{
                    color: "white",
                  }}
                >
                  <MovieCard
                    poster_path={poster_path}
                    id={id}
                    vote_average={vote_average}
                    title={title}
                    overview={overview}
                    price={"10000"}
                  />
                </div>
              </Col>
            );
          })}
      </Row>
    </Content>
  );
};

export default Home;
