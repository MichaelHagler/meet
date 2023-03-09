import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";

describe("<CitySearch /> component", () => {
  //looks for css class "city"
  test("render text input", () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  //looks for suggestions during user input
  test("render a list of suggestions", () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });
});
