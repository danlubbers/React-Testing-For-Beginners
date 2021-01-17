import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import MoviesList from "./MoviesList";

// This gets rid of the unexpected network error issue
global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const movies = {
  results: [
    { id: "hi", title: "Level Up Rules!", poster_path: "asdlfkj.jpg" },
    { id: "hi2", title: "Level Up Rules!2", poster_path: "2asdlfkj.jpg" },
    { id: "hi3", title: "Level Up Rules!3", poster_path: "3asdlfkj.jpg" },
  ],
};

test("<MoviesList /> ", async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { debug, getByTestId, getAllByTestId, queryByTestId } = render(
    <BrowserRouter>
      <MoviesList />
    </BrowserRouter>
  );
  expect(getByTestId("loading")).toBeTruthy();
  await waitForElement(() => getByTestId("movie-link"));
  expect(queryByTestId("loading")).toBeFalsy();
  expect(getByTestId("movie-link").getAttribute("href")).toBe(
    `/${movies.results[0].id}`
  );
  expect(getAllByTestId("movie-link").length).toBe(3);
  // debug();
});
