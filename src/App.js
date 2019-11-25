import React from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import AllArticles from "./components/AllArticles";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        <AllArticles path="/" />
        <AllArticles path="/topics/:topic_slug" />
        <ArticlePage path="/articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
