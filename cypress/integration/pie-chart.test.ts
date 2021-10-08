import { Feedback } from "@prisma/client";
import { feedbackData } from "../fixtures/feedback";

describe("Feedback Pie Chart", () => {
  before(() => {
    cy.login();
  });
  beforeEach(() =>
    Cypress.Cookies.preserveOnce(
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url"
    )
  );
  it("should show a pie chart when the user goes to the results page", () => {
    // Arrange
    cy.intercept("GET", "/api/feedback", feedbackData).as("feedback");
    cy.visit("/results");

    // Assert
    cy.findByText("30%");
    cy.findByText("10%");
    cy.findAllByText("20%");
    cy.findByText("Very unhappy");
    cy.findByText("Unhappy");
    cy.findByText("Neutral");
    cy.findByText("Happy");
    cy.findByText("Very happy");
  });
});
