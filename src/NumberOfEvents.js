import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  handleInputChange = (event, props) => {
    const inputValue = event.target.value;
    if (inputValue < 0 || inputValue > 32) {
      this.setState({
        errorText: "Please select number from 1 to 32",
      });
    } else {
      //this.props.updateEvents(null, inputValue);
      this.setState({
        eventCount: inputValue,
        errorText: "",
      });
    }
  };

  render() {
    const { eventCount } = this.state;
    return (
      <div className="number-of-events">
        <input
          type="number"
          className="event-count"
          value={eventCount}
          onChange={(event) => {
            this.handleInputChange(event);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
