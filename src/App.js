import "./nprogress.css";
import React, { Component } from "react";
import "./App.css";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import { WarningAlert } from "./Alert";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

class App extends Component {
  state = {
    filtered: [],
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: "all",
    showWelcomeScreen: undefined,
  };

  updateEvents = (location, inputValue) => {
    getEvents().then((events) => {
      const {  selectedLocation } = this.state;
      const locationEvents =
          location === "all"
              ? events
              : events.filter((event) => event.location === location);

      let eventList = [];
      if (!locationEvents.length) {
        eventList = events.slice(0, inputValue);
      } else {
        eventList = locationEvents.slice(0, inputValue);
      }

      this.setState({
        filtered: eventList,
        selectedLocation: location,
      });
    })

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
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
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
          this.setState({ events, locations: extractLocations(events), numberOfEvents: events.length  });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <WarningAlert text={this.state.warningText} />
        <h1>Meet App</h1>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="city" type="category" name="city" />
              <YAxis
                allowDecimals={false}
                dataKey="number"
                type="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.state.filtered.length > 0 ? this.state.filtered : this.state.events} fill="#8884d8">
                {this.getData().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.filtered.length > 0 ? this.state.filtered : this.state.events} />
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
