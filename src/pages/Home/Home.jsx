import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Skeleton, Card } from "antd";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";
import { calculatePrice } from "../../utils/utils";

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
  upcoming: "/movie/upcoming",
};

const { Content } = Layout;

const StyledCard = styled(Card)`
  border: 1px solid red !important;
`;

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [fetchingMovies, setFetchingMovies] = useState(false);

  const [favoritedMovies, setFavoritedMovies] = useState(
    JSON.parse(localStorage.getItem("favoritedMovies")) || []
  );

  useEffect(() => {
    const fetchMovie = async () => {
      let response;
      const nowPlaying = location.pathname.includes("now-playing");
      const popular = location.pathname.includes("popular");
      try {
        setFetchingMovies(true);
        if (nowPlaying) {
          response = await axios.get(
            `${BASE_URL}${moviesUrl.nowPlaying}?${API_KEY}`
          );
        }
        if (popular) {
          response = await axios.get(
            `${BASE_URL}${moviesUrl.popular}?${API_KEY}`
          );
        }
        if (!nowPlaying && !popular) {
          response = await axios.get(
            `${BASE_URL}${moviesUrl.upcoming}?${API_KEY}`
          );
        }
        setMovies(response.data.results);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovies(false);
      }
    };
    fetchMovie();
  }, [location.pathname]);

  const handleAddCollectionButton = (movie) => {
    const { poster_path, vote_average, title, overview, id } = movie;
    setFavoritedMovies((prevState) => {
      const combinedMovies = [
        ...prevState,
        { poster_path, vote_average, title, overview, id },
      ];
      localStorage.setItem("favoritedMovies", JSON.stringify(combinedMovies));
      return combinedMovies;
    });
  };

  const renderMovies = () => {
    return (
      <>
        {!fetchingMovies &&
          movies.map((movie) => {
            const { poster_path, vote_average, title, overview, id } = movie;
            const isDisabled = favoritedMovies.find((movie) => {
              return movie.id === id;
            });
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
                    price={calculatePrice(vote_average)}
                    handleAddCollectionButton={() =>
                      handleAddCollectionButton(movie)
                    }
                    disabled={isDisabled}
                  />
                </div>
              </Col>
            );
          })}
      </>
    );
  };

  const renderLoadingCards = () => {
    const cards = [];
    for (let i = 0; i < 20; i++) {
      cards.push(
        <Col xs={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <Skeleton loading active />
            <Skeleton loading active />
            <Skeleton loading active />
          </Card>
        </Col>
      );
    }
    return cards;
  };

  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: "#323232",
      }}
    >
      <Row gutter={[16, 16]}>
        {!fetchingMovies && renderMovies()}
        {fetchingMovies && renderLoadingCards()}
      </Row>
    </Content>
  );
};

export default Home;
