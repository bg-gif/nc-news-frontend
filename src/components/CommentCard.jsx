import React from "react";

const CommentCard = props => {
  const { votes, author, body } = props;
  return (
    <div className="commentCard">
      <h5>User: {author}</h5>
      <p>Comment: {body}</p>
      <p>Votes: {votes}</p>
    </div>
  );
};

export default CommentCard;
