import React from "react";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import LocationSelector from "../LocationSelector";
import { Form } from 'antd'

/*
describe("LocationSelectorComponent", () => {
  it("should render the location chooser component"
*/
test("should render the location chooser component", async () => {
  const element = render(
    <Form>
      <LocationSelector />
    </Form>
  );

  expect(screen.queryByText('County *')).toBeInTheDocument();
  expect(screen.queryByText('Constituency *')).toBeInTheDocument();
  expect(screen.queryByText('Ward *')).toBeInTheDocument();
  expect(screen.queryByPlaceholderText('Village/Estate')).toBeInTheDocument();
  
});