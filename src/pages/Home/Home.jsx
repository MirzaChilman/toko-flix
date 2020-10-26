import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Skeleton, Card } from "antd";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";

const { Content } = Layout;
const moviesUrl = {
  nowPlaying: `/movie/now_playing`,
  popular: `/movie/popular`,
  upcoming: "/movie/upcoming",
};

export const calculatePrice = (vote) => {
  let price;

  if (vote > 0 && vote <= 3) {
    price = `${vote * 3500}`;
  } else if (vote > 3 && vote <= 6) {
    price = `${vote * 8250}`;
  } else if (vote > 6 && vote <= 8) {
    price = `${vote * 16350}`;
  } else if (vote > 8 && vote <= 10) {
    price = `${vote * 21250}`;
  } else {
    price = "Unavailable";
  }
  return price;
};

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
      const isNowPlaying = location.pathname.includes("now-playing");
      const isPopular = location.pathname.includes("popular");
      try {
        setFetchingMovies(true);
        if (isNowPlaying) {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}${moviesUrl.nowPlaying}?api_key=${process.env.REACT_APP_API_KEY}`
          );
        }
        if (isPopular) {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}${moviesUrl.popular}?api_key=${process.env.REACT_APP_API_KEY}`
          );
        }
        if (!isNowPlaying && !isPopular) {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}${moviesUrl.upcoming}?api_key=${process.env.REACT_APP_API_KEY}`
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

  const handleAddFavoritesButton = (movie) => {
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
        {movies.map((movie) => {
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
                    handleAddFavoritesButton(movie)
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
