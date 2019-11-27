import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import AllArticles from "./components/AllArticles";
import ArticlePage from "./components/ArticlePage";
import AllUsers from "./components/AllUsers";
import UserPage from "./components/UserPage";
import { UserProvider } from "./UserContext";

class App extends Component {
  state = { user: { name: "jessjelly", loggedIn: true } };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <UserProvider value={user}>
          <Header />
          <Nav />
          <Router>
            <AllArticles path="/" />
            <AllArticles path="/topics/:topic_slug" />
            <ArticlePage path="/articles/:article_id" />
            <AllUsers path="/users" />
            <UserPage path="/users/:username" />
          </Router>
        </UserProvider>
      </div>
    );
  }
}

export default App;
