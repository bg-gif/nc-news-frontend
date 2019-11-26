import React, { Component } from "react";
import * as api from "../utils/api";
// import Loader from "./Loader";

class Votes extends Component {
  state = { optimisticVotes: 0 };
  vote = ({ target }) => {
    this.setState(currentState => ({
      optimisticVotes: currentState.optimisticVotes + +target.name
    }));
    api.changeVotes(target.name, this.props.id, this.props.type);
  };

  render() {
    return (
      <div className="votes">
        <button onClick={this.vote} disabled={this.state.optimisticVotes > 0}>
          <img
            src="https://cdn.pixabay.com/photo/2017/02/19/10/44/arrow-2079321__340.png"
            alt="upvote"
            name="1"
          />
        </button>
        <p>Votes: {this.props.votes + +this.state.optimisticVotes}</p>
        <button onClick={this.vote} disabled={this.state.optimisticVotes < 0}>
          <img
            src="https://cdn.pixabay.com/photo/2017/02/19/10/44/arrow-2079328__340.png"
            alt="downvote"
            name="-1"
          />
        </button>
      </div>
    );
  }
}

export default Votes;
