import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true, event: {}, location: {}, description: {} };
  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    //const { event } = this.props;

    return (
      <div>
        <h3 className="summary">{ this.state.event }</h3>
        <p className="location">{ this.state.location }</p>
        <p className="description">{ this.state.description }</p>

        <button className="show-details" onClick={() => this.toggleDetails()}>
          Show Details
        </button>
      </div>
    );
  }
}

export default Event;
