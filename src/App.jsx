/* eslint-disable */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Loadable from 'react-loadable';
import Spinner from './Components/Spinner/Spinner';

const NotFound = Loadable({
  //eslint-disable-next-line
  loader: () => import('./Components/NotFound/NotFound'),
  loading: Spinner,
});

const LandingPage = Loadable({
  loader: () => import('./Components/LandingPage/LandingPage'),
  loading: Spinner,
});

const Movie = Loadable({
  loader: () => import('./Components/Movie/Movie'),
  loading: Spinner,
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={({ match }) => (
              <React.Fragment>
                <LandingPage match={match} />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/page/:pageId"
            render={({ match }) => (
              <React.Fragment>
                <LandingPage match={match} />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/movie/detail/:movieId"
            render={({ match }) => (
              <React.Fragment>
                <Movie match={match} />
              </React.Fragment>
            )}
          />
          <Route exact component={NotFound} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;
