import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import AddTopic from "./AddTopic";

class Nav extends Component {
  state = { topics: [], toggle: false, isLoading: true, err: "" };
  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api
      .fetchAllTopics()
      .then(topics => {
        this.setState({ topics, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  };
  handleToggle = ({ target: { name } }) => {
    console.log(name);
    this.setState(currentState => {
      console.log(currentState[name]);
      return { [name]: !currentState[name] };
    });
  };
  updateTopics = topic => {
    this.setState(currentState => {
      return { topics: [topic, ...currentState.topics] };
    });
  };
  render() {
    const { topics } = this.state;
    return (
      <nav>
        {this.state.articleToggle && (
          <AddTopic
            user={this.props.user}
            updateArticles={this.updateArticles}
          />
        )}
        {topics.map(topic => {
          return (
            <h4 key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </h4>
          );
        })}
        <Link to="/users">
          <h4>All Users</h4>
        </Link>
        <button onClick={this.handleToggle} name="topicToggle">
          Add Topic
        </button>
      </nav>
    );
  }
}

export default Nav;
