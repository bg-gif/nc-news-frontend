import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class Nav extends Component {
  state = { topics: [] };
  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api.fetchAllTopics().then(topics => {
      this.setState({ topics });
    });
  };
  render() {
    const { topics } = this.state;
    return (
      <nav>
        {topics.map(topic => {
          return (
            <h4 key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </h4>
          );
        })}
      </nav>
    );
  }
}

export default Nav;
