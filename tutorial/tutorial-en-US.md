React is a front-end library that is very popular and keep getting attention becase of several things:

1. Dealing with DOM API is very hard, but React gives easiness to the developers to deal with DOM API with its virtual browser which is more friendly compared to real browser.
2. React works in declarative way to create its user interface.
3. React is just JavaScript, which makes its learning curve relatively easy because it has only few API.

Based on statistic on this [blog](https://www.tecla.io/blog/2019-stats-on-top-js-frameworks-react-angular-and-vue/), it can be seen that React is very popular which makes a lot of company looking for programmers who can work using React.

In this tutorial we will create a minimalist website that will able to show lists of movies and favoriting those movies. User stories that will be in this website are:

1. Able to show list of movies
2. User able to add favorite movie.
3. User able to see movie details.
4. User able to see which movies is in popular category.
5. User able to see which movies is in now playing.

User stories above already enough for us to start, but before we start we need to fulfill the prerequisite, the prerequisite are:

1. Have nodejs with npm v5.2+, if have not had it can do installation [here](https://nodejs.org/en/download/) and it will be great if choosing the latest version.
2. Code editor, code editor here is depend on each people preference, for this tutorial I'm going to use Webstorm.

#### Things to note

In this tutorial we will make an application using create-react-app and ant design as our UI library, The usage of create-react-app is chosen because we can create an application without the needs to do any configurations, while UI library ant design is being chosen because in my opinion its an UI library that is very complete and easy to use. Also we are going to use `styled-components` as our styling customization

#### Preparation

The source code of this project can be found in [here]((https://github.com/MirzaChilman/mini-project)) . You are allowed to go straight duplicate the project to see the end result of what we are goint to build

#### What are we goint to build?

As it has been told before in user stories above, we will make an website that show list of movies. Below are several screenshots of the things that we are going to build
In this tutorial we will not care much with any file that is inside `components` folder, you can straight to copy paste or navigate to [here](https://github.com/MirzaChilman/mini-projek/tree/master/src/components), in this tutorial the things that we are going to mainly discussed are how to show movies and how to favorite those movies.

Why doing this? because its very close to a real case in work industry, where usually you need to show data from network request dan process it. In term of e-commerce website, adding favorite to movie is equivalent to real world case where you have some kind of wish list.

===========================================================================================================================================================
#### Getting started

Alright, the first thing that we are going to do is creating our project usint `create-react-app`, if your already have npm installed with version of 5.2+ then the things that you need to do is `npx create-react-app toko-flix`, the code will create a folder with a name of toko-flix.

Navigate your terminal inside that folder and run `npm install @craco/craco craco-antd antd react-router-dom styled-components axios`

#### craco

As being explained before that we are going to use ant design, and we need to override their theme and one way to do it is by using craco. Hence, create a file with name `cracon.config.js`

```jsx harmony
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@menu-dark-item-active-bg": "red",
          "@card-background": "#434343",
          "@skeleton-to-color": "shade(#747474, 5%)",
        },
      },
    },
  ],
};
```
The Part that you need to pay attention is the part of `customizeTheme`, there is the place where you can custom override ant design variable. We are going to override:

```
"@menu-dark-item-active-bg": "red",
"@card-background": "#434343",
"@skeleton-to-color": "shade(#747474, 5%)",
```

##### styled-components

In order to help us to do styling, we also are going to use `styled-components`.

##### react-router-dom

In order to help us doing routing in React, dependency `react-router-dom` is the most favorable depedency that is easy to use.

##### axios

We are using axios to do network request.

#### index.js

```jsx harmony
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
We start this tutorial by going inside the index.js and add `BrowserRouter`, `BrowserRouter` is needed to wrap our React component so that it can do routing using `react-router-dom`.

#### App.js

```jsx harmony
import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.less";

import { Layout } from "antd";

const Home = React.lazy(() => import("./pages/Home/Home"));
const MovieDetail = React.lazy(() => import("./pages/MovieDetail/MovieDetail"));
const MyMovies = React.lazy(() => import("./pages/MyMovie/MyMovie"));

function App() {
  return (
    <Layout>
      <Header />
      <Suspense fallback={"Loading"}>
        <Switch>
          <Route exact path="/movie/:id" component={MovieDetail} />
          <Route exact path="/my-account/favorites" component={MyMovies} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>

      <Footer />
    </Layout>
  );
}

export default App;
```

App.js is our second supporting file that will be used as a wrapper or skeleton of our application. 

```jsx harmony
// App.js
import "./App.less";
```

So as we already know we are going to override variable that ant design has that's why we are using `.less`

```less
// App.less
@import "~antd/dist/antd.less";
```
The content of `App.less` is just importing ant design less

```
<Suspense fallback={"Loading"}>
    <Switch>
      <Route exact path="/movie/:id" component={MovieDetail} />
      <Route exact path="/my-account/favorites" component={MyMovies} />
      <Route path="/" component={Home} />
    </Switch>
</Suspense>
```
In those lines we are defining our route that we are going to have in our project, and our routes are:

1. `/movie/:id` that going to render `MovieDetail.jsx` component
2. `/my-account/favorites` that going to render `MyMovie.jsx` component
3. `/` will become our based route that will render `Home.jsx` component

It can be seen that we wrap our code with component `Switch`, this component makes us only able to render one from the three components that we define inside that block scope above.

#### Pages

As you can see that we are doing routing to render three components, dan those components will be placed inside a folder with name of `pages`

```
src
|--pages
   |--MovieDetail
      |--MovieDetail.jsx
   |--Home
      |--Home.jsx
   |--MyMovie
      |--MyMovie.jsx
```

##### Home.jsx

```jsx harmony
import React, { useEffect, use_state_ } from "react";
import { Layout, Row, Col, Skeleton, Card } from "antd";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";

const { Content } = Layout;
const moviesUrl = {
  nowPlaying: `/movie/now_playing`,
  popular: `/movie/popular`,
  upcoming: "/movie/upcoming",
};

export const calculatePrice = (vote) => {
  let price;

  if (vote > 0 && vote <= 3) {
    price = `${vote * 3500}`;
  } else if (vote > 3 && vote <= 6) {
    price = `${vote * 8250}`;
  } else if (vote > 6 && vote <= 8) {
    price = `${vote * 16350}`;
  } else if (vote > 8 && vote <= 10) {
    price = `${vote * 21250}`;
  } else {
    price = "Unavailable";
  }
  return price;
};
```
Import everything from the code above, code above is quite self explanatory because it just only importing stuff. You can also see that we are importing a component of `import MovieCard from "../../components/MovieCard/MovieCard";` You can directly copy that component [here]((https://github.com/MirzaChilman/mini-projek/tree/master/src/components))

```
 /* .... Rest of Code .... */
    price = "Unavailable";
  }
  return price;
};

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = use_state_([]);
  const [fetchingMovies, setFetchingMovies] = use_state_(false);

  const [favoritedMovies, setFavoritedMovies] = use_state_(
    JSON.parse(localStorage.getItem("favoritedMovies")) || []
  );
   /* Rest of code */
}
```

In this section we are defining our `state` that are going to use, We have 3 `state`:

1. `movies` is a `state` that will store movies that we fetch from network request
2. `fetchingMovies` is a `state` that giving our application a sign that we are doing network request, that later will be useful to show image placeholder when loading happens.
3. `favoritedMovies` is a _state_ that we needs to determine whether that film is already in our favorite list or not. The state will take its initial state from localStorage, or if it's not found then it will be an empty array. Notice that the code is using `JSON.parse()`, that function is useful to transform a string of array object into an actual object in JavaScript. For instance,  we have `const example = '{"result":true, "count":42}'` with `JSON.parse` it will be transformed into `const example = {"result":true, "count":42}`, notice that the quotation is gone, which caused it transformed it into an actual object data in JavaScript (read more [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse))

We are also using `const location = useLocation()`, this code is used to get the `pathname` of our routing, `useLocation` works in similar way with `window.location`.

```jsx harmony
/*  ... Rest of code ... */

const [favoritedMovies, setFavoritedMovies] = use_state_(
  JSON.parse(localStorage.getItem("favoritedMovies")) || []
);

useEffect(() => {
  const fetchMovie = async () => {
    // Fetching Movie
  };
  fetchMovie();
}, [location.pathname]);
```

Next, we are defining our `useEffect`, `useEffect` is a hooks in React that is considered as one of its [lifecycle](https://reactjs.org/docs/hooks-effect.html), lifecycle React itself has three phasses which are mouting, updating, and unmouting. In `useEffect` we are going to write a `fetchMovies` function that will be run every time `location.pathname` or url changing, pay attention to its second argument of `useEffect` which is `[location.pathname]`, this code, we are saying to `useEffect` that everytime our application reender and its `location.pathname` changes the run this `useEffect` again.

```jsx harmony
const fetchMovie = async () => {
  let response;
  const isNowPlaying = location.pathname.includes("now-playing");
  const isPopular = location.pathname.includes("popular");
  try {
    setFetchingMovies(true);
    if (isNowPlaying) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${moviesUrl.nowPlaying}?api_key=${process.env.REACT_APP_API_KEY}`
      );
    }
    if (isPopular) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${moviesUrl.popular}?api_key=${process.env.REACT_APP_API_KEY}`
      );
    }
    if (!isNowPlaying && !isPopular) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${moviesUrl.upcoming}?api_key=${process.env.REACT_APP_API_KEY}`
      );
    }
    setMovies(response.data.results);
  } catch (e) {
    console.error(e);
  } finally {
    setFetchingMovies(false);
  }
};
```

In this code we are defining three variables which are `response`, `isNowPlaying`, and `isPopular`.

1. Variable `response` is a variable that will be used to store the response from network request
2. `isNowPlaying` is a boolean that determine whether a url has the word of `now-playing`
3. `isPopular` is a boolean that determine whether a url has the word of `popular`

With the help of `location.pathname` from `react-router-dom` and method `includes` we can determine whether our current location is at one of those urls.

The next line of code is for determining network request based on location, here we are using a package `axios` to do our network request. You can see that we are using variable `process.env` (Read more [here](https://create-react-app.dev/docs/adding-custom-environment-variables/#:~:text=Environment%20variables%20are%20embedded%20into,possibly%20read%20them%20at%20runtime.)). Create a file in root folder of our application with a nem of `.env` then fill it with

```
// .env
REACT_APP_BASE_URL=https://api.themoviedb.org/3
REACT_APP_API_KEY=<movieDb_apiKey>
```

You can get your api key from movieDb [here](https://developers.themoviedb.org/3/getting-started/introduction). There are two things that you need to pay attention, those are `setFetchingMovies(true);` and `setMovies(response.data.results);`, in this section we are now working with React state. First, state `fetchingMovies` will be useful to show loading component when our application doing network request. Next, we are changing our `movies` state based on response from network request.

```jsx harmony
useEffect(() => {
  const fetchMovie = async () => {
    /* ... Rest of the code above ... */
  };
  fetchMovie();
}, [location.pathname]);

return (
  <Content
    style={{
      padding: "50px 50px",
      marginTop: 64,
      backgroundColor: "#323232",
    }}
  >
    <Row gutter={[16, 16]}>
      {!fetchingMovies && renderMovies()}
      {fetchingMovies && renderLoadingCards()}
    </Row>
  </Content>
);
```
After that, because we are already doing network request, the next thing to do is rendering the result. As mentioned before that we are going to use state `fetchingMovies` to determine whether to render the result of loading component. Next, let's discuss about funciton `renderLoadingCards`.

```jsx harmony
useEffect(() => {
  /* Rest of code */
}, [location.pathname]);

const renderLoadingCards = () => {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(
      <Col xs={24} md={12} lg={8} xl={6}>
        <Card bordered={false}>
          <Skeleton loading active />
          <Skeleton loading active />
          <Skeleton loading active />
        </Card>
      </Col>
    );
  }
  return cards;
};

return <Content>{/* Rest of code */}</Content>;
```
Function `renderLoadingCards` is fairly simple, this function going to render 20 `Card` component that is belong ant design, and inside that `Card` there will be `Skeleteton` component. Why 20? because the data that we fetch from network request has maximum of 20 data, this also related to Content Layout Shift (CLS) that you can read more [here](https://web.dev/cls/)

```jsx harmony
const renderMovies = () => {
  return (
    <>
      {movies.map((movie) => {
        const { poster_path, vote_average, title, overview, id } = movie;
        const isDisabled = favoritedMovies.find((movie) => {
          return movie.id === id;
        });
        return (
          <Col xs={24} md={12} lg={8} xl={6}>
            <div
              style={{
                color: "white",
              }}
            >
              <MovieCard
                poster_path={poster_path}
                id={id}
                vote_average={vote_average}
                title={title}
                overview={overview}
                price={calculatePrice(vote_average)}
                handleAddCollectionButton={() => {}}
                disabled={isDisabled}
              />
            </div>
          </Col>
        );
      })}
    </>
  );
};

const renderLoadingCards = () => {
  /* Rest of Code */
};
```

Next, funciton `renderMovies`, this function has purpose to render list of movies from state `movies`. In this phase state `movies` will be an array of object `[{...}]`, and to iterate or looping the data we are going to use `.map` method. Take a look at variable `isDisabled`, `isDisabled` is a boolen variable that determine whether the `movies` that are being to loop already in `favoritedMovies` or not, if it does then it will have a value of `true` that causing the button `Add to my favorites` to be disabled.

This line of code `const { poster_path, vote_average, title, overview, id } = movie;` We are doing [destructuring](https://www.codepolitan.com/forum/thread/detail/609/bagaimana-cara-kerja-destructuring). After that we are creating a function that is useful to adding movie to our favorites movies.

```jsx harmony
const handleAddFavoritesButton = (movie) => {
  const { poster_path, vote_average, title, overview, id } = movie;
  setFavoritedMovies((prev_state_) => {
    const combinedMovies = [
      ...prev_state_,
      { poster_path, vote_average, title, overview, id },
    ];
    localStorage.setItem("favoritedMovies", JSON.stringify(combinedMovies));
    return combinedMovies;
  });
};
```

Function `handleAddFavoritesButton` need an argument of movie that is being selected, that movie will later be combined with the movie that is already in our `favoritedMovies` state. As you can see that `setFavoritedMovies((prev_state_) => {...}`  using the `state` from its previous value and then combined the movie that we are selecting with a movie from previous value, after that it is being store into a variable called `combinedMovies` that will change state of our `favoritedMovies` state as well as storing it in localStorage.

In this section you can run `npm start` and see how our application works like in the gif below or [here](https://media.giphy.com/media/sxPQhc5MQjI8a2RWcJ/giphy.gif):

![Showcase](https://media.giphy.com/media/Aez2HKUg1xRSRZxQbj/giphy.gif)

##### MyMovie.jsx

Next we are moving to `MyMovie.jsx` page that will list all of the movies that has been favorite previously.

```jsx harmony
/* pages/MyMovie/MyMovie.jsx */
import React, { useState } from "react";
import { Col, Layout, Row, Button, Empty } from "antd";
import MovieCard from "../../components/MovieCard/MovieCard";
import { calculatePrice } from "../../utils/utils";
import { background_color_main } from "../../colors";
const { Content } = Layout;

const MyMovie = () => {
  const [favoritedMovies, setFavoritedMovies] = useState(
    JSON.parse(localStorage.getItem("favoritedMovies")) || []
  );

  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: background_color_main,
      }}
    >
      {/* .... */}
    </Content>
  );
};

export default MyMovie;
```

First let's import all the necessary things, then notice that in this component it also has similar state that we already being used in `Home.jsx`. Because, same like before, it is being told that this component will render movies in our favorites list.

There are several things to notice:

1. There will be a button to delete all the movies in our favorite list, and this tombol will only show up when we have one or more movie in our favorite list.
2. If there is no movie in our favorite list then show a empty indicator that we have not favoriting any movie.

Let us start to implement this one by one, First create a function to render movies that already in favorites list with the name function of `renderFavoriteMovies`

```jsx harmony
const renderFavoriteMovies = () => {
  return (
    <>
      <Row gutter={[0, 32]}>
        <Button
          ghost
          danger
          onClick={() => {
            setFavoritedMovies([]);
            localStorage.clear();
          }}
        >
          Clear favorites Movie
        </Button>
      </Row>
      <Row gutter={[16, 16]}>
        {favoritedMovies.map((movie) => {
          const { poster_path, vote_average, title, overview, id } = movie;
          const isDisabled = favoritedMovies.find((movie) => {
            return movie.id === id;
          });
          return (
            <Col xs={24} md={12} lg={8} xl={6}>
              <div
                style={{
                  color: "white",
                }}
              >
                <MovieCard
                  poster_path={poster_path}
                  id={id}
                  vote_average={vote_average}
                  title={title}
                  overview={overview}
                  price={calculatePrice(vote_average)}
                  disabled={isDisabled}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
```

At that code there are two `Row`, the first `Row` will show a button to delete all the movies that are in favorite list, second `Row` will render movies in favorite list, the logic that is being used is almost same with function `renderMovies()` at `Home.jsx`

Moving on, create another function called `renderNoMovies`, this function will be rendered when there is no movies in our favorite list.

```jsx harmony
const renderNoMovies = () => {
    return (
      <Row gutter={[16, 16]} justify={"center"}>
        <div
          style={{
            height: "69vh",
          }}
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span
                style={{
                  color: "white",
                }}
              >
                No movies favorites yet
              </span>
            }
          />
        </div>
      </Row>
    );
};
```

Full code of `MyMovie.jsx` can be seen at [here](https://github.com/MirzaChilman/mini-project/blob/master/src/pages/MyMovie/MyMovie.jsx)

##### MovieDetail.jsx

Our last component that we are going to write is a component `MovieDetail.jsx`, this component will contain the detail of movie that we are selecting, if you see component `MovieCard` it has 2 buttons, the red button will take of to the location that will render `MOvieDetail.jsx`

```jsx harmony
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Layout, Image, Typography, Card } from "antd";
import axios from "axios";
import { calculatePrice } from "../../utils/utils";
import styled from "styled-components";
import {background_color_main} from "../../colors";

const { Title, Text } = Typography;
const { Content } = Layout;

const moviesUrl = {
  nowPlaying: `/movie/now_playing`,
  popular: `/movie/popular`,
  latest: `/movie/latest`,
  detail: "/movie",
};

const StyledTitle = styled(Title)`
  color: white !important;
`;

const StyledText = styled(Text)`
  color: white !important;
`;

const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);

  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: background_color_main,
      }}
    >
      <Row>
      {/* .... */}
      </Row>
    </Content>
  );
};

export default MovieDetail;
```

Let's doing the same thing as before, we are going to create a skeleton component first by importing the things that we need. In this component `MovieDetail.jsx`, we are going to have two functions to render movie poster and movie detail. This components will also have two state, which are `movieDetail` to store our movie details and `movieCredits` to store credits that movie has.
First, lets create a funciton to render movie poster with the name of function `renderMoviePoster`.  Function `renderMoviePoster` is quite self explanatory, this function will get the state value of `movieDetail.poster_path` to get its movie url poster. 

```jsx harmony
const renderMoviePoster = () => (
    <Col xs={23} sm={23} md={23} xl={11} offset={1}>
      <Image
        style={{
          height: "350px",
        }}
        src={`http://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
        alt={movie.title}
        placeholder
      />
    </Col>
);
``` 

The second function is `renderMovieDetails`, this function also is quite self explanatoru, component will get state value of `movieDetail` to show detail of the movie and `movieCredits` to show the cast of the movie.

```jsx harmony
const renderMovieDetail = () => (
    <Col xs={24} sm={24} md={24} xl={12}>
      <StyledTitle
        style={{
          textAlign: "center",
        }}
      >
        {movieDetail.title}
      </StyledTitle>
      <Row justify="between">
        <Col md={8}>
          <StyledTitle level={5}>Rating: {movieDetail.vote_average} / 10</StyledTitle>
        </Col>
        <Col md={8}>
          <StyledTitle level={5}>
            Release Date: {movieDetail.release_date}
          </StyledTitle>
        </Col>
        <Col md={8}>
          <StyledTitle level={5}>Runtime: {movieDetail.runtime} minutes</StyledTitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledTitle>
            Price: Rp.{calculatePrice(movieDetail.vote_average)}
          </StyledTitle>
          <StyledText>{movieDetail.overview}</StyledText>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledTitle
            style={{
              marginTop: "16px",
            }}
          >
            Starring:
          </StyledTitle>
          <Row gutter={[16, 32]}>
            {movieCredits.map((credit) => {
              const { name, character, profile_path } = credit;
              return (
                <Col>
                  <Card
                    hoverable
                    bordered={false}
                    style={{ width: 160, minHeight: 350 }}
                    cover={
                      <Image
                        alt={name}
                        src={`http://image.tmdb.org/t/p/w400${profile_path}`}
                        placeholder
                        fallback={
                          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDg4PDxAPDg8NEA0PDg4PDQ8PEA0OFREWFhURExUYHSggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAPYAzQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFBgID/8QAMRABAAIBAQUHAwMEAwAAAAAAAAECAxEEBSExYRIyQVFxgbEiocETUpEzQmJyI4Lw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDtAFJAAAAAAAABBadOenvwBI+FtppHO9Y94K7Vjn++J9wfcRE+nr5pAAAAAAAAAAAAAAAAABGoJfLPnrSNbTp5R4z6K23bfGPhXjf46yxcuS1pmbTrM/x7AvbRva09yOzHnOmqjky2t3rTPu8AIJSAs7Jt18c/ur5T+Gpj3pjtz1r58JlhAOnxZq27tqz0ieL25atpjlMx1iWjse9Jj6cn1V5a+MA2EorOsRpxieXWAEgAAAAAAAAAAAKu3bVGOsT/AHW7sLMue3jn/UyTPhX6Yj08QV5tMzMzOus6oAAAAAAABEpAam5tp4/p2nhPGs+UtZzOzX7N6T5Wj+HTgAAAAAAAAAAAA+O15Ozjvbyj7zwc1/738W9va2mG3W0R+fwwQAAAAAAAAAAK849YdW5R1UAkAAAAAAAAABCQFDfP9L/tX4lhtzfP9KP9q/EsMAAAAAAAAAAETLqcM61rPnWPhyzf3Vmm2PjzrMx7eALoAAAAAAAAAAAM/fU/8Uf7V+JYjf3pj1w26TFvbl+XPxIJAAAAAAAAAAbm5q6YtfO0/wAcGJEazERznhHu6XZsfZpWvlEA+oAAAAAAAAAAAImusTHm5zbtm/Tvp4TxrP8Ai6NU3jsn6leHerr2fTyBgB8xwmPKQAAAAAABEpesVO1atf3TEAv7o2WbW7cx9NeXWzaeMOKKVrWOVY0h7AAAAAAAAAAAAAABz+9cfZyzpyvEW9JVGtvrFrFbft1ifRkgAAAAAAiV7dGLtZe14UifeVGW/urFpi18bcwXIhKEgAAAAAAAAAAAAISgHzz44tS0T4xLmdOP2dPlyxWJmZiIiHM2nWZnrM+wIAAAAAAmHT7PXSlY/wAY+HMOh3bmi2OvnXhILQhIAAAAAAAAAAAPGS8V70xHrIPaht28Ix/THG3j0fDbN6c64/e0/hlTOvMHrLltedbTM9HnQAAAAAAAH0w57UntVnSfl8wG9sG3RkjTlfxjzXIctS81nWOcN/YtsjLEeFo5x59QWxEJAAAAAOs8ussHJvXJPLSvpCtkzWtztM+4OgybXjr3rxH3+FbJvbHHdi1uscIYgC9m3rktwjSkdOM/dTvebTraZmes6vIAAAAAAAAAAAAAmlpidYnSYQAv4d63r3oi8emk/ZobPvHHfhMzSfK3L+WAA6qOnH3jRLmMW0XpP02mPfWJX8G95jhkjXrUGwK2DbMd+VvaVjUHKgAAAAAAAAAAAAAAAAAAAAAAALOHbr0jSLcPDXirI0BIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k="
                        }
                        height={240}
                      />
                    }
                    bodyStyle={{
                      color: "white",
                    }}
                  >
                    {`${name}`}
                    &nbsp;
                    <span
                      style={{
                        color: "gold",
                      }}
                    >
                      as
                    </span>
                    &nbsp;
                    {`${character}`}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Col>
  );
```

Do not worry too much about that very long code, it actually contain very minimal logic because that component only getting data from state and show it. At this point you may be aware that there is nothing has been shown in page `MovieDetail.jsx`, It is because we have not written any network request that is needed. Following is the network request that is needed.

```jsx harmony
useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setFetchingMovie(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${moviesUrl.detail}/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setMovieDetail(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovie(false);
      }
    };
    const fetchMovieCredit = async () => {
      try {
        setFetchingMovie(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
        );
        console.log(response);
        const getCast = response.data.cast.slice(0, 4);
        setMovieCredits(getCast);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovie(false);
      }
    };
    fetchMovieCredit();
    fetchMovieDetail();
  }, []);
```
Full code can be seen [here](https://github.com/MirzaChilman/mini-project/blob/master/src/pages/Detail/Detail.jsx).

#### Conclusion

In this tutorial we have learn to:

1. Doing some conditional rendering based on logic that has been defined
2. Doing side effect to do network request
3. Storing data to localStorage
4. Doing looping to data type array and render the result of its looping
5. Doing routing in React.
6. Using React hooks (useState, useLocation, useEffect, and etc)

Finally, I hope this tutorial already decent enough to be the base foundation how to work with React and how to handle real world case.
