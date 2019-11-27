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
import Login from "./components/Login";

class App extends Component {
  state = { user: { name: "", loggedIn: false } };
  logIn = ({ target: { value } }) => {
    this.setState({ user: { name: value, loggedIn: true } });
  };
  logOut = () => {
    this.setState({ user: { name: "", loggedIn: "false" } });
    window.location.reload();
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <UserProvider value={user}>
          <Header logOut={this.logOut} />
          <Nav />
          {!user.loggedIn && <Login path="/login" logIn={this.logIn} />}
          {user.loggedIn && (
            <Router>
              <AllArticles path="/" />
              <AllArticles path="/topics/:topic_slug" />
              <ArticlePage path="/articles/:article_id" />
              <AllUsers path="/users" />
              <UserPage path="/users/:username" />
            </Router>
          )}
        </UserProvider>
      </div>
    );
  }
}

export default App;
