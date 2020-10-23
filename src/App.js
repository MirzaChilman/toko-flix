import React, { Suspense } from "react";
import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.less";

import { Layout } from "antd";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Detail = React.lazy(() => import("./pages/Detail/Detail"));

function App() {
  return (
    <Layout>
      <Header />
      <Suspense fallback={"Loading"}>
        <Switch>
          <Route path="/movies" component={Home} />
          <Route exact path="/movie/:id" component={Detail} />
        </Switch>
      </Suspense>

      <Footer />
    </Layout>
  );
}

export default App;
