import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import Loader from "./Loader";

class AllTopics extends Component {
  state = { topics: [], isLoading: false };
  componentDidMount() {
    this.setState({ isLoading: true });
    api.fetchAllTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  }
  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div className="cardHolder">
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
