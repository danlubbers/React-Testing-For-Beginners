import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import Movie, { POSTER_PATH } from "./Movie";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

test("<Movie /> ", () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalled();
});

const movie = {
  id: "Hi",
  title: "Level Up",
  poster_path: "images/alskdjfal.jpg",
};

test("<Movie /> with movie", () => {
  const { debug, getByTestId } = render(
    <BrowserRouter>
      <Movie movie={movie} />
    </BrowserRouter>
  );

  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId("movie-link").getAttribute("href")).toBe(`/${movie.id}`);
  expect(getByTestId("movie-image").src).toBe(
    `${POSTER_PATH}${movie.poster_path}`
  );
  // debug();
});
