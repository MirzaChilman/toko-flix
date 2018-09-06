import React from 'react';
import './spinner.css';

const Spinner = () => (
  <section className="container">
    <div className="row">
      <div className="lds-default mx-auto">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </section>
);

export default Spinner;
