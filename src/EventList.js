import React, { Component } from 'react';
import Event from "./Event";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <div className="EventList">
        {events.map(event =>
            <Event event={event} key={event.id} />
        )}
      </div>
    );
  }
}

export default EventList
