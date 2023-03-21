import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

// *unit tests
describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper, eventCount;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    eventCount = NumberOfEventsWrapper.find(".number-of-events");
  });

  test("render event text input", () => {
    expect(NumberOfEventsWrapper.find(".number-of-events").prop("type")).toBe("number");
  });

  test("check that defualt value is 32", () => {
    expect(eventCount.prop("type")).toBe("number");
    expect(NumberOfEventsWrapper.state("eventCount")).toBe(32);
  });

  test("change the number of events", () => {
    eventCount.simulate("change", {target: { value: 10}});
    expect(NumberOfEventsWrapper.state("eventCount")).toBe(10);
  });
});