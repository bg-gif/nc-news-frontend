import React, { Component } from "react";
import * as api from "../utils/api";

import Votes from "./Votes";
import Loader from "./Loader";

import UserContext from "../UserContext";
import ErrHandler from "./ErrHandler";
import Comments from "./Comments";

class ArticlePage extends Component {
  static contextType = UserContext;
  state = {
    article: [],
    comments: [],
    isLoading: true,
    deleted: false,
    err: ""
  };
  componentDidMount() {
    api
      .fetchArticleById(this.props.article_id)
      .then(article => {
        this.setState({
          article,
          isLoading: false,
          toggle: false
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  }

  render() {
    const { article, isLoading, deleted, err } = this.state;
    if (isLoading) return <Loader />;
    if (deleted) return <div className="confirmation">Article Deleted</div>;
    if (err) return <ErrHandler err={err} />;
    return (
      <article>
        <header>
          <h2>{article.title}</h2>
        </header>
        <p>{article.body}</p>
        <Votes id={article.article_id} type="articles" votes={article.votes} />

        {this.context.name === article.author && (
          <button
            onClick={() => {
              api.delete("articles", article.article_id).then(() => {
                this.setState({ deleted: true });
              });
            }}
          >
            Delete Article
          </button>
        )}
        <Comments article_id={article.article_id} />
      </article>
    );
  }
}

export default ArticlePage;
