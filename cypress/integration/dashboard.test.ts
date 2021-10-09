describe("Dashboard", () => {
  before(() => cy.login());
  beforeEach(() =>
    Cypress.Cookies.preserveOnce(
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url"
    )
  );
  describe("Results Table", () => {
    it("should display a table of results", () => {
      cy.visit("/dashboard/results");
      cy.findByRole("table");
    });
  });
  describe("Summary", () => {
    it("should display a response summary", () => {
      cy.visit("/dashboard/summary");
      checkResponseSummary();
    });
  });
  describe("Wallboard", () => {
    it("should display a response summary and refresh interval", () => {
      cy.visit("/dashboard/wallboard");
      cy.findByLabelText(/refresh/i);
      checkResponseSummary();
    });
  });
});
function checkResponseSummary() {
  cy.findByText(/responses by score/i);
  cy.findByText(/response breakdown/i);
  cy.findByText(/all responses/i);
  cy.findByText(/all feedback comments/i);
}
