import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: "",
    events: []
  };

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue < 1 || inputValue > 32) {
      this.setState({
        numberOfEvents: inputValue,
        errorText: "Please select number from 1 to 32",
      });
    } else {
      this.setState({
        numberOfEvents: event.target.value,
        errorText: "",
      });
    }

    this.props.updateEvents(undefined, inputValue);
  };

  render() {
    return (
      <div className="number-of-events">
        <label>
          Number of Events:
          <input
            type="number"
            className="event-count"
            min="1"
            value={this.state.numberOfEvents}
            onChange={this.handleInputChange}
          />
        </label>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
