import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class AllTopics extends Component {
  state = { topics: [] };
  componentDidMount() {
    api.fetchAllTopics().then(topics => {
      this.setState({ topics });
    });
  }
  render() {
    const { topics } = this.state;
    return (
      <div>
        {topics.map(topic => {
          return (
            <Link to={`/topics/${topic.slug}`}>
              <div className="card">
                <header>
                  <h2>{topic.slug}</h2>
                </header>
                <div className="cardData">
                  <p>{topic.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default AllTopics;
