describe("Submit Confirmation", () => {
  it("should show a success message when submission is successful", () => {
    cy.intercept("POST", "/api/feedback", {}).as("submission");
    cy.visit("/");

    cy.findByLabelText("neutral").click();
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByText(/feedback has been submitted/i);
  });

  it("should show an error message when submission is unsuccessful", () => {
    cy.intercept("POST", "/api/feedback", { statusCode: 500 }).as("submission");
    cy.visit("/");

    cy.findByLabelText("neutral").click();
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByText(/there was an error submitting/i);
  });
});
