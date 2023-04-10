import "./nprogress.css";
import React, { Component } from "react";
import "./App.css";
import { extractLocations, getEvents } from "./api";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: "all",
  };

  updateEvents = (location, inputValue) => {
    const {numberOfEvents, seletedLocation} = this.state;
    if (location) {
      getEvents().then(events => {
        const locationEvents = (location === 'all') ?
        events :
        events.filter(event => event.location === location);
        const eventsToShow=locationEvents.slice(0, numberOfEvents);
        this.setState({
        events: eventsToShow,
        seletedLocation: location
        });
      });  
    } else {
      getEvents().then((events) => {
        const locationEvents = (seletedLocation === 'all') ?
        events :
        events.filter((event) => event.location === seletedLocation);
        const eventsToShow=locationEvents.slice(0, inputValue);
        this.setState({
          events: eventsToShow,
          numberOfEvents: inputValue
        });
      })
    }
  }
  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0, this.state.numberOfEvents);
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
      </div>
    );
  }
}

export default App;
