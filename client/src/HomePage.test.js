import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import { createRoot } from "react-dom/client";
import { render, screen, fireEvent } from "@testing-library/react";


// tests the static homepage to see if it contains the appropriate text elements

describe("Homepage Test", () => {
    
  test("Homepage Renders", () => {
    render(<HomePage/>);
  });

  test("Recruit Card", () => {

    const {getByText} = render(<HomePage />);
    const subheading = getByText("A Better Way to Recruit");

    expect(subheading).toBeInTheDcoument();
  });

  test("Coaching Card", () => {

    const {getByText} = render(<HomePage />);
    const subheading = getByText("1:1 Coaching");

    expect(subheading).toBeInTheDcoument();
  });

  test("Mock Interview Card", () => {

    const {getByText} = render(<HomePage />);
    const subheading = getByText("Mock Interviews");

    expect(subheading).toBeInTheDcoument();
  });
})
