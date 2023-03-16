import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
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

  test("App passes 'events' state as a prop to EventList", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test("App passes 'locations' state as a prop to CitySearch", () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test("get list of all events when user selects 'See all cities'", async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).sumulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });
});