describe("Score Submission", () => {
  it("should submit the user's chosen score", () => {
    cy.intercept("POST", "/api/feedback", {}).as("feedback");
    cy.visit("http://localhost:3000");
    cy.findByLabelText("neutral").click();
    cy.findAllByRole("button", { name: /submit/i }).click();

    cy.wait("@feedback").its("request.body.score").should("eq", 3);
    cy.get("@feedback").its("response.statusCode").should("eq", 200);
  });

  it("should not submit the form when no score is chosen", () => {
    cy.intercept("POST", "/api/feedback").as("feedback");
    cy.visit("http://localhost:3000");
    cy.findAllByRole("button", { name: /submit/i }).click();

    cy.get("@feedback.all").should("have.length", 0);
  });
});
