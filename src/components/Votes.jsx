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
        <button
          onClick={this.vote}
          disabled={this.state.optimisticVotes > 0}
          name="1"
        >
          ⇧
        </button>
        <p>Votes: {this.props.votes + +this.state.optimisticVotes}</p>
        <button
          onClick={this.vote}
          disabled={this.state.optimisticVotes < 0}
          name="-1"
        >
          ⇩
        </button>
      </div>
    );
  }
}

export default Votes;
