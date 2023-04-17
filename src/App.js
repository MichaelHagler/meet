import "./nprogress.css";
import React, { Component } from "react";
import "./App.css";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: "all",
    showWelecomeScreen: undefined,
  };

  updateEvents = (location, inputValue) => {
    const { numberOfEvents, seletedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: eventsToShow,
          seletedLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          seletedLocation === "all"
            ? events
            : events.filter((event) => event.location === seletedLocation);
        const eventsToShow = locationEvents.slice(0, inputValue);
        this.setState({
          events: eventsToShow,
          numberOfEvents: inputValue,
        });
      });

      //warning to user if they are offline
      if (!navigator.onLine) {
        this.setState({
          warningText: "You are offline, events pull from cache.",
        });
      } else {
        this.setState({
          warningText: "",
        });
      }
    }
  };
  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <WarningAlert text={this.state.warningText} />
        <h1>Meet App</h1>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
