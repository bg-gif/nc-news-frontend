import React from "react";
import Votes from "./Votes";

const CommentCard = props => {
  const { votes, author, body, comment_id } = props;
  return (
    <div className="commentCard">
      <h5>User: {author}</h5>
      <p>Comment: {body}</p>
      <Votes id={comment_id} type="comments" votes={votes} />
    </div>
  );
};

export default CommentCard;
