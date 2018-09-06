import React from 'react';
import './Wrapper.css';

const wrapper = (props) => {
  // eslint-disable-next-line
  const { children } = props;
  return <div className="wrapper">{children}</div>;
};

export default wrapper;
