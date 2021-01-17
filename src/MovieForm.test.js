import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import MovieForm from "./MovieForm";

afterEach(cleanup);

const onSubmit = jest.fn();

test("MovieForm />", () => {
  const { debug, getByTestId, getByText, getByLabelText, container } = render(
    <MovieForm submitForm={onSubmit} />
  );

  expect(getByTestId("movie-form")).toBeTruthy();

  // Newer way of change event
  // getByLabelText("Text").value = "hello";
  // fireEvent.change(getByLabelText("Text"));

  // Older way of change event but more concise
  fireEvent.change(getByLabelText("Text"), { target: { value: "hello" } });

  fireEvent.submit(getByText("Submit"));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({ text: "hello" });
  // debug();
});
