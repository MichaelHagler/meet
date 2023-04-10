import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test("render events", () => {
    expect(EventWrapper).toBeDefined();
  });

  //renders default info Event title
  test("render the summary as h1", () => {
    const summary = EventWrapper.find("h1.summary");
    expect(summary).toHaveLength(1);
    expect(summary.text()).toBe(event.summary);
  });

  //default info location
  test("render event location", () => {
    const location = EventWrapper.find("p.location");
    expect(location).toHaveLength(1);
    expect(location.text()).toBe(event.location);
  });

  //show details button
  test("renders details button", () => {
    const detailsButton = EventWrapper.find("button.showDetails");
    //expect(detailsButton).toHaveLength(1);
    expect(detailsButton.text()).toBe("Show Details");
  });

  test("check that details are collapsed by default", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  test("simulate click to show details", () => {
    const detailsButton = EventWrapper.find("button.showDetails");
    detailsButton.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
  });

  //details shown after button is clicked
  test("render event description", () => {
    const description = EventWrapper.find("p.description");
    expect(description).toHaveLength(1);
    expect(description.text()).toBe(event.description);
  });
});