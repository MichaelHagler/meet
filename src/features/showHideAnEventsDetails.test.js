import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";
import React from "react";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppWrapper;
  //scenario 1 user expands event details
  test("User should see an events details collapsed by default", ({
    given,
    when,
    then,
  }) => {
    given("user has not seen event details", () => {
      AppWrapper = mount(<App />);
    });

    when("user sees a button to expand details", () => {
      AppWrapper.update();
      AppWrapper.find(".showDetails").at(0).simulate("click");
    });

    then("the user can expand for more details", () => {
      expect(AppWrapper.find(".showDetails")).toHaveLength(2);
    });
  });

  //scenario 2 user hides event details
  test("User can hide event details", ({ given, when, then }) => {
    given("user has seen event details", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find(".showDetails").at(0).simulate("click");
    });

    when("user has expanded details", () => {
      AppWrapper.update();
      AppWrapper.find(".showDetails").at(0).simulate("click");
    });

    then("the user can hide event details", () => {
      expect(AppWrapper.find(".showDetails")).toHaveLength(2);
    });
  });
});
