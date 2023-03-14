import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render event text input", () => {
    expect(NumberOfEventsWrapper.find(".number-of-events").prop("type")).toBe("number");
  });

  test("check that defualt value is 32", () => {
    expect(NumberOfEventsWrapper.state("number")).toBe(32);
  });

  test("change the number of events", () => {
    NumberOfEventsWrapper.find(".number-of-events").simulate("change", {
      target: { value: 10 }
    });
    expect(NumberOfEventsWrapper.state("number")).toBe(10);
  });
});
