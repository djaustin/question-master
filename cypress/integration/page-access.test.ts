describe("Page access", () => {
  it("should require login to access wallboard", () => {
    cy.visit("/dashboard/wallboard");
    cy.url().should("include", "/auth/signin");
  });
  it("should require login to access results page", () => {
    cy.visit("/dashboard/results");
    cy.url().should("include", "/auth/signin");
  });
  it("should require login to access summary", () => {
    cy.visit("/dashboard/summary");
    cy.url().should("include", "/auth/signin");
  });
  it("should require login to access dashboard root", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/auth/signin");
  });
  it("should require login to access config", () => {
    cy.visit("/config");
    cy.url().should("include", "/auth/signin");
  });
});
