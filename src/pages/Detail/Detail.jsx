import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Layout, Image, Typography, Card } from "antd";
import axios from "axios";
import { calculatePrice } from "../../utils/utils";
import styled from "styled-components";

const { Title, Text } = Typography;
const { Content } = Layout;
const { Meta } = Card;

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
  detail: "/movie",
};

const StyledTitle = styled(Title)`
  color: white !important;
`;

const StyledText = styled(Text)`
  color: white !important;
`;

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);

  const [fetchingMovie, setFetchingMovie] = useState(false);
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setFetchingMovie(true);
        const response = await axios.get(
          `${BASE_URL}${moviesUrl.detail}/${params.id}?${API_KEY}`
        );
        console.log(response);
        setMovie(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovie(false);
      }
    };
    const fetchMovieCredit = async () => {
      try {
        setFetchingMovie(true);
        const response = await axios.get(
          `${BASE_URL}/movie/${params.id}/credits?${API_KEY}`
        );
        console.log(response);
        const getCast = response.data.cast.slice(0, 4);
        setCredits(getCast);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovie(false);
      }
    };
    fetchMovieCredit();
    fetchMovieDetail();
  }, []);

  const renderMainPoster = () => (
    <Col xs={23} sm={23} md={23} xl={11} offset={1}>
      <Image
        style={{
          height: "350px",
        }}
        src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        placeholder
      />
    </Col>
  );

  const renderMovieDetail = () => (
    <Col xs={24} sm={24} md={24} xl={12}>
      <StyledTitle
        style={{
          textAlign: "center",
        }}
      >
        {movie.title}
      </StyledTitle>
      <Row justify="between">
        <Col md={8}>
          <StyledTitle level={5}>Rating: {movie.vote_average} / 10</StyledTitle>
        </Col>
        <Col md={8}>
          <StyledTitle level={5}>
            Release Date: {movie.release_date}
          </StyledTitle>
        </Col>
        <Col md={8}>
          <StyledTitle level={5}>Runtime: {movie.runtime} minutes</StyledTitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledTitle>
            Price: Rp.{calculatePrice(movie.vote_average)}
          </StyledTitle>
          <StyledText>{movie.overview}</StyledText>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledTitle
            style={{
              marginTop: "16px",
            }}
          >
            Starring:
          </StyledTitle>
          <Row gutter={[16, 32]}>
            {credits.map((credit) => {
              const { name, character, profile_path } = credit;
              return (
                <Col>
                  <Card
                    hoverable
                    bordered={false}
                    style={{ width: 160, minHeight: 350 }}
                    cover={
                      <Image
                        alt={name}
                        src={`http://image.tmdb.org/t/p/w400${profile_path}`}
                        placeholder
                        fallback={
                          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDg4PDxAPDg8NEA0PDg4PDQ8PEA0OFREWFhURExUYHSggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAPYAzQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFBgID/8QAMRABAAIBAQUHAwMEAwAAAAAAAAECAxEEBSExYRIyQVFxgbEiocETUpEzQmJyI4Lw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDtAFJAAAAAAAABBadOenvwBI+FtppHO9Y94K7Vjn++J9wfcRE+nr5pAAAAAAAAAAAAAAAAABGoJfLPnrSNbTp5R4z6K23bfGPhXjf46yxcuS1pmbTrM/x7AvbRva09yOzHnOmqjky2t3rTPu8AIJSAs7Jt18c/ur5T+Gpj3pjtz1r58JlhAOnxZq27tqz0ieL25atpjlMx1iWjse9Jj6cn1V5a+MA2EorOsRpxieXWAEgAAAAAAAAAAAKu3bVGOsT/AHW7sLMue3jn/UyTPhX6Yj08QV5tMzMzOus6oAAAAAAABEpAam5tp4/p2nhPGs+UtZzOzX7N6T5Wj+HTgAAAAAAAAAAAA+O15Ozjvbyj7zwc1/738W9va2mG3W0R+fwwQAAAAAAAAAAK849YdW5R1UAkAAAAAAAAABCQFDfP9L/tX4lhtzfP9KP9q/EsMAAAAAAAAAAETLqcM61rPnWPhyzf3Vmm2PjzrMx7eALoAAAAAAAAAAAM/fU/8Uf7V+JYjf3pj1w26TFvbl+XPxIJAAAAAAAAAAbm5q6YtfO0/wAcGJEazERznhHu6XZsfZpWvlEA+oAAAAAAAAAAAImusTHm5zbtm/Tvp4TxrP8Ai6NU3jsn6leHerr2fTyBgB8xwmPKQAAAAAABEpesVO1atf3TEAv7o2WbW7cx9NeXWzaeMOKKVrWOVY0h7AAAAAAAAAAAAAABz+9cfZyzpyvEW9JVGtvrFrFbft1ifRkgAAAAAAiV7dGLtZe14UifeVGW/urFpi18bcwXIhKEgAAAAAAAAAAAAISgHzz44tS0T4xLmdOP2dPlyxWJmZiIiHM2nWZnrM+wIAAAAAAmHT7PXSlY/wAY+HMOh3bmi2OvnXhILQhIAAAAAAAAAAAPGS8V70xHrIPaht28Ix/THG3j0fDbN6c64/e0/hlTOvMHrLltedbTM9HnQAAAAAAAH0w57UntVnSfl8wG9sG3RkjTlfxjzXIctS81nWOcN/YtsjLEeFo5x59QWxEJAAAAAOs8ussHJvXJPLSvpCtkzWtztM+4OgybXjr3rxH3+FbJvbHHdi1uscIYgC9m3rktwjSkdOM/dTvebTraZmes6vIAAAAAAAAAAAAAmlpidYnSYQAv4d63r3oi8emk/ZobPvHHfhMzSfK3L+WAA6qOnH3jRLmMW0XpP02mPfWJX8G95jhkjXrUGwK2DbMd+VvaVjUHKgAAAAAAAAAAAAAAAAAAAAAAALOHbr0jSLcPDXirI0BIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k="
                        }
                        height={240}
                      />
                    }
                    bodyStyle={{
                      color: "white",
                    }}
                  >
                    {`${name}`}
                    &nbsp;
                    <span
                      style={{
                        color: "gold",
                      }}
                    >
                      as
                    </span>
                    &nbsp;
                    {`${character}`}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Col>
  );

  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: "#323232",
      }}
    >
      <Row>
        {renderMainPoster()}
        {renderMovieDetail()}
      </Row>
    </Content>
  );
};

export default Detail;
