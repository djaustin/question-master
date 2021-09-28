describe("Score Submission", () => {
  it("should submit the user's chosen score", () => {
    cy.intercept("POST", "/api/feedback", {}).as("feedback");
    cy.visit("/");
    cy.findByLabelText("neutral").click();
    cy.findAllByRole("button", { name: /submit/i }).click();

    cy.wait("@feedback").its("request.body.score").should("eq", 3);
  });

  it("should not submit the form when no score is chosen", () => {
    cy.intercept("POST", "/api/feedback").as("feedback");
    cy.visit("/");
    cy.findAllByRole("button", { name: /submit/i }).click();

    cy.get("@feedback.all").should("have.length", 0);
    cy.findByText("Please choose a response before submitting");
  });
});
