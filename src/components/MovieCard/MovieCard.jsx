import * as React from "react";
import { Card, Image, Button } from "antd";
import { useHistory, Link } from "react-router-dom";
import "./MovieCard.css";
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
    <div className="content" key={id} onMouseEnter={() => {}}>
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
            to={`/movie/detail/`}
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
    </div>
  );
};

export default MovieCard;
