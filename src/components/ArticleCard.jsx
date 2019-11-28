import React from "react";
import { Link } from "@reach/router";
import Votes from "./Votes";

const ArticleCard = ({
  article_id,
  title,
  topic,
  author,
  comment_count,
  votes
}) => {
  return (
    <div className="card">
      <header>
        <h3>
          <Link to={`/articles/${article_id}`}>{title}</Link>
        </h3>
      </header>
      <div className="cardData">
        <p>Topic: {topic}</p>
        <p>Author: {author}</p>
        <p> Comments: {comment_count}</p>
      </div>
      <Votes type="articles" id={article_id} votes={votes} />
    </div>
  );
};

export default ArticleCard;
