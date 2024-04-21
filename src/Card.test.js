import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import image1 from "./image1.jpg";

it("should render Card w/o crashing", () => {
  render(<Card />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
