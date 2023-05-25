import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

// *unit tests
describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents numberOfEvents={32} />);
  });

  test("render element", () => {
    expect(NumberOfEventsWrapper.find(".number-of-events")).toHaveLength(1);
  });

  test("render event text input", () => {
    expect(NumberOfEventsWrapper.find(".event-count")).toHaveLength(1);
  });

  test("check that default value is 32", () => {
    expect(NumberOfEventsWrapper.find(".event-count").prop("value")).toBe(32);
  });
});
