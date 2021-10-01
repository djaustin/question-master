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
        "username": "ggr555",
        "score": 1,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 2"
      },
      {
        "id": 3,
        "username": "hjg8585",
        "score": 1,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 3"
      },
      {
        "id": 4,
        "username": "ak4855",
        "score": 2,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 4"
      },
      {
        "id": 5,
        "username": "fgjh585",
        "score": 3,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 5"
      },
      {
        "id": 6,
        "username": "ff5563",
        "score": 3,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 6"
      },
      {
        "id": 7,
        "username": "fd5555",
        "score": 4,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 7"
      },
      {
        "id": 8,
        "username": "jkkj666",
        "score": 4,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 8"
      },
      {
        "id": 9,
        "username": "aa33333",
        "score": 5,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 9"
      },
      {
        "id": 10,
        "username": "ku87876",
        "score": 5,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "comment": "Comment 10"
      }
    ];

    cy.intercept("GET", "/api/feedback", data).as("feedback");
    cy.visit("/results");

    // Assert
    cy.findByText("30%");
    cy.findByText("10%");
    cy.findAllByText("20%");
    cy.findByText("Really unhappy");
    cy.findByText("Unhappy");
    cy.findByText("Neutral");
    cy.findByText("Happy");
    cy.findByText("Really happy");
  });
});
