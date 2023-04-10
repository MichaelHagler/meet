import React, { Component } from "react";

class Event extends Component {
  // sets event details state as collapsed by default(hidden)
  state = { collapsed: true };

  toggleDetails = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
      <div className="event">
        <h1 className="summary">{event.summary}</h1>
        <div>
          <p className="startDate">{event.start.dateTime}</p>
          <p className="timeZone">{event.start.timeZone}</p>
          <p className="location">{event.location}</p>

          <button className="showDetails" onClick={this.toggleDetails}>
            {collapsed ? "Show Details" : "Hide Details"}
          </button>
          {!collapsed && (
            <div className="expanded-event-details">
              <h3>About This Event:</h3>
              <a className="event-link" href={event.htmlLink}>
                See Details on Google Calendar
              </a>
              <p className="description">{event.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Event;
