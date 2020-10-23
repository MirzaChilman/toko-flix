import * as React from "react";
import { Card, Image, Button } from "antd";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
// import "./MovieCard.css";
const { Meta } = Card;

const NO_TITLE = "There is no title";
const NO_DESCRIPTION = "There is no description";

/**
 *
 * @param {string} description
 * @param {string } img
 * @param {string} title
 * @param {string} slug
 * @returns {React.ReactNode}
 * @constructor
 */

const StyledDiv = styled.div`
  position: relative;
  min-width: 275px;
  max-width: 350px;
  margin: auto;
  overflow: hidden;
  padding: 0;
  .content-title {
    color: #ffffff;
    text-align: center;
    margin-bottom: 10px;
  }
  .content-details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out 0s;
  }
  .content-image {
    width: 100%;
    object-fit: cover;
    max-height: 100%;
    min-height: 415px;
  }
  .content-details h5 {
    color: #fff;
    font-weight: 500;
    margin-bottom: 0.5em;
    text-transform: uppercase;
  }
  .content-details p {
    color: #fff;
    font-size: 0.8em;
  }
  .fadeIn-bottom {
    top: 80%;
  }
  .content-overlay {
    background: rgba(53, 28, 28, 0.7);
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: all 0.4s ease-in-out 0s;
  }

  &:hover .content-overlay {
    opacity: 1;
  }
  &:hover .content-details {
    top: 50%;
    left: 50%;
    opacity: 1;
  }
`;

const MovieCard = ({
  poster_path,
  id,
  vote_average,
  title,
  overview,
  price,
}) => {
  const history = useHistory();
  return (
    <StyledDiv className="content" key={id} onMouseEnter={() => {}}>
      <div className="content-overlay" />
      <img
        className="content-image"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={overview}
      />
      <div className="content-details fadeIn-bottom">
        <h3 className="content-title">{title}</h3>
        <p className="content-text">{`${vote_average} / 10`}</p>
        <p className="content-text">{`Rp.${price}`}</p>
        <Button block danger type={"primary"}>
          <Link
            to={`/movie/${id}`}
            className="btn btn-outline-primary btn-block"
          >
            Learn More
          </Link>
        </Button>
        <br />
        <br />
        <Button block size={"large"} type={"primary"} onClick={() => {}}>
          Buy
        </Button>
      </div>
    </StyledDiv>
  );
};

export default MovieCard;
