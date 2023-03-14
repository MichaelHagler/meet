import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = { number: 32 };

  changeNumber = (value) => {
    this.setState({ number: value });
  }

  render() {
    const { number } = this.state;

    return (
      <div>
        <input 
          type="number"
          className="number-of-events"
          value={ number }
          onChange={(event) => {
            this.changeNumber(event.target.value);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;