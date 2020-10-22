import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Layout } from "antd";

function App() {
  return (
    <Layout>
      <Header />
      <Suspense fallback={"Loading"}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>

      <Footer />
    </Layout>
  );
}

export default App;
