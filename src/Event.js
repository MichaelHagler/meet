import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true };
  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    return (
      <div>
        <button className="show-details" onClick={() => this.toggleDetails()}>
          Show Details
        </button>
      </div>
    );
  }
}

export default Event;
