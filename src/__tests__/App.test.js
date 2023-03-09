import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from "../EventList";
import CitySearch from "../CitySearch";

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
});