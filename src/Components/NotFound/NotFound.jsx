import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.section`
  padding: 4em;
  background: #0e0b16;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
  margin-top: 25vh;
`;

const notFound = () => (
  <Wrapper>
    <Title>
      <p>Ooopss . . . We think you get lost, here let us help you</p>
      <p className="my-5">
        <Link
          to="/"
          className="anchor--unstyle button button--secondary text-heavy"
        >
          Click Me
        </Link>
      </p>
    </Title>
  </Wrapper>
);

export default notFound;
