import React from "react";
import ReactDOM from "react-dom";
import MatchesPage from "./pages/MatchesPage";
import { createRoot } from "react-dom/client";
import { render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   createRoot(<MatchesPage />, div);
// });

describe("Matches Page Test", () => {
    test("Check if renders page properly", () => {
        render(<MatchesPage />);
    });

    test("Check for content on matches page", () => {
        const {getByText} = render(<MatchesPage/>);

        const heading = getByText("Matches");

        expect(heading).toBeInTheDcoument();
    })
});