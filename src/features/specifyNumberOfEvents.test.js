import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppWrapper;
  test("When a user has not specified number of events let the default be 32", ({
    given,
    when,
    then,
  }) => {
    given("the user did not specify the number of events", () => {});

    when("selecting cities", () => {
      AppWrapper = mount(<App />);
    });

    then("default number of 32 is loaded", () => {
      expect(AppWrapper.state("eventCount")).toEqual(32);
    });
  });

  test("User changes the number of events", ({ given, when, then }) => {
    given("that the uesr does not want to see all events", async () => {
      AppWrapper = await mount(<App />);
    });

    when("user changes the number of events in the input box", () => {
      AppWrapper.update();
      let NumberOfEventsWrapper = AppWrapper.find("number-of-events");
      const eventObject = { target: { value: 2 } };
      NumberOfEventsWrapper.find(".event-count").simulate("change", eventObject);
    });

    then("user will see the number of events they want to see", () => {
      expect(AppWrapper.find(".event")).toHaveLength(2);
    });
  });
});
