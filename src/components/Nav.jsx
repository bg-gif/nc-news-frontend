import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import AddTopic from "./AddTopic";
import UserContext from "../UserContext";

class Nav extends Component {
  static contextType = UserContext;
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
    console.log(this.context.name);
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
            {topics.map(topic => {
              return (
                <div className="topicItem" key={topic.slug}>
                  <p>
                    <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="topicRight">
            <div className="topicItem">
              <Link to="/users">
                <p>All Users</p>
              </Link>
            </div>

            <div className="topicButton">
              {this.context.name && (
                <button onClick={this.handleToggle} name="topicToggle">
                  Add Topic
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
