import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe("<CitySearch /> component", () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} />);
  });

  //looks for css class "city"
  test("render text input", () => {
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  //looks for suggestions during user input
  test("render a list of suggestions", () => {
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });

   //creates query when user types
   test("renders text input correctly", () => {
    const query = CitySearchWrapper.state("query");
    expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });

  //give updated suggested list
  test("change state when text input changes", () => {
    CitySearchWrapper.setState({
      query: "Munich"
    });
    const eventObject = { target: { value: "Berlin" }};
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });

  //test to check if suggestions match the list of suggestions
  test("render list of suggestions correctly", () => {
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i++) {
      expect(CitySearchWrapper.find(".suggestions li").at(i).text()).toBe(suggestions[i]);
    }
  });

  test("suggestion list match the query when changed", () => {
    CitySearchWrapper.setState({ query: "", suggestions: [] });
    CitySearchWrapper.find(".city").simulate("change", {
      target: { value: "Berlin" },
    });
    const query = CitySearchWrapper.state("query");
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
  });
});
