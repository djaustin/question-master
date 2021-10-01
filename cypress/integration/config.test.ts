describe("Configuration Page", () => {
  it("should submit the config when submit is clicked", () => {
    const question = "test question";
    cy.intercept("POST", "/api/config", {}).as("config");
    cy.visit("/config");
    cy.findByLabelText(/question/i)
      .clear()
      .type(question);
    cy.findByRole("button", { name: /save/i }).click();
    cy.wait("@config")
      .its("request.body")
      .should("deep.equal", [{ key: "question", value: question }]);
  });
});
