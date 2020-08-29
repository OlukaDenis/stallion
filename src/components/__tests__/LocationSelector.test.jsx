import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
// import "@testing-library/jest-dom/extend-expect";
import LocationSelector from "../LocationSelector";
import { Form } from 'antd'
import { AimOutlined } from "@ant-design/icons";


test("should render the location chooser component", async () => {

  const element = render(
    <Form>
      <LocationSelector icon={<AimOutlined />} placeholder='Some Placeholder Text' onSelect={(value) => null} />
    </Form>
  );

  const inputNode = screen.queryByPlaceholderText('Some Placeholder Text');;
  expect(inputNode).toBeInTheDocument();

  // fireEvent.change(inputNode, { target: { value: 'Los' } });
  // const optionNode = screen.queryByText(/LOS ALAMITOS, CA, USA/i);
  // expect(optionNode).toBeInTheDocument();
});