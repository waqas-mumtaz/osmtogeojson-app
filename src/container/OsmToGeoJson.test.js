import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import OsmToGeoJson from "./OsmToGeoJson";
import LoadingIndicator from "../components/UI/LoadingIndicator";

configure({ adapter: new Adapter() });

describe("<OsmToGeoJson />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OsmToGeoJson />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
