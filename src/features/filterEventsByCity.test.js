import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";
import App from "../App";
import React from "react";
import CitySearch from "../CitySearch";
import EventList from "../EventList";

global.ResizeObserver = require("resize-observer-polyfill");

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  //Scenario 1 shows events for all cities
  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});

    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = mount(<EventList events={mockData} />);
    });

    then("the user should see the list of upcoming events.", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });
  });

  //Scenario 2 sees events when searched by city
  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper;
    given("the main page is open", () => {
      let locations = extractLocations(mockData);
      CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
    });

    when("the user starts typing in the city textbox", () => {
      CitySearchWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
    });

    then(
      "the user should receive a list of cities suggestions that match what they've typed",
      () => {
        expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
      }
    );
  });

  //Scenario 3 user selected from suggested list
  test.skip("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given("user was typing 'Berlin' in the city textbox", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find("input.city")
          .simulate("change", {
            target: { value: "Berlin" },
          });
    });

    and("the list of suggested cities is showing", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
    });

    when(
      "the user selects a city (e.g., 'Berlin, Germany') from the list",
      () => {
        AppWrapper.find(".suggestions li").at(0).simulate("click");
      }
    );

    then(
      "their city should be changed to that city (i.e., 'Berlin, Germany')",
      () => {
        // const CitySearchWrapper = AppWrapper.find(CitySearch);
        // AppWrapper.update()
        const CitySearchWrapper = AppWrapper.find(".city")
        expect(CitySearchWrapper.instance().value).toBe("Berlin, Germany");
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      () => {
        expect(AppWrapper.find(".event").hostNodes()).toHaveLength(
            mockData.length
        );
      }
    );
  });
});
