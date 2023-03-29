import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

// *unit tests
describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render event text input", () => {
    expect(NumberOfEventsWrapper.find(".eventCount")).toHaveLength(0);
  });

  test("check that defualt value is 32", () => {
    expect(NumberOfEventsWrapper.find(".eventCount").prop("inputValue")).toBe(32);
  });

  test("change the number of events", () => {
    NumberOfEventsWrapper.simulate("change", {target: { inputValue: 10}});
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(10);
  });
});