import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });

  test("render events", () => {
    expect(EventWrapper).toBeDefined();
  });

  test("renders details button", () => {
    const detailsButton = EventWrapper.find(".show-details");
    expect(detailsButton).toHaveLength(1);
    expect(detailsButton.text()).toBe("Show Details");
  });

  test("check that details are collapsed by default", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  test("render collapsed details", () => {
    const detailsButton = EventWrapper.find(".show-details");
    detailsButton.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
  });
});