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
import UserBar from "./components/UserBar";
import AllTopics from "./components/AllTopics";

class App extends Component {
  state = { user: { name: "", loggedIn: false } };
  logIn = ({ target: { value } }) => {
    this.setState({ user: { name: value, loggedIn: true } }, () => {
      localStorage.setItem("user", this.state.user.name);
      localStorage.setItem("loggedIn", this.state.user.loggedIn);
    });
  };
  logOut = () => {
    this.setState({ user: { name: "", loggedIn: "" } }, () => {
      localStorage.setItem("user", this.state.user.name);
      localStorage.setItem("loggedIn", this.state.user.loggedIn);
    });
  };
  componentDidMount() {
    console.log(Boolean(localStorage.loggedIn));
    this.setState(
      () => {
        return {
          user: {
            name: localStorage.user,
            loggedIn: Boolean(localStorage.loggedIn)
          }
        };
      },
      () => {
        console.log(this.state);
      }
    );
  }
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <UserProvider value={user}>
          <Header />
          <Nav />
          <UserBar logOut={this.logOut} />
          <Router>
            <AllArticles path="/" />
            <AllArticles path="/topics/:topic_slug" />
            <ArticlePage path="/articles/:article_id" />
            <AllUsers path="/users" />
            <UserPage path="/users/:username" />
            <Login path="/login" logIn={this.logIn} />
            <AllTopics path="/topics" />
          </Router>
        </UserProvider>
      </div>
    );
  }
}

export default App;
