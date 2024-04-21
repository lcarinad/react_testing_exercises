import React from "react";
import { render, fireEvent, queryAllByAltText } from "@testing-library/react";
import Carousel from "./Carousel";

it("should render Carousel w/o crashing", () => {
  render(<Carousel />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  //expect to move to right to 2nd image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  //expect 2nd image to show
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();

  const lefttArrow = queryByTestId("left-arrow");
  fireEvent.click(lefttArrow);
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

//expect when on 1st image for left arrow to hide
test("left arrow is hidden when on first image", () => {
  const { queryByTestId } = render(<Carousel />);

  //expect left arrow to be hidden
  const lefttArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  expect(lefttArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});
//expect right arrow to be hidden when on last image
test("right arrow is hidden when on last image", () => {
  const { queryByTestId, debug } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  debugger;
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
  fireEvent.click(rightArrow);
  expect(rightArrow).not.toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
});
