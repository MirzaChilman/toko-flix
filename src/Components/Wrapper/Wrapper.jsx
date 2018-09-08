import React from 'react';
import './Wrapper.css';

const Wrapper = (props) => {
  // eslint-disable-next-line
  const { children } = props;
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
