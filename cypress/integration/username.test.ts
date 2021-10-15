describe("Username Submission", () => {
  it("should submit the username when provided", () => {
    // Arrange
    const username = "ab12345";
    cy.intercept("POST", "/api/feedback", {}).as("feedback");

    // Act
    cy.visit("/");
    cy.findByPlaceholderText(/comment/i).type("Test comment 1");
    cy.findByLabelText("neutral").click();
    cy.findByRole("checkbox", {
      name: /i would like to be contacted/i,
    }).click({ force: true });
    cy.findByPlaceholderText(/username/i).type(username);
    cy.findAllByRole("button", { name: /submit/i }).click();

    // Assert
    cy.wait("@feedback").its("request.body.username").should("eq", username);
  });

  it("should show an error message when no username is submitted but checkbox is checked", () => {
    // Arrange
    cy.intercept("POST", "/api/feedback", {}).as("feedback");

    // Act
    cy.visit("/");
    cy.findByLabelText("neutral").click();
    cy.findByRole("checkbox", {
      name: /i would like to be contacted/i,
    }).click({ force: true });
    cy.findAllByRole("button", { name: /submit/i }).click();

    // Assert
    cy.findByText(/enter a username/i);
    cy.get("@feedback.all").should("have.length", 0);
  });
});
