import React, { Component } from "react";

class Event extends Component {
  // sets event details state as collapsed by default(hidden)
  state = { collapsed: true };

  toggleDetails = () => {
    if (!this.state.collapsed) {
      this.setState({
        collapsed: false,
      });
    } else {
      this.setState({
        collasped: true,
      });
    }
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h1 className="summary">{event.summary}</h1>
        <div>
          <p className="startDate">{event.start.dateTime}</p>
          <p className="timeZone">{event.start.timeZone}</p>
          <p className="location">{event.location}</p>

          {this.state.collapsed && (
            <div className="expanded-event-details">
              <h1>About This Event:</h1>
              <a className="event-link" href={event.htmlLink}>
                See Details on Google Calendar
              </a>
              <p className="description">{event.description}</p>
            </div>
          )}

          <button className="showDetails" onClick={this.toggleDetails}>
            {this.state.collapsed ? "Show Details" : "Hide Details"}
          </button>
        </div>
      </div>
    );
  }
}

export default Event;
