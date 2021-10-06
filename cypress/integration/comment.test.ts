describe("Comment Submission", () => {
  it("should submit the user's chosen comment", () => {
    // Arrange
    cy.intercept("POST", "/api/feedback", {}).as("feedback");

    // Act
    cy.visit("/");
    cy.findByPlaceholderText(/comment/i).type("Test comment 1");
    cy.findByLabelText("neutral").click();
    cy.findAllByRole("button", { name: /submit/i }).click();

    // Assert
    cy.wait("@feedback")
      .its("request.body.comment")
      .should("eq", "Test comment 1");
  });

  it("should submit without a comment", () => {
    // Arrange
    cy.intercept("POST", "/api/feedback", {}).as("feedback");

    // Act
    cy.visit("/");
    cy.findByLabelText("neutral").click();
    cy.findAllByRole("button", { name: /submit/i }).click();

    // Assert
    cy.wait("@feedback").its("request.body.comment").should("eq", "");
  });

  it("should show an error message if you submit without a comment when the 'very unhappy' face is selected", () => {
    // Arrange
    cy.intercept("POST", "/api/feedback", {}).as("feedback");

    // Act
    cy.visit("/");
    cy.findByLabelText("very unhappy").click();
    cy.findAllByRole("button", { name: /submit/i }).click();

    // Assert
    cy.findByText("Please enter a comment before submitting");
    cy.get("@feedback.all").should("have.length", 0);
  });
});
