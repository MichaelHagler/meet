import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

//unit tests *shalllow
describe("<App /> component", () => {
  //beforeAll function for AppWrapper is run for every test
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  //Scenario 1: user sees a list of events
  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  //Scenario 2: user sees suggested cities based on input
  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  //Scenario 3: user sees a number of Events
  test("render Events", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

//integration tests *full render
describe("<App /> integration", () => {
  //EventList gets events as a prop from App so it is defined in its state
  test("App passes 'events' state as a prop to EventList", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  //same as EventList but for locations
  test("App passes 'locations' state as a prop to CitySearch", () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  //when user selects a city or see all cities the events are correctly shown
  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  //gets list of all events when user clicks see all cities
  test("get list of all events when user selects 'See all cities'", async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });

  //NumberOfEvents gets EventList as a prop from App so it is defined in its state
  test("App passes 'NumberOfEvents' state as a prop to EventList", () => {
    const AppWrapper = mount(<App />);
    const AppEventCountState = AppWrapper.state("numberOfEvents");
    expect(AppEventCountState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(
      AppEventCountState
    );
    AppWrapper.unmount();
  });

  /*test("Change the 'event-count' state", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const input = NumberOfEventsWrapper.find("input.event-count");
    const eventNumberChange = { target: { value: 10 } };
    input.simulate("change", eventNumberChange);
    await getEvents();
    expect(AppWrapper.state(".event-count")).toBe(10);
    expect(NumberOfEventsWrapper.state(".event-count")).toBe(10);
    AppWrapper.unmount();
  });*/
});
