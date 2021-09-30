import { Feedback } from "@prisma/client";

describe("Feedback Pie Chart", () => {
  it("should show a pie chart when the user goes to the results page", () => {
    // Arrange
    const data: Feedback[] = [
      {
        "id": 1,
        "username": "tk44b4",
        "score": 1,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 1"
      },
      {
        "id": 2,
        "username": "tk44b4",
        "score": 1,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 2"
      },
      {
        "id": 3,
        "username": "tk44b4",
        "score": 1,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 3"
      },
      {
        "id": 4,
        "username": "tk44b4",
        "score": 2,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 4"
      },
      {
        "id": 5,
        "username": "tk44b4",
        "score": 3,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 5"
      },
      {
        "id": 6,
        "username": "tk44b4",
        "score": 3,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 6"
      }   
    ];

    cy.intercept("GET", "/api/feedback", data).as("feedback");

    // Assert
    cy.visit("/results");
    cy.findByTitle("One");
    cy.findByTitle("Two");
    cy.findByTitle("Three");

    cy.findByRole("svg");

  });
});
