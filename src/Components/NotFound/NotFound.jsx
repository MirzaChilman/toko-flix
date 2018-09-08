import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const notFound = () => (
  <section className="notFound">
    <div className="title">
      <p>Ooopss . . . We think you get lost, here let us help you</p>
      <p className="my-5">
        <Link
          to="/"
          className="anchor--unstyle button button--secondary text-heavy"
        >
          Click Me
        </Link>
      </p>
    </div>
  </section>
);

export default notFound;
