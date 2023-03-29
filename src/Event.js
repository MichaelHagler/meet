import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true };
  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { event } = this.props.state;
    const { collapsed } = this.state;

    return (
      <div>
        <h1 className="summary">{ event.summary }</h1>
        <p className="location">{ event.location }</p>

        {!collapsed && (
          <div className="event-details">
            <h2>
              About Event:
            </h2>
            <p className="description">
              {event.description}
            </p>
          </div>
        )}

        <button className="show-details" onClick={() => this.toggleDetails()}>
          {collapsed ? "Show" : "Hide"} Details
        </button>
      </div>
    );
  }
}

export default Event;
