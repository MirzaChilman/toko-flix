import React from 'react';
import './footer.css';

const styles = {
  textDecoration: 'none',
  color: 'white'
};

const footer = () => (
  <div className="footer px-3">
    <p className="mt-3">Brand</p>
    <p className="mt-3">&copy;2018. Created by Mirza Chilman.</p>
    <a href="" style={styles}>
      <p className="mt-3">Github</p>
    </a>
  </div>
);

export default footer;
