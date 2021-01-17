import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Counter from "./Counter";

afterEach(cleanup); // unmounts everything from the DOM to create a clean slate

test("<Counter />", () => {
  // Renders Component
  const { debug, getByTestId } = render(<Counter />);

  // debug(); // Outputs DOM as a string

  const counterButton = getByTestId("counter-button");

  // Asserts counter-button is a button
  expect(counterButton.tagName).toBe("BUTTON");
  // Asserts counter-button starts at 0
  expect(counterButton.textContent).toBe("0");

  // Using onClick and count method
  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe("1");

  // debug(); // Shows the count state changed to 1
});
