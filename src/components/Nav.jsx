import React, { Component } from "react";
import * as api from "../utils/api";
import { Link, navigate } from "@reach/router";
import AddTopic from "./AddTopic";
import UserContext from "../UserContext";

class Nav extends Component {
  static contextType = UserContext;
  state = { topics: [], toggle: false, isLoading: true, err: "" };
  componentDidMount() {
    this.getTopics();
  }
  topicUpdate = topic => {
    this.setState(currentState => {
      return { topics: [topic, ...currentState.topics] };
    });
  };

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
    this.setState(currentState => {
      return { toggle: !currentState.toggle };
    });
  };
  updateTopics = topic => {
    this.setState(currentState => {
      return {
        topics: [topic, ...currentState.topics]
      };
    });
  };
  handleLink = event => {
    navigate(`/topics/${event.target.value}`);
  };
  render() {
    const { topics, toggle } = this.state;
    return (
      <nav>
        <div className="topics-container">
          <div className="topics">
            {this.state.articleToggle && (
              <AddTopic
                user={this.props.user}
                updateArticles={this.updateArticles}
              />
            )}
            <select onClick={this.handleLink}>
              <option defaultValue disabled>
                Choose Topic
              </option>
              {topics.map(topic => {
                return (
                  <option
                    onClick={this.handleLink}
                    key={topic.slug}
                    value={topic.slug}
                  >
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="topicRight">
            <div className="topicItem">
              <Link to="/users">
                <p>All Users</p>
              </Link>
            </div>
            <div className="topicItem">
              <Link to="/topics">
                <p>All Topics</p>
              </Link>
            </div>
            {this.context.name && (
              <div className="topicItem">
                <p onClick={this.handleToggle}>Add Topic</p>
              </div>
            )}
          </div>
        </div>
        {toggle && <AddTopic updateTopics={this.updateTopics} />}
      </nav>
    );
  }
}

export default Nav;
