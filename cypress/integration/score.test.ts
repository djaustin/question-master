describe("Score Submission", () => {
  it("should submit the user's chosen score", () => {
    // Arrange
    cy.intercept("POST", "/api/feedback", {}).as("feedback");

    // Act
    cy.visit("/");
    cy.findByLabelText("neutral").click();
    cy.findAllByRole("button", { name: /submit/i }).click();

    // Assert
    cy.wait("@feedback").its("request.body.score").should("eq", 3);
  });

  it("should not submit the form when no score is chosen", () => {
    // Arrange
    cy.intercept("POST", "/api/feedback").as("feedback");

    // Act
    cy.visit("/");
    cy.findAllByRole("button", { name: /submit/i }).click();

    // Assert
    cy.get("@feedback.all").should("have.length", 0);
    cy.findByText("Please choose a response before submitting");
  });
});
