import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import NotFound from './Components/NotFound/NotFound';
import LandingPage from './Components/LandingPage/LandingPage';
import Movie from './Components/Movie/Movie';
import './App.css';
import './global.css';

class App extends Component {
  componentDidMount() {
    console.log('ad');
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <LandingPage />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/movie"
            render={() => (
              <React.Fragment>
                <Movie />
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
