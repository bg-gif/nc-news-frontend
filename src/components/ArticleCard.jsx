import React, { useContext } from "react";
import { Link } from "@reach/router";
import Votes from "./Votes";
import UserContext from "../UserContext";

const ArticleCard = ({
  article_id,
  title,
  topic,
  author,
  comment_count,
  votes
}) => {
  const user = useContext(UserContext);
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
      {user.loggedIn && <Votes type="articles" id={article_id} votes={votes} />}
      {!user.loggedIn && <div className="votes">Votes: {votes}</div>}
    </div>
  );
};

export default ArticleCard;
