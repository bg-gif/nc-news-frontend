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
    <article>
      <header>
        <h3>
          <Link to={`/articles/${article_id}`}>{title}</Link>
        </h3>
      </header>
      <div className="articleData">
        <p>Topic: {topic}</p>
        <p>Author: {author}</p>
        <p>No. of Comments: {comment_count}</p>
        <Votes type="articles" id={article_id} votes={votes} />
      </div>
    </article>
  );
};

export default ArticleCard;
