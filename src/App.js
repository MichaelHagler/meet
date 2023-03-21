import "./nprogress.css";
import React, { Component } from "react";
import "./App.css";
import { extractLocations, getEvents } from "./api";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import Event from "./Event";
import NumberOfEvents from "./NumberOfEvents";

class App extends Component{
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 32,
    selectedLocation: "all",
    eventCount: 32
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, eventCount);
      this.setState({
        events: eventsToShow,
        selectedLocation: location
      });
    });
  }
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
    getEvents().then((events) => {
    this.setState({ events, locations: extractLocations(events) });
   });
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <Event />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
