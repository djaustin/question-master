import dayjs from "dayjs";
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
    it("should allow date filtering", () => {
      // Arrange
      let fromDate = new Date();
      let toDate = new Date();

      fromDate.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), 14);
      toDate.setFullYear(toDate.getFullYear(), toDate.getMonth(), 23);
      fromDate = dayjs(fromDate).startOf("day").toDate();
      toDate = dayjs(toDate).endOf("day").toDate();

      cy.intercept("GET", "/api/feedback*", []).as("feedback");
      const expectedQuery = [fromDate, toDate]
        .map((date) => date.toISOString())
        .join(",");
      const fromDateRegex = new RegExp(`\\s+${fromDate.getDate()}th`);
      const toDateRegex = new RegExp(`\\s+${toDate.getDate()}rd`);

      // Act
      cy.visit("/dashboard/results");
      cy.findAllByRole("textbox").contains(`${new Date()} - ${dayjs().subtract(1, 'day').toDate()}`).click();
      cy.findAllByRole("button", { name: fromDateRegex }).click();
      cy.findAllByRole("button", { name: toDateRegex }).click();

      // Assert
      cy.wait("@feedback");
      cy.wait("@feedback").its("request.url").should("include", expectedQuery);
    });
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
