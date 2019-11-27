import React, { Component } from "react";
import * as api from "../utils/api";
import ErrHandler from "./ErrHandler";
// import Loader from "./Loader";

class Votes extends Component {
  state = { optimisticVotes: 0, err: "" };
  vote = ({ target }) => {
    this.setState(currentState => ({
      optimisticVotes: currentState.optimisticVotes + +target.name
    }));
    api
      .changeVotes(target.name, this.props.id, this.props.type)
      .catch(({ response }) => {
        this.setState(currentState => {
          return {
            err: [response.data.msg, response.status],
            isLoading: false,
            optimisticVotes: currentState.optimisticVotes - +target.name
          };
        });
      });
  };

  render() {
    const { err } = this.state;
    if (err) return <ErrHandler />;
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
