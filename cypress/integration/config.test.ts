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
  it("should upload the branding image and submit the URL when submit is clicked", () => {
    const question = "test question";
    const uploadedImageName = "abc.png";
    cy.intercept("POST", "/api/images/upload", "abc.png").as("upload");
    cy.intercept("POST", "/api/config", {}).as("config");
    cy.visit("/config");
    cy.findByLabelText(/question/i)
      .clear()
      .type(question);
    cy.get('input[type="file"]').attachFile("test.png");
    cy.findByRole("button", { name: /save/i }).click();
    cy.wait("@upload");
    cy.wait("@config")
      .its("request.body")
      .should("deep.equal", [
        { key: "question", value: question },
        { key: "brandingUrl", value: `/api/images/${uploadedImageName}` },
      ]);
  });
});
