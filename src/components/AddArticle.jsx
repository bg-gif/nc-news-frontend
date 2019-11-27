import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import ErrHandler from "./ErrHandler";

class AddArticle extends Component {
  static contextType = UserContext;
  state = { title: "", topic: "", body: "", link: "", err: "", topics: [] };
  componentDidMount() {
    api.fetchAllTopics().then(topics => {
      this.setState({ topics });
    });
  }
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { title, topic, body } = this.state;
    api
      .postArticle(title, this.context.name, body, topic)
      .then(article => {
        this.props.updateArticles(article);
      })
      .then(() => {
        this.setState({ title: "", topic: "", body: "" });
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  };

  render() {
    const { err, topics } = this.state;
    if (err) return <ErrHandler err={err} />;
    return (
      <div className="formContainer">
        <h3>Add Article</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Title:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="article-title"
                placeholder="Article Title"
                id="title"
                onChange={this.handleChange}
                value={this.state.title}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Topic:</label>
            </div>
            <div className="custom-select">
              <select onChange={this.handleChange}>
                {topics.map(topic => {
                  return (
                    <option value={topic.slug} key={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Body:</label>
            </div>
            <div className="col-75">
              <textarea
                name="article-body"
                id="body"
                placeholder="Write your article here..."
                rows="7"
                onChange={this.handleChange}
                value={this.state.body}
                required
              ></textarea>
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddArticle;
