/* eslint-disable */

import {
  REQUEST_ACCOUNT_CREDIT,
  DISPATCH_ACCOUNT_CREDIT,
} from './actionCreators';

const requestAccountCredit = () => async dispatch => {
  if (localStorage.getItem('storageCredit') === null) {
    localStorage.setItem('storageCredit', 100000);
  }
  const response = JSON.parse(localStorage.getItem('storageCredit'));
  dispatch({
    type: REQUEST_ACCOUNT_CREDIT,
    payload: response,
  });
};

const dispatchAccountCredit = (movieId, price) => async dispatch => {
  let remainingCredit = price;
  let movie = movieId;
  if (localStorage.getItem('storageMovie') === null) {
    // initialize movie array and push movieId
    movie.push(movieId);
    // set local storage with new movie array
    localStorage.setItem('storageMovie', JSON.stringify(movie));
  } else {
    // get movie from local storage
    const movie = JSON.parse(localStorage.getItem('storageMovie'));
    // push new movieId to movie array
    movie.push(movieId);
    // push new movie array to movie local storage
    localStorage.setItem('storageMovie', JSON.stringify(movie));
    // get credit account
    const creditAccount = JSON.parse(localStorage.getItem('storageCredit'));
    // calculate remaining credit
    if (creditAccount > price) {
      remainingCredit = creditAccount - price;
    } else {
      return false;
    }
    // set remaining creadit to creditAccount storage
    localStorage.setItem('storageCredit', JSON.stringify(remainingCredit));
    // call component didMount
  }

  dispatch({
    type: DISPATCH_ACCOUNT_CREDIT,
    payload: remainingCredit,
  });
};

export { requestAccountCredit, dispatchAccountCredit };
