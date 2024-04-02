import React from "react";
import ReactDOM from "react-dom";
import ProfilePage from "./pages/ProfilePage";
import { createRoot } from "react-dom/client";
import { render, screen, fireEvent } from "@testing-library/react";


// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   createRoot(<ProfilePage />, div);
// });

describe("Profile Info Test", () => {
  test("Test Full Name", () => {
    render(<ProfilePage />);
    const nameInput = screen.getByLabelText("Full Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });
  
  it("Test Email", () => {
    render(<ProfilePage />);
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "jd@vanderbilt.edu" } });
    expect(emailInput.value).toBe("jd@vanderbilt.edu");
  });
  
  it("Test Username", () => {
    render(<ProfilePage />);
    const usernameInput = screen.getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    expect(usernameInput.value).toBe("johndoe");
  });

  it("Test Calendly Link", () => {
    render(<ProfilePage />);
    const linkInput = screen.getByLabelText("Calendly Link");
    fireEvent.change(linkInput, { target: { value: "link@calendly.com" } });
    expect(linkInput.value).toBe("link@calendly.com");
  });

  it("Test Bio", () => {
    render(<ProfilePage />);
    const bioInput = screen.getByLabelText("Bio");
    fireEvent.change(bioInput, { target: { value: "This is my bio" } });
    expect(bioInput.value).toBe("This is my bio");
  });

  it("Test Skills", () => {
    render(<ProfilePage />);
    const skillsInput = screen.getByLabelText("Skills");
    fireEvent.change(skillsInput, { target: { value: "Java, C++, React" } });
    expect(skillsInput.value).toBe("Java, C++, React");
  });
})
