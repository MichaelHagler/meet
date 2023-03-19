import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = { 
    eventCount: 32
  };

  changeNumber = (value) => {
    this.setState({ number: value });
  }

  render() {
    return (
      <div>
        <input 
          type="number"
          className="number-of-events"
          value={ this.state.eventCount }
          onChange={(event) => {
            this.changeNumber(event.target.value);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;