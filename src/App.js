import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.less";

import { Layout } from "antd";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Detail = React.lazy(() => import("./pages/Detail/Detail"));
const MyMovies = React.lazy(() => import("./pages/MyMovie/MyMovie"));

function App() {
  return (
    <Layout>
      <Header />
      <Suspense fallback={"Loading"}>
        <Switch>
          <Route exact path="/movie/:id" component={Detail} />
          <Route exact path="/my-account/favorites" component={MyMovies} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>

      <Footer />
    </Layout>
  );
}

export default App;
